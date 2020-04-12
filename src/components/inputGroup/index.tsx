
import React, { useContext } from 'react';
import PropTypes from "prop-types";
import { ThemeContext, Theme } from 'unifyre-react-helper';
import { getRenderedResource } from 'unifyre-native-assets'
import {Divider} from './../divider';
import Dropdown from './../dropdown'

export function InputGroupAddon({placeholder='',fieldlabel='',editable=true,value=0,options=[{}],...props}) {

    const theme = useContext(ThemeContext);
    const styles = themedStyles(theme);

    return (
            <div style={styles.Container}>
                <div style={styles.mainContainer}> 
                    <p style={styles.label}>
                        {fieldlabel}
                    </p>
                    <div style={styles.inputContainer} >
                    <input
                        defaultValue={value}
                        maxLength={40}
                        style={styles.input}
                        placeholder={placeholder}
                        {...props}
                    />
                    </div>
                </div>
            <div>
                <Divider Gap={'large'}/>
            </div>
            <div style={styles.dropdownContainer}>
                <Dropdown 
                list={options} 
                caret={false}/>   
            </div>
        </div>
    );
}

InputGroupAddon.propTypes = {
    placeholder: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    toggleIcon: PropTypes.func,
}

const themedStyles = function (theme:any) {
    return {
        mainContainer: {
            width: '1000%'
        },
        label: {
            padding: '5px 0px 2px 15px',
            margin: '0px',
            fontSize: '0.6rem',
            color: 'rgb(56, 68, 87)',
            letterSpacing: '0.5px', 
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
            padding: '0px',
            display: 'flex'
            // paddingLeft: theme.get(Theme.Spaces.screenMarginHorizontal),
            // paddingRight: theme.get(Theme.Spaces.screenMarginHorizontal),
        },
        inputContainer: {
            borderRadius: theme.get(Theme.Button.btnBorderRadius),
            borderColor: theme.get(Theme.Input.inputBackground),
            borderWidth: 0,
            borderStyle: 'solid',
            backgroundColor: '#ecf3fe',
            display: "flex",
            borderBottomWidth: 0.1,
            width: '95%',
            margin:'auto', 
            height: 'auto',
            fontSize: '20px',
            padding: '0.2px 6px'
            // paddingLeft: theme.get(Theme.Spaces.screenMarginHorizontal),
            // paddingRight: theme.get(Theme.Spaces.screenMarginHorizontal),
        },
        input: {
            backgroundColor: '#ecf3fe',
            fontSize: '1.0rem',
            color: '#000000',
            paddingLeft: theme.get(Theme.Button.btnBorderRadius),
            flex: 1,
            display: 'inline-block', 
            border: 'none',
            outline: 'none',
            width: '70%',
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
        dropdownContainer:{
            margin: '0.55rem 0px'
        }
    }
}

