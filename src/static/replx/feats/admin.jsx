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