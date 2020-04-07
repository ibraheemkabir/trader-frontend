import React from 'react';
import './buy.scss';
import {InputGroupAddon} from './../inputGroup';
import {SelectGroupAddon} from './../selectGroup';
import {Divider} from './../divider';
const {ThemedButton,Row,ListItem} = require('unifyre-web-wallet-components');

export const BuyContainer = () => {
    return(
        <div className="buy-container">
            <div className="tabs">
                <p>Quick Buy</p>
                <div className="TabdividerContainer">
                <div className="btnDivider"></div>
                </div>
                <p className="inActive">Quick Sell</p>
            </div>
            <InputGroupAddon placeholder={'0.001'} fieldlabel={'Amount to buy'}/>
            <div className="dividerContainer">
                <Divider Gap={'big'}/>
            </div>
            <InputGroupAddon placeholder={'0.001'} fieldlabel={'Estimated Cost'}/>
            <div className="dividerContainer">
                <Divider Gap={'big'}/>
            </div>
            <SelectGroupAddon placeholder={'Paypal'} fieldlabel={'Preferred Payment Option'}/>
            <div className="btnContainer">
                <ThemedButton text={'Search for Offers'} type='primary'/>
            </div>
        </div>
    )
}

