import React from 'react';
import './details.scss';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../redux/index';
import { loginUser } from './../../redux/modules/user';
import {Navbar} from './../../components/navbar';
import {TransactionTile} from '../../components/transactions/index'
import {InputGroupAddon} from './../../components/inputGroup';
import editIcon from './edit.png';

const {ThemedButton} = require('unifyre-web-wallet-components');

class BuyDetails extends React.Component<{loginUser:any,user:any,history:any,ads:any}>{
  state = { 
    user: null,
    ads: null, 
  };
  handleLogin = async () => {
    await this.props.loginUser();
    if(this.props.user.name!=''){
      this.props.history.push('/')
    }
  }

  render(){
    console.log(this.props)
    return (
      <>
        <Navbar user={this.props}/>
        <div className="detailTexts">
             Transaction Details
        </div>
        <div className="transactionContainers">
            <div className="estimate-containers">
                <div className="userDetailss">
                    <div className="details-containers">
                        <div className="labels">
                            Amount Available
                        </div>
                        <div className="values">
                            0.5ETH
                        </div>
                        </div>  
                        <div className="details-containers">
                        <div className="labels">
                            Minimum allowed transaction
                        </div>
                        <div className="values">
                                0.2ETH
                        </div>
                        </div>  
                        <div className="details-containers">
                        <div className="labels">
                            Seller Currency
                        </div>
                        <div className="values">
                            NGN
                        </div>
                        </div>
                        <div className="details-containers">
                        <div className="labels">
                            Reciever Address(Your Adddress)
                        </div>
                        <div className="values edits">
                                <p>12x22223766789499</p>
                        </div>
                    </div>
                </div>
                <div className="userDetailss">
                <div className="details-containers">
                        <div className="labels">
                            Amount Available
                        </div>
                        <div className="values">
                            0.5ETH
                        </div>
                        </div>  
                        <div className="details-containers">
                        <div className="labels">
                            Minimum allowed transaction
                        </div>
                        <div className="values">
                                0.2ETH
                        </div>
                        </div>  
                        <div className="details-containers">
                        <div className="labels">
                            Seller Currency
                        </div>
                        <div className="values">
                            NGN
                        </div>
                        </div>
                        <div className="details-containers">
                        <div className="labels">
                            Reciever Address(Your Adddress)
                        </div>
                        <div className="values edits">
                                <p>12x22223766789499</p>
                        </div>
                    </div>
                </div> 
            </div>
            <InputGroupAddon placeholder={'0.001'} fieldlabel={'Amount to buy'}/>
            <p></p>
            <ThemedButton text={'Make request'}/>            
        </div>
       
        <div className="App">
          <p className="similar">Similar Trade requests</p>
          <TransactionTile ads={this.props.ads}/>
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
      loginUser,
    },
    dispatch
  );
};

const BuyDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyDetails);

export default BuyDetail;