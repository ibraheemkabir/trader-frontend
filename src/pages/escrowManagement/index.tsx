import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../redux/index';
import { getAd } from './../../redux/modules/ads';
import {Navbar} from './../../components/navbar';
import { makeRequest,traderUpdateTransaction} from './../../redux/modules/transactions';

const {ThemedButton} = require('unifyre-web-wallet-components');

class BuyDetails extends React.Component<{makeRequest:any,user:any,history:any,traderUpdateTransaction:any,location:any,match:any}>{
  state = { 
    user: null,
    ads: null,
    amount: 0,
    valid: false,
    show: true
  };

  async componentWillMount(){
  }


  render(){
    const transactions = this.props.location.state.detail;

    console.log(transactions)
    return (
      <>
        <Navbar user={this.props}/>
        <div className="detailTexts">
             Manage Escrow
        </div>
        <p></p>
        <div>
              <ThemedButton 
                text={'Complete Escrow'} 
                 onPress={()=>this.props.traderUpdateTransaction(transactions._id,this.props.history)}
              />                        
        </div>
      </>
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