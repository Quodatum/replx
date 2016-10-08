/*
Consignment validator app
abunce july 2016
*/
var Button=ReactBootstrap.Button;
var { Router, Route, IndexRoute, Link, useRouterHistory} = ReactRouter;
var { createHistory } = History;

var apiBase="/replx/api/";

var axios_json={ headers: {accept: 'application/json'}};

// http://stackoverflow.com/questions/36158945/double-base-path-when-using-push-with-basename/36159382#36159382
const appHistory = useRouterHistory(createHistory)({
      basename: "/replx/ui"
    });

// https://github.com/ReactTraining/react-router/issues/394#issuecomment-220221604    
function hashLinkScroll() {
  const { hash } = window.location;
  if (hash !== '') {
    // Push onto callback queue so it runs after the DOM is updated,
    // this is required when navigating from a different page so that
    // the element is rendered on the page before trying to getElementById.
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView();
    }, 0);
  }
} 
   
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





var About = class About extends React.Component {
render() {
	    var version=document.body.getAttribute("data-version");
	    return 	<GrailBody>
	    <PanelItem title={"About REPL.x (version:  "+version+")"} flex="1 0 60em">
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
     <Button bsStyle="warning">Warning</Button>
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
	
ReactDOM.render( <Router history={appHistory}  onUpdate={hashLinkScroll}>
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
