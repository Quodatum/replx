/* react general components
 * 
 * DefaultApp: an App with message and http services
 * NoMatch: handle 404
 * ServerError: display info about a server error.
 * LoadingMsg: wait spinner with test or html children
 * CountLabel: text and a number in circle
 * PanelItem: title and html children
 * 
 * abunce July 2016
 */
class DefaultApp extends React.Component {
  constructor(props) {
    super(props);
    this.onLog = this.onLog.bind(this);
    this.initialState = this.initialState.bind(this);
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
          // console.log("response");
          return response;
        }, function (error) {
          // Do something with response error
          console.log("axios error:",error.response);

          that.props.history.push({
            pathname:"/error",
            state: { err: error.response }})
            // return Promise.reject(error);
        }
    );
    this.initialState();
  }
  initialState(){
    this.state = { msg:"override initalState.."}; 
  }

  // logging and request apis
  getChildContext() {
    return {onLog: this.onLog,
      axios:this.axios};
  }
  onLog(msg){
    this.setState({msg:msg});
  }  
};
DefaultApp.childContextTypes = {
    onLog: React.PropTypes.func,
    axios: React.PropTypes.func
};  

class NoMatch extends React.Component {
  render() {
    return  <GrailBody><div>404: Not found 
    <Link to="/">Home</Link>
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
    return  <GrailBody>
    <div>Server Error
    <Link to="/">Home</Link>
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

class LoadingMsg extends React.Component {
  render() {
    return <div>
    <i className="fa fa-spinner fa-pulse  fa-fw" aria-hidden="true"></i>{this.props.children}
    </div>
  }
};


class GrailBody extends React.Component {
  render() {
    return <div style={{display: "flex",flex: 1}}>{this.props.children}</div>
  }
};

//bootstrap label with badge count
//title:
//count
//children
//labelCls
class CountLabel  extends React.Component {
  render() {
    var count=this.props.count;
    var ok=0==count;
    var cls=(this.props.labelCls)?this.props.labelCls:("label "+(ok?"label-success":"label-danger"));
    return  <span title={this.props.title}
    className={cls}>
    <span>{this.props.children}</span>
    <span className="badge " >{count}</span>
    </span>
  }
};

//create a simple panel with a title and flex properties
class PanelItem  extends React.Component {
  render() {
    var flex=this.props.flex; // 0 0 width
    return (
        <div className="qd-panel panel panel-info" style={{ flex: flex}}>
        <div className="panel-heading">{this.props.title}</div>
        <div className="qd-panel-body panel-body" style={{backgroundColor: "white"}}>
        {this.props.children}
        </div>
        </div>
    );
  }
};