import React from 'react';
import './status.scss';

export const Status = ({state=1}) => {
    return(
        <ul className="vcv-timeline">
            <li className={`vcv-timeline-item ${state>=1&&'vcv-step-done'}`} data-step="1" data-step-title="Download"><span>Awaiting Seller Response</span></li>
            <li className={`vcv-timeline-item ${state>=2&&'vcv-step-done'}`} data-step="2"><span>Awaiting Escrow Confirmation</span></li>
            <li className={`vcv-timeline-item ${state>=3&&'vcv-step-done'}`} data-step="3"><span>Awaiting Transaction response from buyer</span></li>
            <li className={`vcv-timeline-item ${state>=4&&'vcv-step-done'}`} data-step="4"><span>awaiting payment confirmation</span></li>
            <li className={`vcv-timeline-item ${state>=5&&'vcv-step-done'}`} data-step="5"><span>Crypto remitted and transaction complete</span></li>
        </ul>
    )
}