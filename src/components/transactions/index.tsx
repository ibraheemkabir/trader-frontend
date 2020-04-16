
import React, { useContext } from 'react';
import PropTypes, { any } from "prop-types";
import { ThemeContext, Theme } from 'unifyre-react-helper';
import { getRenderedResource } from 'unifyre-native-assets'
import {Divider} from './../divider';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const {ThemedButton,Row,ListItem} = require('unifyre-web-wallet-components');

export function TransactionTile(props:any) {
    const adverts = props.ads.ads;
    adverts.map((e:any)=> console.log(e.accepted[1],e.accepted))
    const theme = useContext(ThemeContext);
    const styles = themedStyles(theme);
    const headers = [
        'Seller','Preffered Payment Method','Price/Crypto','Minimum Volume'
    ]
    
    return (
        <>
        <div style={{...styles.Container,...styles.header}}>
            {
                headers.map(e=><div style={styles.flexItem}>{e}</div>)
            }
        </div>
             {adverts.map((e:any)=> 
             <Link to={`/transaction/${e._id}`} className="moreTransactions">
                <div key={e._id} style={{...styles.Container,...styles.content}}>
                    <div style={{...styles.flexItem,...styles.details}}>
                        {e.userdetails[0].name}
                        <p>Seller Rating : {e.userdetails[0].Reputation.stars}</p>
                    </div>
                    <div style={{...styles.flexItem,...styles.details}}>{e.accepted[0]}</div>
                    <div style={{...styles.flexItem,...styles.details}}>{`${e.amount} ${e.from_cur} / ${e.price} ${e.to_cur}`}</div>
                    <div style={{...styles.flexItem,...styles.details}}>{e.minimum_volume}</div>
                </div>
             </Link>
             )}
        </>
    );
}

TransactionTile.propTypes = {
    placeholder: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    toggleIcon: PropTypes.func,
    ads: PropTypes.any
}

const themedStyles = function (theme:any) {
    return {
        mainContainer: {
            width: '80%'
        },
        label: {
            padding: '8px 15px 0px 16px',
            margin: 0,
            fontSize: '11px',
            color: 'rgb(56, 68, 87)',
            letterSpacing: '0.5px', 
        },
        actionBtn:{
            flex: 0.5,
            width:'1rem',
            padding: '0.3rem 0rem'
        },
        flexItem:{
            flex:1,
            fontSize: '11px',
            fontWeight: 700,
            padding:'2px',
            textAlign:'center' as "center"
        },
        details:{
            flex:1,
            fontSize: '0.7rem',
            padding: '0.5rem 0rem',
            fontWeight: 400,
        },
        content: {
            borderWidth: 0,
            borderBottomWidth: 0.05,
            padding: '0.2rem 0rem',
        },
        header:{
            padding: '0.9rem 0rem',
            fontWeight:400,
            fontSize:'12px'
        },
        Container: {
            borderRadius: 0,
            borderColor: 'rgb(220, 220, 220)',
            borderWidth: '0.1px 0.1px 0.1px',
            borderStyle: 'solid',
            backgroundColor:  '#ecf3fe',
            borderBottomWidth: 0.1,
            width: '95%',
            margin:'auto', 
            height: 'auto',
            display: 'flex',
            justifyContent: 'space-evenly',
            padding: '0.2rem 0rem',
            fontSize: '0.9rem',
            fontFamily: 'roboto',
            color: 'rgb(0, 0, 0)'
            // paddingLeft: theme.get(Theme.Spaces.screenMarginHorizontal),
            // paddingRight: theme.get(Theme.Spaces.screenMarginHorizontal),
        },
        inputContainer: {
            borderRadius: 0,
            borderColor: 'rgb(220, 220, 220)',
            borderWidth: '0px 0px 0.8px 0px',
            borderStyle: 'solid',
            backgroundColor:  '#ecf3fe',
            display: "flex",
            borderBottomWidth: 0.05,
            width: '95%',
            margin:'auto', 
            height: '30px',
            fontSize: '20px',
            padding: '1.5px 6px'
            // paddingLeft: theme.get(Theme.Spaces.screenMarginHorizontal),
            // paddingRight: theme.get(Theme.Spaces.screenMarginHorizontal),
        },
        input: {
            backgroundColor: '#ecf3fe',
            fontSize: '1.3rem',
            color: '#000000',
            paddingLeft: theme.get(Theme.Button.btnBorderRadius),
            flex: 1,
            display: 'inline-block', 
            border: 'none',
            outline: 'none',
            width: '80%',
            padding: '0px 8px'
        },
        icon: {
            marginLeft: '70px',
            height: theme.get(Theme.Text.h2Size) * 0.5,
            width: theme.get(Theme.Text.h2Size) * 0.5,
            justifyContent: 'center',
            alignSelf: 'center',
            marginRight: 'auto',
            float:'left',
            cursor:'pointer',
        },
        iconContainer: {
            justifyContent: 'center',
            marginTop:2,
            backgroundColor: '#ecf3fe',
            border: 'none',
            outline: 'none'
        },
    }
}

