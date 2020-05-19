import React,{useState,useEffect} from 'react';
import './buy.scss';
import {InputGroupAddon} from './../inputGroup';
import {SelectGroupAddon} from './../selectGroup';
import {Divider} from './../divider';
const {ThemedButton,Row,ListItem} = require('unifyre-web-wallet-components');

export function BuyContainer (props:any){
    const [active,setActive]=useState(true);
    const [amount, setAmount] = useState(0);
    const [cost, setCost] = useState(0);
    const [minimum, setMinimum] = useState(0);
    const [amountValue, setamountValue] = useState('');
    const [costValue, setcostValue] = useState('');
    const [prefValue, setprefValue] = useState('');

    const chooseItem = (value:any) => {    
        setamountValue(value)
    };

    const choosePrefType = (value:any) => {    
        setprefValue(value)
    };

    const setcostItem = (value:any) => {    
        setcostValue(value)
    };


    const handlePress = () => {
        setActive(!active);
    }

    const handlePostAd = async () => {
        console.log(cost,amount,minimum,amountValue,costValue,prefValue,props.user.unifyreId);
        let data = {
            "user_id":props.user.unifyreId,
            "amount":amount,
            "from_cur":amountValue,
            "to_cur":costValue,
            "price":cost,
            "active":true,
            "country":props.user.country,
            "accepted":[prefValue],
            "city":props.user.city,
            "zip":props.user.zip,
            "minimum_volume":minimum
        }
        await props.ad(data)
    }

    const handleFilter = async () => {
        console.log(cost,amount,minimum,amountValue,costValue,prefValue,props.user.unifyreId);
    
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
                <InputGroupAddon 
                    placeholder={'0.001'} 
                    fieldlabel={'Amount to buy'}
                    onChange={(e:any) => setAmount(e.target.value)}
                    chooseItem={chooseItem}
                    options={[{value: 1, label: 'BTC'}, {value: 2, label:'ETH'}]}
                />

                <div className="dividerContainer">
                    <Divider Gap={'big'}/>
                </div>
                <InputGroupAddon 
                    placeholder={'0.001'} 
                    fieldlabel={'Estimated Cost'}
                    onChange={(e:any) => setCost(e.target.value)}
                    options={[{value: 1, label: 'NGN'}, {value: 2, label:'EUR'}]}
                    chooseItem={setcostItem}
                />
                <div className="dividerContainer">
                    <Divider Gap={'big'}/>
                </div>
                <SelectGroupAddon 
                placeholder={'Paypal'} 
                fieldlabel={'Preferred Payment Option'}
                chooseItem={choosePrefType}
                />
                <div className="btnContainer">
                    <ThemedButton text={'Search for Offers'} type='primary' onPress={()=>props.filter(props.ads,Number(amount),amountValue)}/>
                </div>
                </>
                : 
                <>
                    <InputGroupAddon 
                        placeholder={'0.001'} 
                        fieldlabel={'Amount to Sell'} 
                        options={[{value: 1, label: 'BTC'}, {value: 2, label:'ETH'}]}
                        onChange={(e:any) => setAmount(e.target.value)}
                        chooseItem={chooseItem}
                    />
                    <div className="dividerContainer">
                        <Divider Gap={'big'}/>
                    </div>
                    <InputGroupAddon 
                        placeholder={'0.001'} 
                        fieldlabel={'Estimated Cost'} 
                        onChange={(e:any) => setCost(e.target.value)}
                        options={[{value: 1, label: 'NGN'}, {value: 2, label:'EUR'}]}
                        chooseItem={setcostItem}
                    />
                    <div className="dividerContainer">
                        <Divider Gap={'big'}/>
                    </div>
                    <InputGroupAddon 
                    placeholder={'0.001'} fieldlabel={'Minimum Volume available per trade'} 
                    options={[{value: 1, label: 'BTC'}, {value: 2, label:'ETH'}]}
                    onChange={(e:any) => setMinimum(e.target.value)}
                    chooseItem={chooseItem}
                    />
                    <div className="dividerContainer">
                        <Divider Gap={'big'}/>
                    </div>
                    <SelectGroupAddon placeholder={'Paypal'} fieldlabel={'Preferred Payment Option'}  chooseItem={choosePrefType}/>
                    <div className="btnContainer">
                        <ThemedButton onPress={()=>handlePostAd()} text={'Post Trade Advert'} type='primary'/>
                    </div>
                </>
            }
           
        </div>
    )
}

