import React, { useContext } from 'react';
import PropTypes from "prop-types";
import { ThemeContext, Theme } from 'unifyre-react-helper';
import { getRenderedResource } from 'unifyre-native-assets'

export const TagLabel = ({text='',type='incomplete'}) => {

    const theme = useContext(ThemeContext);
    const styles = themedStyles(theme);

    return (
        <div>
           {type === 'incomplete' && <p style={styles.incomplete}>{text}</p>}
           {type === 'complete' && <p style={styles.complete}>{text}</p>}
        </div>
    );
}

TagLabel.propTypes = {
    text: PropTypes.string
}

const themedStyles = function (theme:any) {
    return {
        incomplete:{
            color: '#ec153f'
        },
        complete:{
            color: '#15651'
        },
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
            height: '28px',
            padding: '8px 0px',
            margin: 'inherit'
        }
    }
}

