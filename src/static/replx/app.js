/*
Consignment validator app
abunce july 2016
*/

var { Router, Route, IndexRoute, Link, browserHistory,useRouterHistory } = ReactRouter;
var { createHistory } = history;

var apiBase="/replx/api/";

var axios_json={ headers: {accept: 'application/json'}};

class App extends React.Component {
	 constructor(props) {
		    super(props);
		    this.onLog = this.onLog.bind(this);
		    // customized axios instance
		    this.axios=axios.create({
		  	  baseURL: apiBase,
			  timeout: 10000,
			  headers: {'X-Custom-Header': 'replx'}
			});
		    var that=this;
			 this.axios.interceptors.response.use(
				function (response) {
				    // Do something with response data
					//console.log("response");
				    return response;
				  }, function (error) {
				    // Do something with response error
					  console.log("axios error:",error.response);
					  
					that.props.history.push({
						pathname:"/replx/ui/error",
						state: { err: error.response }})
				    //return Promise.reject(error);
				  }
			);
		    this.state = { msg:"Welcome to REPLX."}; 
	 }

  
 
  getChildContext() {
	   return {onLog: this.onLog,
		       axios:this.axios};
  }
  onLog(msg){
	this.setState({msg:msg});
  }  
  render() {
    return <div className="HolyGrail" >
		<header >
			<HeaderItem location={this.props.location.pathname}/>
		</header>
		{this.props.children}	
        <footer className="infoline">{this.state.msg}</footer>
		</div>
  }
};
App.childContextTypes = {
    onLog: React.PropTypes.func,
    axios: React.PropTypes.func
};	



class HeaderItem extends React.Component {
render() {return  <nav className="navbar navbar-default" style={{marginBottom: "0px"}}>
		<div className="navbar-header"> 
			<Link to="/replx/ui" className="navbar-brand">
			repl.X</Link> 
		</div>
		<ul className="nav navbar-nav" >
		<li><Link to="/replx/ui/session" activeClassName="active-link" 
          title="Enter your own Xquery">Session</Link></li>
			<li><Link to="/replx/ui/try" activeClassName="active-link" 
				title="Enter your own XML">Edit</Link></li>
		</ul>
		<ul className="nav navbar-nav" style={{float:"right"}}>
			<li><Link to="/replx/ui/about" activeClassName="active-link" >About</Link></li>
		</ul>		
	</nav>
    }
};


var About = class About extends React.Component {
render() {
	    var version=document.body.getAttribute("data-version");
	    return 	<GrailBody>
	    <PanelItem title={"About REPLX (version:  "+version+")"} flex="1 0 60em">
	    <p>Provides:</p>
	    <ul>	  
    	    <li>XQuery evaluation.</li>
    	    <li><Link to="/replx/ui/admin">admin</Link>.</li>
	    </ul> 
	    </PanelItem>
	    </GrailBody>
    }
};

class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state={value:"",
                chat:[]};
    this.send = this.send.bind(this);
    this.onValue = this.onValue.bind(this);
  }
  send(){
    var that=this;
    var value=this.state.value;
    var body=Qs.stringify({value:value});
    this.context.axios.post("query",body,axios_json)
    .then(function(r){
            that.setState({chat:[{created:"?",query:value,result:r.data}]});
        });
    }
  onValue(value){
    //console.log("value:",value);
    this.state.value=value;
 }
  render() {
      var chat=this.state.chat[0];
      return  <GrailBody>
      <div className="HolyGrail-content" style={{display:"flex" ,flexDirection: "column"}}>
            <div style={{flex:"1"}}>The log
            <div>{chat && chat.query}</div>
            <div>{chat && chat.result}</div>
            </div>
            <AceEditor2 title="test" mode="xquery" code={this.state.value} onValue={this.onValue}/>
            <div><button className="btn btn-sm btn-info" onClick={this.send}>run</button></div>
      </div>
      </GrailBody>
      }
  };
Session.contextTypes  = {
    onLog: React.PropTypes.func,
    axios: React.PropTypes.func
};  
class NoMatch extends React.Component {
render() {
    return 	<GrailBody><div>404: Not found 
    <Link to="/replx/ui">Home</Link>
    </div>
    </GrailBody>
	}
};

class ServerError extends React.Component {
  constructor(props) {
    super(props);
    this.state={err:"n/a"};
  }
	render() {
		console.log("ServerError",this);
	    return 	<GrailBody>
	    <div>Server Error
	    <Link to="/replx/ui">Home</Link>
	    <pre>
	    {this.props.location.state?this.props.location.state.err.data:"No error found"}
	    </pre>
	    </div>
	    
	    </GrailBody>
		}
};
ServerError.contextTypes  = {
	    onLog: React.PropTypes.func,
	    axios: React.PropTypes.func
};


