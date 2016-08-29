// enter query, execute on server, display results
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
            console.log("send",r);
            that.setState(function(previousState, currentProps){
            var u=previousState.chat.slice(0);
            u.push({created:new Date(),query:value,result:r.data});
            console.log(u);
            return {chat:u};
        });
    })
    }
  onValue(value){
    //console.log("value:",value);
    this.state.value=value;
 }
  render() {
    var rows = [],that=this;
    this.state.chat.forEach(function(chat) {
      rows.push(<SessionItem chat={chat} key={"Q"+chat.result.id} />);
    });
      return  <GrailBody>
      <div className="HolyGrail-content" style={{display:"flex" ,flexDirection: "column"}}>
            <div style={{flex:"1"}}>
              <div>The log {this.state.chat.length}</div>
              <div>{rows}</div>
            </div>
            <AceEditor2 title="test" mode="xquery" 
            code={this.state.value} onValue={this.onValue} onSubmit={this.send}/>
            <div><button className="btn btn-sm btn-info" onClick={this.send}>run</button></div>
            
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
    return <div>
            <div style={{marginLeft:"5em"}}>{this.props.chat.query}</div>
            <div><pre>{this.props.chat.result.result}</pre></div>
        </div>      
}
};
