import React from 'react';
import './details.scss';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../redux/index';
import { getAd } from './../../redux/modules/ads';
import {Navbar} from './../../components/navbar';
import {TransactionTile} from '../../components/transactions/index'
import {InputGroupAddon} from './../../components/inputGroup';
import { makeRequest } from './../../redux/modules/transactions';
import { toast } from 'react-toastify';

const {ThemedButton} = require('unifyre-web-wallet-components');

class BuyDetails extends React.Component<{makeRequest:any,user:any,history:any,ads:any,getAd:any,match:any}>{
  state = { 
    user: null,
    ads: null,
    amount: 0,
    valid: false,
    show: true
  };
  async componentWillMount(){
    await this.props.getAd(this.props.match.params.id);
  }

  showModal = (e:any) => {
    this.setState({
      show: !this.state.show
    });
  }

  handleTextChange = (event:any) => {
    this.setState({
      amount: event.target.value
    })
    this.validateAmount();
  }

  validateAmount=()=>{
    const ad = this.props.ads.ad;
    const {amount} = this.state;
    if(amount>ad.minimum_volume||amount>ad.amount){
      this.setState({valid:true})
    }else{
      this.setState({valid:false})
    }
  }

  async handleRequest(ad:any,user:any){
    const data = {
      "trader_id":ad.userdetails[0].id,
      "transaction_id":ad._id,
      "buyer_id":user._id,
      "status": 1,
      "stage": "awaiting trader response",
      "completed": false,
      "type": "buy",
      "amount": this.state.amount
    }

    await this.props.makeRequest(data)
    this.props.history.push("/myTransactions");
  }

  render(){
    const ad = this.props.ads.ad;
    const user = this.props.user;
    const {amount,valid} = this.state;

    console.log(this.props)
    return (
      <>
        <div className="detailTexts">
             Transaction Details
        </div>
        {
          this.props.ads.adloading ?
          <div className="detailTexts">loading.....</div>
        :
        <div className="transactionContainers">
            <div className="estimate-containers">
                <div className="userDetailss">
                    <div className="details-containers">
                        <div className="labels">
                            Amount Available
                        </div>
                        <div className="values">
                        {`${ad.amount} ${ad.from_cur}`}
                        </div>
                        </div>  
                        <div className="details-containers">
                        <div className="labels">
                            Minimum allowed transaction
                        </div>
                        <div className="values">
                          {`${ad.minimum_volume}`}
                        </div>
                        </div>  
                        <div className="details-containers">
                        <div className="labels">
                            Seller Currency
                        </div>
                        <div className="values">
                          {`${ad.to_cur}`}
                        </div>
                        </div>
                        <div className="details-containers">
                        <div className="labels">
                            Reciever Address(Your Adddress)
                        </div>
                        <div className="values edits">
                          <p>{user.wallet_address}</p>
                        </div>
                    </div>
                </div>
                <div className="userDetailss">
                <div className="details-containers">
                        <div className="labels">
                            Name of seller
                        </div>
                        <div className="values">
                          {`${ad.userdetails[0].name}`}
                        </div>
                        </div>  
                        <div className="details-containers">
                        <div className="labels">
                            Seller Address 
                        </div>
                        <div className="values">
                            {ad.userdetails[0].wallet_address}
                        </div>
                        </div>  
                        <div className="details-containers">
                        <div className="labels">
                            Seller Confidence Score
                        </div>
                        <div className="values">
                            {ad.userdetails[0].rating}
                        </div>
                        </div>
                        <div className="details-containers">
                        <div className="labels">
                            Preffered payment method
                        </div>
                        <div className="values edits">
                            <p>{ad.accepted[0]}</p>
                        </div>
                    </div>
                </div> 
            </div>
            <InputGroupAddon placeholder={'0.001'} value={ad.amount} onKeyUp={this.handleTextChange} fieldlabel={'Amount to buy'} options={[{value: 1, label: 'BTC'}, {value: 2, label:'ETH'}]}/>
            <p></p>
              <ThemedButton 
                text={'Make request'} 
                disabled={amount<ad.minimum_volume||amount>ad.amount}
                onPress={()=>this.handleRequest(ad,user)}
              />                        
        </div>
      }
       
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
      getAd,
      makeRequest
    },
    dispatch
  );
};

const BuyDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyDetails);

export default BuyDetail;