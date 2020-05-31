import React from 'react';
import './user.scss';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../redux/index';
import { getUserTransactions } from './../../redux/modules/transactions';
import {Navbar} from './../../components/navbar';
import {Loader} from '../../components/loader';
import {timeAgo} from '../../utils';

const {ThemedButton} = require('unifyre-web-wallet-components');

class BuyDetails extends React.Component<{getUserTransactions:any,user:any,history:any,transactions:any}>{
  state = { 
    user: null,
    ads: null,
    sellerDetails: [],
    buyerDetails: [],
    transaction: []
  };

  filterTrasaction=(userdetails:any)=>{
      let response =
      userdetails.filter((e:any)=>userdetails.id==this.props.user.id) 
      return response.name
  }

  componentWillMount(){
      this.props.getUserTransactions(this.props.user._id)
  }


  render(){
    const {loading,transactions} = this.props.transactions;
    return (
      <>
        <div className="transactionContainer usertransaction">
            <p></p>
            <div className="headerText">
                My Transactions
            </div> 
            {
                loading ?
                <div className="headerText">
                  <Loader count={5}/>
                </div> 
            :
            <div className="estimate-container">
                <div className="userDetails">
                    {
                        transactions.map((e:any)=>
                          <Link to={{
                            pathname:`/manageTransaction/${e._id}`, state: {details: e}}}>
                            <div className="details-container">
                                {
                                    <>
                                      <div className="label">
                                          Purchase of {e.amount} {e.transactiondetails[0].from_cur} 
                                          <p>From {e.userdetails[0].name}</p>
                                          <p className="sub">{timeAgo.format(new Date(e.created))}</p>
                                      </div>
                                      <div className="value">
                                          <ThemedButton text={e.status!=5?'Pending':'done'} onPress={()=>{}} type={e.status!=5?'highlight':'primary'}/>  
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
    },
    dispatch
  );
};

const BuyDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyDetails);

export default BuyDetail;