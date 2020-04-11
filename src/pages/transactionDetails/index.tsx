import React from 'react';
import './details.scss';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../redux/index';
import { loginUser } from './../../redux/modules/user';
import { getTransaction, transactionsFailure } from './../../redux/modules/transactions';
import {Navbar} from './../../components/navbar';
const {ThemedButton} = require('unifyre-web-wallet-components');

class BuyDetails extends React.Component<{getTransaction:any,user:any,match:any,history:any,transactions:any,location:any}>{
  state = { 
    user: null,
    ads: null, 
  };

  async componentWillMount(){
      console.log(this.props.location.state.details,'====<>');
      
  }

  manageStatus = (Status:any) => {
      let response;
      switch(Status){
        case 0:
            return response = 'cancelled transaction'
        case 1:
            return response = 'Awaiting Seller Response'
        case 2:
            return response = 'Awaiting Escrow Confirmation'
        case 3:
            return response = 'Awaiting Transaction response from buyer'
        case 4:
            return response = 'awaiting  response'
        default:
            return response;
      }
  }

  render(){
      const {user} = this.props;
      const transactions = this.props.location.state.details;

    return (
      <>
      <Navbar user={this.props}/>
        
        <div className="transactionContainer details">
            <p></p>
            <div className="headerText">
                Manage Transaction
            </div> 
            {
                transactions.loading?
                <div className="headerText">
                    Loading
                </div>
            :
            <div className="estimate-container">
                <div className="userDetails">
                    <div className="details-container">
                        <div className="label">
                            Transaction Id
                        </div>
                        <div className="value">
                            {transactions._id}
                        </div>
                    </div>  
                    <div className="details-container">
                        <div className="label">
                            Status
                        </div>
                        <div className="value">
                            {this.manageStatus(transactions.status)}
                        </div>
                    </div>  
                </div>
                <div className="details-container headers">
                    <div className="label">
                        Action Items
                    </div>
                </div>
                <div className="trasactionDetails">
                </div> 
            </div>
            }
            <p>
                <ThemedButton text={'Raise Report'} onPress={()=>{}} type={'primary'}/>  
            </p>
            <div>
                <ThemedButton text={'Cancel Request'} onPress={()=>{}} type={'highlight'}/>  
            </div>
        </div>
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
      loginUser,
      getTransaction
    },
    dispatch
  );
};

const BuyDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyDetails);

export default BuyDetail;