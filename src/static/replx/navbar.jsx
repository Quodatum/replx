var {Button,Nav,Navbar,NavItem,NavDropdown,FormGroup,FormControl,InputGroup,MenuItem}=ReactBootstrap;
var {LinkContainer,IndexLinkContainer}=ReactRouterBootstrap;

class HeaderItem extends React.Component {
 constructor(props) {
    super(props);
    this.state={q: ""};
 } 
  handleSearchChange(e) {
    this.setState({q: e.target.value});
  } 
   onSearch(e){
    var q=this.state.q
    e.preventDefault();
    if(q) appHistory.push({ pathname:"/search",query: {q:q}});
 }            
render() {return  <Navbar >
    <Navbar.Header>
      <Navbar.Brand>
       <a href="/replx" >
            REPL.x
            <img src="/static/replx/logo.svg" style={{width: "20px", height: "20px"}}
                    className="pull-left" />
            </a> 
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
    <IndexLinkContainer to="/session"    title="Enter your own Xquery">
     <NavItem eventKey={1} href="#">Session</NavItem>
    </IndexLinkContainer>
    
    <IndexLinkContainer to="/library"   title="XQuery libraries">
     <NavItem eventKey={2} href="#">Libraries   </NavItem>
     </IndexLinkContainer>
     
     <IndexLinkContainer to="/validate" title="Validate your own XML">
        <NavItem eventKey={3} href="#">Validate</NavItem>
    </IndexLinkContainer>
     </Nav>
     
     <Nav pullRight>
     <NavDropdown eventKey={3} title="About" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>doc</MenuItem>
        <MenuItem divider />
        <LinkContainer to="/about"  title="About REPL.x">
            <MenuItem eventKey={3.3}>About</MenuItem>
        </LinkContainer> 
      </NavDropdown>
    </Nav>
    
          <form className='navbar-form' action="" onSubmit={(e) => this.onSearch(e)}>
           <InputGroup>
           <FormControl type="text" placeholder="Search - not yet"  
           value={this.state.q} onChange={(e) => this.handleSearchChange(e)}/>
            <InputGroup.Button>
            <Button  type='submit'>
                <i className="glyphicon glyphicon-search"></i>
              </Button>           
           </InputGroup.Button>
            </InputGroup>
          </form>
 </Navbar>   
 
   
 
    }
};