import React, { useContext } from 'react';
import PropTypes from "prop-types";
import { ThemeContext, Theme } from 'unifyre-react-helper';
import { getRenderedResource } from 'unifyre-native-assets'

export const Divider = ({Gap='small'}) => {

    const theme = useContext(ThemeContext);
    const styles = themedStyles(theme);

    return (
        <div>
            {Gap === 'small' && <p style={styles.Container}></p>}
            {Gap === 'big' && <p style={styles.smallContainer}></p>}
            {Gap === 'large' && <p style={styles.largeContainer}></p>}
        </div>
    );
}

Divider.propTypes = {
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
        Container: {
            borderRadius: 0,
            borderColor: 'rgb(1, 16, 46)',
            borderWidth: 0.5,
            borderStyle: 'solid',
            backgroundColor:  '#ecf3fe',
            borderBottomWidth: 0,
            width: '0%',
            height: '10px',
            padding: '8px 0px',
            margin: '0px'
            // paddingLeft: theme.get(Theme.Spaces.screenMarginHorizontal),
            // paddingRight: theme.get(Theme.Spaces.screenMarginHorizontal),
        },
        smallContainer: {
            borderRadius: 0,
            borderColor: 'rgb(1, 16, 46)',
            borderWidth: 0.5,
            borderStyle: 'solid',
            backgroundColor:  '#ecf3fe',
            borderBottomWidth: 0,
            width: '0%',
            height: '5px',
            padding: '8px 0px',
            margin: '0px'
        },
        largeContainer: {
            borderRadius: 0,
            borderColor: 'rgba(10, 11, 12, 0.35)',
            borderWidth: 0.5,
            borderStyle: 'solid',
            backgroundColor:  '#ecf3fe',
            borderBottomWidth: 0,
            width: '0%',
            height: '23px',
            padding: '8px 0px',
            margin: 'inherit'
        }
    }
}

