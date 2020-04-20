import React from 'react';
import './side.scss';
import { Link } from "react-router-dom";

export const SideNav = ({width='0%',user= {} as any}) => {
    return (
        <div id="mySidenav" className="sidenav" style={{width}}>
            <a href="/dashboard">Dashboard</a>
            {user.user.advertiser ? <Link to='/traderTransactions'>Transactions</Link>: <></>}
            {!user.user.advertiser ? <Link to='/myTransactions'>Transactions</Link>: <></>}
            <Link to='/alltransactions'>Buy Trades</Link>
            <Link to='/sales'>Sell Trades</Link>
            <Link to='/profile'>My Profile</Link>
            {user.user.advertiser ? <div className="highlight"><Link to='#'>Post A Sale Request</Link></div>: <></>}
            <div className="highlight"><Link to='/saleRequest'>Post A Buy Request</Link></div>
        </div>
    )
}