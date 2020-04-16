import React from 'react';
import './side.scss';

export const SideNav = ({width='0%'}) => {
    return (
        <div id="mySidenav" className="sidenav" style={{width}}>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
        </div>
    )
}