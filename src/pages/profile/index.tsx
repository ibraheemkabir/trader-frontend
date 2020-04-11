import React from 'react';
import './profile.scss';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../redux/index';
import { userReducer,loginUser,loading } from './../../redux/modules/user';
import {Navbar} from './../../components/navbar';

class BuyDetails extends React.Component<{loginUser:any,user:any,history:any}>{
  state = { 
    user: null,
    ads: null, 
  };

  render(){
      const {user} = this.props;
    return (
      <>
      <Navbar user={this.props}/>
        <div className="transactionContainer profile">
            <p></p>
            <div className="headerText">
                User Profile
            </div> 
            <div className="estimate-container">
                <div className="userDetails">
            
                    <div className="details-container">
                        <div className="label">
                            Name
                        </div>
                        <div className="value">
                            {user.name}
                        </div>
                    </div>  
                    <div className="details-container">
                    <div className="label">
                        Verified PhoneNumer
                    </div>
                    <div className="value">
                        {`${user.zip}${user.phoneNumber}`}
                    </div>
                    </div>
                    <div className="details-container">
                    <div className="label">
                        Wallet Address
                    </div>
                    <div className="value edit">
                        <p>{user.wallet_Address}</p>
                    </div>
                    </div>
                    <div className="details-container">
                        <div className="label">
                            Country
                        </div>
                        <div className="value">
                            {user.country}
                        </div>
                    </div>
                    <div className="details-container">
                        <div className="label">
                            City
                        </div>
                        <div className="value">
                            <p>{user.city}</p>
                        </div>
                    </div>
                    <div className="details-container">
                        <div className="label">
                            Payment Method
                        </div>
                        <div className="value">
                            {user.accepted[0]}
                        </div>
                    </div>
                </div>
                <div className="details-container headers">
                    <div className="label">
                        Transaction History Details
                    </div>
                </div>
                <div className="trasactionDetails">

                <div className="transactionFields">
                    <div className="details-container">
                        <div className="label">
                            Active
                        </div>
                        <div className="value">
                            None
                        </div>
                    </div>
                </div>
                <div className="transactionFields">
                    <div className="details-container">
                        <div className="label">
                            Verified Account Details
                        </div>
                        <div className="value">
                            90%
                        </div>
                    </div>
                </div>
                <div className="transactionFields">
                    <div className="details-container">
                        <div className="label">
                            Transaction volume to date
                        </div>
                        <div className="value">
                        </div>
                    </div>
                </div>
                <div className="transactionFields">
                    <div className="details-container">
                        <div className="label">
                            Average response time
                        </div>
                        <div className="value">
                        </div>
                    </div>
                </div>
                <div className="transactionFields">
                    <div className="details-container">
                        <div className="label">
                            Average trade completion time
                        </div>
                        <div className="value">
                        </div>
                    </div>
                </div>
            </div> 
            </div>
            <p></p>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.user,
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