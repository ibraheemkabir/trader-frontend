import React,{useState,useEffect} from 'react';
import './buy.scss';
import {InputGroupAddon} from './../inputGroup';
import {SelectGroupAddon} from './../selectGroup';
import {Divider} from './../divider';
const {ThemedButton,Row,ListItem} = require('unifyre-web-wallet-components');

export function BuyContainer (props:any){
    const [active,setActive]=useState(true);
    
    const handlePress = () => {
        setActive(!active);
    }

    const handlePostAd = async () => {
        let data = {
            "user_id":"456fghhhhhhgf3",
            "amount":"0.505",
            "from_cur":"FRM",
            "to_cur":"NGN",
            "price":"5000",
            "active":"true",
            "country":"NG",
            "accepted":["paypal","bankTransfer"],
            "city":"lagos","zip":"234",
            "minimum_volume":"0.05"
        }
        await props.ad(data)
    }



    return(
        <div className="buy-container">
            <div className="tabs">
                <p className={!active ? 'inActive' :'active'} onClick={handlePress}>Quick Buy</p>
                <div className="TabdividerContainer">
                <div className="btnDivider"></div>
                </div>
                <p className={active ? 'inActive' :'active'} onClick={handlePress}>Quick Sell</p>
            </div>
            {
                active ?
                <>
                <InputGroupAddon placeholder={'0.001'} fieldlabel={'Amount to buy'} options={[{value: 1, label: 'BTC'}, {value: 2, label:'ETH'}]}/>
                <div className="dividerContainer">
                    <Divider Gap={'big'}/>
                </div>
                <InputGroupAddon placeholder={'0.001'} fieldlabel={'Estimated Cost'} options={[{value: 1, label: 'NGN'}, {value: 2, label:'EUR'}]}/>
                <div className="dividerContainer">
                    <Divider Gap={'big'}/>
                </div>
                <SelectGroupAddon placeholder={'Paypal'} fieldlabel={'Preferred Payment Option'}/>
                <div className="btnContainer">
                    <ThemedButton text={'Search for Offers'} type='primary'/>
                </div>
                </>
                : 
                <>
                    <InputGroupAddon placeholder={'0.001'} fieldlabel={'Amount to Sell'} options={[{value: 1, label: 'BTC'}, {value: 2, label:'ETH'}]}/>
                    <div className="dividerContainer">
                        <Divider Gap={'big'}/>
                    </div>
                    <InputGroupAddon placeholder={'0.001'} fieldlabel={'Estimated Cost'} options={[{value: 1, label: 'EUR'}, {value: 2, label:'NGN'}]}/>
                    <div className="dividerContainer">
                        <Divider Gap={'big'}/>
                    </div>
                    <InputGroupAddon placeholder={'0.001'} fieldlabel={'Minimum Volume available per trade'} options={[{value: 1, label: 'BTC'}, {value: 2, label:'ETH'}]}/>
                    <div className="dividerContainer">
                        <Divider Gap={'big'}/>
                    </div>
                    <SelectGroupAddon placeholder={'Paypal'} fieldlabel={'Preferred Payment Option'}/>
                    <div className="btnContainer">
                        <ThemedButton onPress={()=>handlePostAd()} text={'Post Trade Advert'} type='primary'/>
                    </div>
                </>
            }
           
        </div>
    )
}

