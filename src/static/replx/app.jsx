/*
Consignment validator app
abunce july 2016
*/

var { Router, Route, IndexRoute, Link, useRouterHistory} = ReactRouter;
var { createHistory } = History;

var apiBase="/replx/api/";

var axios_json={ headers: {accept: 'application/json'}};

// http://stackoverflow.com/questions/36158945/double-base-path-when-using-push-with-basename/36159382#36159382
const appHistory = useRouterHistory(createHistory)({
      basename: "/replx/ui"
    });
    
class App extends DefaultApp {
	 constructor(props, context) {
    super(props, context);
   this.state = { msg:"Welcome to repl.X +",
                  q:"in app"}; 
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




class HeaderItem extends React.Component {
 constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.state={q: "lost it??"};
 }
 
   onSearch(e){
      e.preventDefault();
      appHistory.push({
                        pathname:"/search",
                        state: this.state
                        });
 }            
render() {return  <nav className="navbar navbar-default navbar-fixed-top" style={{marginBottom: "0px"}}>
        <div className="container">
		<div className="navbar-header"> 
			<Link to="/" className="navbar-brand">
			repl.X</Link> 
		</div>
		<ul className="nav navbar-nav" >
    		<li><Link to="/session" activeClassName="active-link" 
              title="Enter your own Xquery">Session</Link></li>
             <li><Link to="/library" activeClassName="active-link" 
                title="Validate your own XML">Libraries</Link></li> 
			<li><Link to="/validate" activeClassName="active-link" 
				title="Validate your own XML">Validate</Link></li>
		</ul>
		<div className="col-sm-3 col-md-3 pull-right">
                <form className="navbar-form" role="search" onSubmit={this.onSearch}>
                    <div className="input-group">
                        <input type="text"  className="form-control input-sm"
                            placeholder="NO Search YET" name="q" id="q" />
                        <div className="input-group-btn">
                            <button className="btn btn-default input-sm" type="submit">
                                <i className="glyphicon glyphicon-search"></i>
                            </button>
                        </div>
                    </div>
                </form>

            </div>
		<ul className="nav navbar-nav" style={{float:"right"}}>
			<li><Link to="/about" activeClassName="active-link" >About</Link></li>
		</ul>
		</div>		
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
    	    <li><Link to="/admin">admin</Link>.</li>
    	     <li><Link to="/treetest">Treetest</Link>.</li>
	    </ul> 
	    </PanelItem>
	    </GrailBody>
    }
};
class TreeTest extends React.Component {
render() {
    return  <GrailBody><div>Tree here
    </div>
    </GrailBody>
    }
};
class Library extends React.Component {
render() {
    return  <GrailBody><div>Library here
    </div>
    </GrailBody>
    }
};
class Search extends React.Component {
render() {
    var q=this.props.location.state.q;
    console.log("search",this.props);
    return  <GrailBody>
    <div>Search here: {q}</div>
    </GrailBody>
    }
};
	
ReactDOM.render( <Router history={appHistory}>
 					<Route path="/" component={App} >
 					    <IndexRoute component={About} />
 						<Route path="about" component={About} />
 					    <Route path="session" component={Session} /> 
 					    <Route path="validate" component={Try} /> 
 					    <Route path="library" component={Library} />
 					   	<Route path="admin" component={Admin} />
 					   	<Route path="treetest" component={TreeTest} />
 					   	<Route path="search" component={Search} />  
 					   	<Route path="error" component={ServerError} />
 					    <Route path="*" component={NoMatch}/>
 					</Route>
 				</Router>
 ,document.getElementById('target'));
