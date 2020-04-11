import React from 'react';
import './dashboard.scss';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../redux/index';
import { loginUser } from './../../redux/modules/user';
import { getAllAds,addAd } from './../../redux/modules/ads';
import {Navbar} from './../../components/navbar';
import {BuyContainer} from './../../components/buy';
import {TransactionTile} from '../../components/transactions/index';
import 'react-toastify/dist/ReactToastify.css';

const {ThemedButton,InputGroupAddon,Row,ListItem,ThemedText} = require('unifyre-web-wallet-components');

class Dashboard extends React.Component<{loginUser:any,user:any,history:any,getAllAds: any,ads:any,addAd:any}>{
  state = { 
    user: null,
    ads: null, 
  };

  componentWillMount(){
    this.props.getAllAds()
  }

  handleLogin = async () => {
    await this.props.loginUser();
    if(this.props.user.name!=''){
      this.props.history.push('/')
    }
  }

  render(){
    return (
      <>
      <Navbar user={this.props}/>
        <div className="estimate-container">
          <BuyContainer ad={this.props.addAd}/> 
        </div>
        <div className="App">
          <p>Trending Sales</p>
          {
            !this.props.ads.loading && 
            <TransactionTile ads={this.props.ads}/>
          }
          <Link to='/allTransactions' className="moreTransactions"><p>View All Transactions</p></Link>
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
      getAllAds,
      addAd
    },
    dispatch
  );
};

const Dash = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default Dash;