/**
 * Edit UI and validate on server
 */
class Try extends React.Component {
    constructor(props) {
        super(props);
        // Manually bind this method to the component instance...
        this.validate = this.validate.bind(this);
        this.onValue = this.onValue.bind(this);
        this.state = {
            xml:'<whatever>Am I valid?</whatever>',
            validations:null,
            localerr:null
        };
      }

    componentDidMount(){
            var that=this;
            console.log(this.props);
            var uri=this.props.location.query.uri;
            if(uri){
            that.context.axios.get("report"+uri,axios_json).then(function(r){
                    that.setState({xml: r.data.xml,validations:r.data.validations});
                });
            
            }
     }
     // @return boolean xml can be parsed
     checkXML(xml){
         var oParser = new DOMParser();
         var oDOM = oParser.parseFromString(xml, "text/xml");
         return !(oDOM.documentElement.nodeName == "parsererror");
     }
     
     validate(){
         var that=this;
         var xml=this.state.xml;
         if(this.checkXML(xml)){
             that.context.onLog("Sending validation request");
             var ms = +new Date();
             that.context.axios.post("validate", Qs.stringify({value: this.state.xml}))
             .then(function(r){
                 that.setState({validations:r.data.validations,localerr:null});
                 ms=(+new Date())-ms
                 that.context.onLog("Done. ("+ ms+"ms)");    
             })
         }else{ 
             that.setState({ validations:null,localerr:"XML is invalid, not sent."})
         }
     }
     onValue(value){
        this.state.xml=value;
     }
    render() {
        return  <GrailBody>
       
        <div  className="HolyGrail-content">
            <AceEditor  mode="xml" code={this.state.xml} 
            onValue={this.onValue} title="(entered)"
            wrap={true} readOnly={false}/>          

        </div>
             <PanelItem title="Actions" flex="0 0 24em">
             Validate against:
                 <ul>
                 <li><code>?</code></li>
                 </ul>
                <button onClick={this.validate} className="btn btn-default btn-sm">Validate</button>
                <div className="bg-danger">{this.state.localerr}</div>
              
            </PanelItem>    
        </GrailBody>
        }
};
Try.contextTypes  = {
        onLog: React.PropTypes.func,
        axios: React.PropTypes.func
};


// admin tools @TODO security
class Admin extends React.Component {
	 constructor(props) {
		    super(props);
		    this.loadEls = this.loadEls.bind(this);	
		    this.onChange = this.onChange.bind(this);
		    this.onValueClick = this.onValueClick.bind(this);
		    this.state = {
	              content:"",
	              mode:"xquery",
	              value:"one"
		    };
	 }
	 
	 
	 onChange(value){
		 this.context.onLog("on change");
		 this.setState({
				value: value,
	});
	 }
	 
	 onValueClick(option){
	     console.log("value",option);
		 this.context.onLog("on value control: "+option.label);
	 }
	 
	 loadEls(q,callback){
		 this.context.axios.get("elements",axios_json)
	    	.then(function(r){
	    		var opts=r.data.items;
	    		
	    		//console.log(r,opts,callback);
	    		callback(null,{options:opts,complete:true});
	    	})
	 }
	 
	 scan(){
		 var task="scan";
		 this.context.axios.post(apiBase+"task",Qs.stringify({task: task}))
		 .then(function(r){
			 alert("not yet:"+task);
		 })
	 }
	 
	render() {
		 return <GrailBody>
		  <PanelItem title="Admin Tasks" flex="0 0 20em">
		  	<button onClick={this.scan}>Rescan db</button>
		  	<hr/>
		  	 <hr/>
		  	<Select.Async multi={false} value={this.state.value} 
		  	onChange={this.onChange} onValueClick={this.onValueClick}  autoBlur={true}
		  		 loadOptions={this.loadEls} minimumInput={1} backspaceRemoves={false} />
	    	
		  </PanelItem>
		  <div  className="HolyGrail-content">
		    	<AceEditor code={this.state.content} mode={this.state.mode} wrap={true} readOnly={false} />
		   </div>
		  </GrailBody>
	}
};
Admin.contextTypes  = {
	    onLog: React.PropTypes.func,
	    axios: React.PropTypes.func
};


	
ReactDOM.render( <Router history={browserHistory}>
 					<Route path="/replx/ui" component={App} >
 					    <IndexRoute component={About} />
 						<Route path="about" component={About} />
 					   <Route path="try" component={Try} /> 
 					   <Route path="session" component={Session} />
 					   	<Route path="admin" component={Admin} />
 					   	<Route path="error" component={ServerError} />
 					   <Route path="*" component={NoMatch}/>
 					</Route>
 				</Router>
 ,document.getElementById('target'));
