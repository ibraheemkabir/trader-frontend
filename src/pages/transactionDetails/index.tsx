import React from 'react';
import './details.scss';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../redux/index';
import { loginUser } from './../../redux/modules/user';
import { getTransaction, traderUpdateTransaction } from './../../redux/modules/transactions';
import {Status} from './../../components/status';
import {Loader} from '../../components/loader';

const {ThemedButton,ThemedLink} = require('unifyre-web-wallet-components');

class BuyDetails extends React.Component<{
    getTransaction:any,user:any,
    match:any,history:any,transactions:any,
    location:any,traderUpdateTransaction:any}>{
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
            return response = 'awaiting payment confirmation'
        case 5:
            return response = 'Crypto remitted and transaction complete'
        default:
            return response;
      }
  }

  render(){
    const {user} = this.props;
    const transactions = this.props.location.state.details;
    return (
      <>
        <div className="transactionContainer details">
            <p></p>
            <div className="headerText">
                Manage Transaction
            </div> 
            <Status state={transactions.status} />   
            {
                transactions.loading?
                <div className="headerText">
                    <Loader count={5}/>
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
                    {
                    (transactions.status === 2 && user?.advertiser) &&  
                    <div onClick={()=>this.props.history.push({pathname: '/manageEscrow',state: { detail: transactions }})
                    } className="value escrowlink">
                        <ThemedLink 
                        text={'Go to Escrow Page'} 
                        onPress={
                        ()=>this.props.history.push({
                        pathname: '/manageEscrow',
                        state: { detail: transactions }})
                        }
                        />
                    </div>
                    }
                </div>
                {
                    (transactions.status === 3 && !user?.advertiser) &&
                    (
                        <>
                        <div className="details-container headers">
                            <div className="label">
                                Trader Contact Details
                            </div>
                        </div>
                         <div className="userDetails">
                         <div className="details-container">
                             <div className="label">
                                name
                             </div>
                             <div className="value">
                                 {transactions.userdetails[0].name}
                             </div>
                         </div>  
                         <div className="details-container">
                             <div className="label">
                                 email
                             </div>
                             <div className="value">
                                {transactions.userdetails[0].email}
                             </div>
                         </div>
                         <div className="details-container">
                             <div className="label">
                                 whatsapp
                             </div>
                             <div className="value">
                                {transactions.userdetails[0].whatsapp}
                             </div>
                         </div>
                         <div className="details-container">
                             <div className="label">
                                 telegram
                             </div>
                             <div className="value">
                                {transactions.userdetails[0].telegram}
                             </div>
                         </div>
                         <div className="details-container">
                             <div className="label">
                                 zip
                             </div>
                             <div className="value">
                                {transactions.userdetails[0].zip}
                             </div>
                         </div>
                        </div>
                        </>
                    )
                }
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
                {
                    (transactions.status === 3 && !user?.advertiser) &&
                    <ThemedButton text={'Upload Payment Evidence'} 
                    onPress={()=>
                    this.props.history.push({
                    pathname: '/managePayment',
                    state: { detail: transactions }})
                    } 
                    type={'primary'}/>  
                }
            </p>
            <p>
                {
                    (transactions.status === 4 && user?.advertiser) &&
                    <ThemedButton text={'Confirm payment'} onPress={()=>this.props.traderUpdateTransaction(transactions._id,this.props.history)} type={'primary'}/>  
                }
            </p>
            <p>
                {
                    (transactions.status === 1 && user?.advertiser) &&
                    <ThemedButton text={'Approve Request'} onPress={()=>this.props.traderUpdateTransaction(transactions._id,this.props.history)} type={'primary'}/>  
                }
            </p>
            <p>
                <ThemedButton text={'Raise Report'} onPress={()=>{}} type={'primary'}/>  
            </p>
            <div>
                {
                    (transactions.status !== 5) &&
                    <ThemedButton text={'Cancel Request'} onPress={()=>{}} type={'highlight'}/>  
                }
            </div>
            <p></p>
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
      getTransaction,
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