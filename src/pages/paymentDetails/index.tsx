import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../redux/index';
import { getAd } from './../../redux/modules/ads';
import {Navbar} from './../../components/navbar';
import { makeRequest,traderUpdateTransaction} from './../../redux/modules/transactions';
import './payment.scss'

const {ThemedButton} = require('unifyre-web-wallet-components');

class BuyDetails extends React.Component<{makeRequest:any,user:any,history:any,traderUpdateTransaction:any,location:any,match:any}>{
  state = { 
    user: null,
    ads: null,
    amount: 0,
    valid: false,
    show: true,
    file:null
  };

  async componentWillMount(){
  }

  handleChange(selectorFiles: FileList)
  {
      this.setState({file:selectorFiles[0].name})
  }


  render(){
    const transactions = this.props.location.state.detail;
    const {file} = this.state;
return (
      <div className="payment">
        <div className="detailTexts">
             Manage Payment
        </div>
        <div className="details-container idtranx">
            <div className="label">
                Transaction Id
            </div>
            <div className="value">
                {transactions._id}
            </div>
        </div>
        <div className="details-container Butn">
            <div className="value choose">
                {file===null?'No file Selected':file}
            </div>
            <div className="button-wrapper">
                <span 
                className="label" 
                >
                    Choose File
                </span>
                <input 
                    type="file" 
                    name="upload" 
                    id="upload" 
                    className="upload-box" 
                    placeholder="Upload File"
                    onChange={(e:any)=>this.handleChange(e.target.files)}
                />
            </div>
            
           
        </div>
        <p></p>
        <div>
              <ThemedButton 
                text={'Upload Payment Evidence'} 
                 onPress={()=>this.props.traderUpdateTransaction(transactions._id,this.props.history)}
                 disabled={file===null?true:false}
              />                        
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  ads: state.ads
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getAd,
      makeRequest,
      traderUpdateTransaction
    },
    dispatch
  );
};

const BuyDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyDetails);

export default BuyDetail;