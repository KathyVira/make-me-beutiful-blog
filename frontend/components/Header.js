import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { APP_NAME } from '../config';
import { signout, isAuth } from '../actions/auth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,

} from 'reactstrap';
import '.././node_modules/nprogress/nprogress.css';

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplite = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();



const Header = () =>{
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen);

    return (
        // <div className="container-fluid">
 <div > 
          <Navbar  light expand="sm" className="w-bgr" >
            <Link href="/">
              <NavLink className="font-weight-light text-14">
                Make Me <br /> Beautiful
              </NavLink>
            </Link>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>


              <Nav className="ml-auto justify-content-end" navbar>
               
            {!isAuth() && <React.Fragment>
              
              <NavItem >
                  <Link href="/signin">
                    <NavLink className="text-14">
                      Signin
                    </NavLink>
                  </Link>
                </NavItem>

                <NavItem>
                  <Link href="/signup">
                    <NavLink className="text-14">
                      Signup
                    </NavLink>
                  </Link>
                </NavItem> 

          </React.Fragment>
          }
          {isAuth() && (                
                <NavItem>

                    <NavLink onClick={()=> signout(()=> Router.replace(`/signin`))} className="text-14">
                      Signout
                    </NavLink>

                </NavItem>
          )}
          {isAuth() && isAuth().role == 0 &&(                
                <NavItem>
                  <Link href="/user">

                    <NavLink className="text-14">
                      {`${isAuth().name}'s Dashboard`}
                    </NavLink>
                  </Link>
                </NavItem>
          )}

          {isAuth() && isAuth().role == 1 &&(                
                <NavItem>
                  <Link href="/admin">

                    <NavLink className="text-14">
                      {`${isAuth().name}'s control panel`}
                    </NavLink>
                  </Link>
                </NavItem>
          )}
          {isAuth() && isAuth().role == 1 &&(                
                <NavItem>
                  <Link href="/user">

                    <NavLink className="text-14">
                      {`${isAuth().name}'s Dashboard`}
                    </NavLink>
                  </Link>
                </NavItem>
          )}               
                </Nav>
            </Collapse>
          </Navbar>
            </div>
        // </div>
      );
}



export default Header;