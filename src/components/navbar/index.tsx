import React,{useEffect} from 'react';
import './navbar.scss';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';

export const Navbar = (props:any) => {
    const dispatch = useDispatch()

    var retrievedObject:any = localStorage.getItem('user');
        useEffect(() => {
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
                    <p className="sideLinks profile">
                        {props.user.user.advertiser ? <Link to='/traderTransactions'>Transactions</Link>: <></>}
                    </p>
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

