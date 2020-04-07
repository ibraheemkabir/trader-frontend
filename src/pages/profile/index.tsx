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

  handleLogin = async () => {
    await this.props.loginUser();
    if(this.props.user.name!=''){
      this.props.history.push('/')
    }
  }

  render(){
    return (
      <>
      <Navbar/>
        <div className="transactionContainer">
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
                            Ibraheem Kabir A
                        </div>
                        </div>  
                        <div className="details-container">
                        <div className="label">
                            Verified Details
                        </div>
                        <div className="value">
                                0.2ETH
                        </div>
                    </div>  
                    <div className="details-container">
                    <div className="label">
                        Verified PhoneNumer
                    </div>
                    <div className="value">
                        NGN
                    </div>
                    </div>
                    <div className="details-container">
                    <div className="label">
                        Wallet Address
                    </div>
                    <div className="value edit">
                            <p>12x22223766789499</p>
                    </div>
                    </div>
                </div>
                <div className="trasactionDetails">
                <div className="transactionFields">
                    <div className="details-container">
                        <div className="label">
                            Country
                        </div>
                        <div className="value">
                            Nigeria
                        </div>
                    </div>
                </div>
                
                <div className="transactionFields">
                    <div className="details-container">
                        <div className="label">
                            City
                        </div>
                        <div className="value">
                            <p>Lagos</p>
                        </div>
                    </div>
                </div>
                <div className="transactionFields">
                    <div className="details-container">
                        <div className="label">
                            Payment Method
                        </div>
                        <div className="value">
                            Bank Transfer
                        </div>
                    </div>
                </div>
                <div className="transactionFields">
                    <div className="details-container">
                        <div className="label">
                            Seller Feedback Score
                        </div>
                        <div className="value">
                            55%
                        </div>
                    </div>
                </div>
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
       
        <div className="App">          </div>
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