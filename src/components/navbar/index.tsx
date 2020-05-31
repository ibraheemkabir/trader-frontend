import React,{useEffect} from 'react';
import './navbar.scss';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';

export const Navbar = (props:any) => {
    const dispatch = useDispatch()

    var retrievedObject:any = localStorage.getItem('user');
        useEffect(() => {
            console.log(props)
            if(retrievedObject){
                dispatch({
                    type: 'user/LOGIN',
                    payload: JSON.parse(retrievedObject)
                });
            }
        }, [])
    
    return(
        <div className="nav-container sideLinks" onClick={()=>props.handleSideBar()}>
            <p className="logo">
               <Link to={"/dashboard"} className="logo-link"> PeerCoin </Link>
            </p>
            <div className="auth-section">
                {
                    !props.user.user.name
                    ? 
                    <div className="sideOptions"> 
                        <p className="sideLinks">
                            LOGIN
                        </p>
                    </div>
                    :
                    <>
                    <p></p>
                    <p className="sideLinks profile">
                       Hello <Link to='/profile'>{props.user.user.name}</Link>
                    </p>
                    </>
                }
               
            </div>
        </div>
    )
}

