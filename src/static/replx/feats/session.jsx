// enter query, execute on server, display results
class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state={value:"",
                chat:[]};
    this.send = this.send.bind(this);
    this.onValue = this.onValue.bind(this);
     this.onClear = this.onClear.bind(this);
  }
  componentDidMount(){
            var that=this;
            console.log("samples",this.props,that.context);
            that.context.onLog("Requesting queries...");
            that.context.axios.get("data/queries"+this.props.location.search,axios_json)
            .then(function(r){
                    console.log(r.data);
                    var u=that.state.chat.slice(0);
                    u.concat(r.data.items); 
                     console.log("£££",u);
                     that.setState({chat:r.data.items});
                     that.context.onLog("queries loaded.");
                     })
            .catch(function (error) {
                console.log(error);
              alert("Get queries error")
              });

        }
  send(){
    var that=this;
    var value=this.state.value;
    var body=Qs.stringify({value:value});
    this.context.axios.post("query",body,axios_json)
    .then(function(r){
            console.log("send",r);
            that.setState(function(previousState, currentProps){
            var chat={created:new Date(),query:value,id:r.data.id,result:r.data.result,error:r.data.error};
            var u=previousState.chat.slice(0);
            return {chat:u,value:r.data.error?previousState.value:""};
        });
    })
    }
  onValue(value){
   // console.log("value:",value);
    this.state.value=value;
 }
  onClear(value){
    console.log("value:",value);
    this.setState({value:""});
 }
  onClick(value){
    console.log("value:",value);
   alert("click");
 }
  render() {
    var rows = [],that=this;
    console.log("************",this.state.chat);
    this.state.chat.forEach(function(chat) {
      rows.push(<SessionItem chat={chat} key={chat.id} onClick={that.onClick}/>);
    });
      return  <GrailBody>
      <div className="HolyGrail-content" style={{display:"flex" ,flexDirection: "column"}}>
            <div style={{flex:"1",display:"flex" ,flexDirection: "column"}}>
              <div>The log {this.state.chat.length}</div>
              <div style={{flex:"1",height:"100%",backgroundColor:"yellow"}}>
              <div className="acewrap container-fluid" style={{overflow:"auto"}}>{rows}</div>
              </div>
            </div>
              <div   style={{border: '1px solid green'}}>
               <div className="btn-group" role="group" aria-label="Clear">
                  <button className="btn btn-sm btn-info" onClick={this.onClear}>clear</button>
               </div>
               <div className="btn-group" role="group" aria-label="Run">
                 <button className="btn btn-sm btn-info" onClick={this.send}>run</button>
               </div>
              <AceEditor2 title="test" mode="xquery" 
                  code={this.state.value} onValue={this.onValue} onSubmit={this.send}/>
              </div>
      </div>
      </GrailBody>
      }
  };
Session.contextTypes  = {
    onLog: React.PropTypes.func,
    axios: React.PropTypes.func
};
  
class SessionItem extends React.Component {
render(){
    var chat=this.props.chat;
    return <div  >
    <div className="row">
     <div className="col-md-1" title={chat.id + ": " +chat.created}>
     <button onClick={this.props.onClick}>id:{chat.id}</button>
     </div>
     <div className="col-md-11"><pre>{chat.query}</pre></div>
    </div>
     <div className="well" style={{whiteSpace: "pre-wrap",fontFamily:"monospace"}}>
           {chat.result}
             <div>{Qs.stringify(chat.error)}</div>
        </div>
        </div>      
}
};
