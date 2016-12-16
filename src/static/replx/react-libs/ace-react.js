// http://stackoverflow.com/questions/34088073/a-thin-wrapper-of-ace-editor-to-make-a-react-component
class AceEditor extends React.Component {
	 constructor(props) {
		    super(props);
		    this.gotoLine = this.gotoLine.bind(this);
		    this.xresize = this.xresize.bind(this);
		    this.onChange = this.onChange.bind(this);
  }

	 static defaultProps= {readOnly: false }
  
  onChange(e){
	 console.log("changed:",e);
	 this.props.onValue?this.props.onValue(this.editor.getValue()):null;
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
					    enableLiveAutocompletion : true
					    });
   
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
  //http://stackoverflow.com/questions/376373/pretty-printing-xml-with-javascript
  formatXML(xml){
	  var reg = /(>)(<)(\/*)/g;
	    var wsexp = / *(.*) +\n/g;
	    var contexp = /(<.+>)(.+\n)/g;
	    xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
	    var pad = 0;
	    var formatted = '';
	    var lines = xml.split('\n');
	    var indent = 0;
	    var lastType = 'other';
	    // 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions 
	    var transitions = {
	        'single->single'    : 0,
	        'single->closing'   : -1,
	        'single->opening'   : 0,
	        'single->other'     : 0,
	        'closing->single'   : 0,
	        'closing->closing'  : -1,
	        'closing->opening'  : 0,
	        'closing->other'    : 0,
	        'opening->single'   : 1,
	        'opening->closing'  : 0, 
	        'opening->opening'  : 1,
	        'opening->other'    : 1,
	        'other->single'     : 0,
	        'other->closing'    : -1,
	        'other->opening'    : 0,
	        'other->other'      : 0
	    };

	    for (var i=0; i < lines.length; i++) {
	        var ln = lines[i];
	        var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
	        var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
	        var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
	        var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
	        var fromTo = lastType + '->' + type;
	        lastType = type;
	        var padding = '';

	        indent += transitions[fromTo];
	        for (var j = 0; j < indent; j++) {
	            padding += '    ';
	        }

	        formatted += padding + ln + '\n';
	    }
	    return formatted;
  }
  xresize(e){
	  var c=this.editor.getValue();
	  var c=this.formatXML(c);
	  this.editor.setValue(c);
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
    const style = { border: '1px solid lightgray',flex:"1 0 fill" ,overflow:"auto",height:"100%"};
    const ace={display:'flex',flexDirection:'column'}
      return <div className="acewrap" style={ace}>
    		  	<div>
    		  	<span className="label label-info" >{this.props.mode}</span> {this.props.title}
    		  	<button className="btn btn-default btn-sm" onClick={this.gotoLine}>goto</button>
    		  	<button className="btn btn-default btn-sm" onClick={this.xresize} title="Not recommended">format</button>
    		  	</div>
    		  
		        <div ref="root" style={style}>
		          {this.props.code}
		        </div>
		        {this.props.children}
		     </div>
      ;
  }
}

AceEditor.propTypes={
			    mode: React.PropTypes.string,
			    content: React.PropTypes.string,
			    onClick:React.PropTypes.func,
			    title: React.PropTypes.string,
			    wrap:React.PropTypes.bool,
			    readOnly:React.PropTypes.bool
			  };
AceEditor.defaultProps={
			 mode: 'javascript',
			 code: '//write your code here',
			 title:null,
			 wrap:true,
			 readOnly:false
			 };
