import React from 'react';
import './navbar.scss';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const Navbar = (props:any) => {
    console.log(props,'===<>==')
    return(
        <div className="nav-container sideLinks">
            <p className="logo">
               <Link to={"/dashboard"} className="logo-link"> LOCALBIT </Link>
            </p>
            <div className="auth-section">
                {
                    props.user.name === ''
                    ? 
                    <> 
                        <p className="sideLinks">
                            LOGIN
                        </p>
                        <p className="sideLinks">
                            SIGNUP
                        </p>
                    </>
                    :
                    <> 
                    <p className="sideLinks">
                       Hello <Link to='/profile/:35'>{props.user.user.name}</Link>
                    </p>
                    </>
                }
               
            </div>
        </div>
    )
}

