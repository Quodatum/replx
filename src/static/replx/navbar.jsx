var {Button,Nav,Navbar,NavItem,NavDropdown,FormGroup,FormControl,InputGroup,MenuItem}=ReactBootstrap;

class HeaderItem extends React.Component {
 constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.state={q: "lost it??"};
 }
 
   onSearch(e){
      e.preventDefault();
      appHistory.push({
                        pathname:"/search",
                        state: this.state
                        });
 }            
render() {return  <Navbar >
    <Navbar.Header>
      <Navbar.Brand>
       <Link to="/" >
            REPL.x
            <img src="/static/replx/logo.svg" style={{width: "20px", height: "20px"}}
                    className="pull-left" />
            </Link> 
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
     <NavItem eventKey={1} href="#"><Link to="/session" activeClassName="active-link" 
        title="Enter your own Xquery">Session</Link>
      </NavItem>

     <NavItem eventKey={2} href="#">
        <Link to="/library" activeClassName="active-link" 
                title="Validate your own XML">Libraries</Link>
     </NavItem>
     <NavItem eventKey={3} href="#">         
            <Link to="/validate" activeClassName="active-link" 
                title="Validate your own XML">Validate</Link>
    </NavItem>
     </Nav>
    <Nav> 
      <Navbar.Form >
        <FormGroup>
        <InputGroup>
          <FormControl type="text" placeholder="Search - not yet" />
            <InputGroup.Button>
            <Button onClick={this.onSearch}>                   
             <i className="glyphicon glyphicon-search"></i>  
             </Button>           
           </InputGroup.Button>
        </InputGroup>
        </FormGroup>
      </Navbar.Form> 
    </Nav>
    <Nav pullRight>
     <NavDropdown eventKey={3} title="About" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3}>Separated link</MenuItem>
      </NavDropdown>
    </Nav>
    </Navbar>
    }
};