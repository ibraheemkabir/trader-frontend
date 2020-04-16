import React from 'react';
import './details.scss';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../redux/index';
import { getUserTransactions,getRequests } from './../../redux/modules/transactions';
import {Navbar} from './../../components/navbar';
const {ThemedButton} = require('unifyre-web-wallet-components');

class BuyDetails extends React.Component<{getUserTransactions:any,user:any,getRequests:any,history:any,transactions:any}>{
  state = { 
    user: null,
    ads: null,
    sellerDetails: [],
    buyerDetails: [],
    transaction: []
  };


  manageStatus = (Status:any) => {
    let response;
    switch(Status){
      case 0:
          return response = 'cancelled transaction'
      case 1:
          return response = 'Awaiting your response'
      case 2:
          return response = 'Awaiting Crypto Escrow Confirmation'
      case 3:
          return response = 'Awaiting Payment Confirmation from buyer'
      case 4:
          return response = 'awaiting  response'
      default:
          return response;
    }
}
  filterTrasaction=(userdetails:any)=>{
    console.log(userdetails,'===<>');
      let response =
      userdetails.filter((e:any)=>userdetails.id==this.props.user.id) 
      
      return response.name

  }

  async componentWillMount(){
    console.log(this.props.user,'HHYYUIIOO')
      await this.props.getRequests(this.props.user.unifyreId)
      await this.props.getUserTransactions(this.props.user._id)
      await this.props.getRequests(this.props.user.unifyreId)      
  }


  render(){
    const {loading,transactions,requests} = this.props.transactions;
    return (
      <>
        <div className="transactionContainer tradertransaction">
            {
                loading || requests.loading ?
                <div className="headerText">
                Loading.....
                </div> 
            :
            <div className="estimate-container">
                <div className="userDetails">
                <div className="details-container headers">
                    <div className="label">
                        Transaction Requests
                    </div>
                </div>
                    {
                        requests.data.map((e:any)=>
                          <Link to={{
                            pathname:`/manageTransaction/${e._id}`, state: {details: e}}}>
                            <div className="details-container">
                                {
                                    <>
                                      <div className="label">
                                          Purchase of {e.amount} {e.transactiondetails[0].from_cur} by {e.userdetails[0].name}
                                      </div>
                                      <div className="value">
                                          <ThemedButton text={this.manageStatus(e.status)} onPress={()=>{}} type={'highlight'}/>  
                                      </div>
                                    </>
                                }
                            </div> 
                          </Link>
                        )
                    }
                <div className="details-container headers">
                    <div className="label">
                        My Transactions
                    </div>
                </div>
                    {
                        transactions.map((e:any)=>
                          <Link to={{
                            pathname:`/manageTransaction/${e._id}`, state: {details: e}}}>
                            <div className="details-container">
                                {
                                    <>
                                      <div className="label">
                                          Purchase of {e.amount} {e.transactiondetails[0].from_cur} from {e.userdetails[0].name}
                                      </div>
                                      <div className="value">
                                          <ThemedButton text={'Pending'} onPress={()=>{}} type={'highlight'}/>  
                                      </div>
                                    </>
                                }
                            </div> 
                          </Link>
                        )
                    }
                </div>
               
            </div>
        }
         
          <div className="trasactionDetails">
          </div> 
          <p></p>
        </div>
       
        <div className="App">          </div>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  transactions: state.transaction
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getUserTransactions,
      getRequests
    },
    dispatch
  );
};

const BuyDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyDetails);

export default BuyDetail;