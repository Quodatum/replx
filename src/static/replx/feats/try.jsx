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