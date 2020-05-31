import React, { useContext } from 'react';
import './loader.scss';

export const Loader = ({count=1}) => {
    let i;
    return <>
        {
            Array.from({ length: count }, (_, k) => (
                <div className="animated-background"> </div>
            ))
        }
    </>
}