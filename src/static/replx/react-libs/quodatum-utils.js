/* react general components
 * LoadingMsg
 * CountLabel
 * PanelItem
 * abunce July 2016
 */
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

// bootstrap label with badge count
// title:
// count
// children
// labelCls
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