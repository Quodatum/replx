// http://stackoverflow.com/questions/34088073/a-thin-wrapper-of-ace-editor-to-make-a-react-component
class AceEditor2 extends React.Component {
	 constructor(props) {
		    super(props);
		    this.gotoLine = this.gotoLine.bind(this);
		    this.onChange = this.onChange.bind(this);
		    this.onSubmit = this.onSubmit.bind(this);
  }

	 static defaultProps= {readOnly: false }
  
	onChange(e){
	     //console.log("changed:",e);
	     this.props.onValue?this.props.onValue(this.editor.getValue()):null;
	}
	 onSubmit(e){
	      this.props.onSubmit?this.props.onSubmit():null;
	  }
  componentDidMount(){
    const node = ReactDOM.findDOMNode(this.refs.root);
    ace.config.set("workerPath", "/static/replx/ace-workers") 
    const editor = ace.edit(node);
    this.editor=editor;
    var theme="chrome";
    editor.setTheme("ace/theme/"+theme);
    var session=editor.getSession();
    session.setMode("ace/mode/"+this.props.mode);
    session.setUseWrapMode(this.props.wrap);
    session.on('change',this.onChange);
    editor.$blockScrolling = Infinity;
    editor.setShowPrintMargin(false);
    editor.setOptions({ readOnly:this.props.readOnly,
    					enableSnippets : true,
					    enableBasicAutocompletion : true,
					    enableLiveAutocompletion : false,
					    minLines: 4,
					    maxLines: 12
					    });
    editor.commands.addCommand({
      name: "submit",
      exec: this.onSubmit,
      bindKey: {mac: "cmd-enter", win: "ctrl-enter"}
  });
    node.focus();
  }
  
  onClick(e){
	  this.props.onClick(4);
  }
  gotoLine(e){
	 var line=prompt("Goto line number?");
	 if (!line)return;
	 var e=this.editor;
	 e.resize(true);
	 e.scrollToLine(line, true, true, function () {});
	 e.gotoLine(line, 10, true);
  }

  componentWillReceiveProps(nextProps){
	 
	  if (this.editor && this.editor.getValue() !== nextProps.code) {
	      // editor.setValue is a synchronous function call, change event is emitted before setValue return.
		  const pos = this.editor.session.selection.toJSON();
		  this.editor.setValue(nextProps.code);
		  this.editor.session.selection.fromJSON(pos);
	      //alert("will: "+nextProps.code);
	  }
  }
  shouldComponentUpdate(nextProps, nextState) {
	  return false;
	}

  componentWillUnmount() {
	    this.editor.destroy();
	    this.editor = null;
	}
  render() {
    const style = {flex:"1 0 fill" ,overflow:"auto",height:"100%"};
    const ace={display:'flex',flexDirection:'column'}
      return  <div ref="root" style={style}>
		          {this.props.code}
		        </div>
      ;
  }
}

AceEditor2.propTypes={
			    mode: React.PropTypes.string,
			    content: React.PropTypes.string,
			    onClick:React.PropTypes.func,
			    title: React.PropTypes.string,
			    wrap:React.PropTypes.bool,
			    readOnly:React.PropTypes.bool
			  };
AceEditor2.defaultProps={
			 mode: 'javascript',
			 code: '//write your code here',
			 title:null,
			 wrap:true,
			 readOnly:false
			 };
