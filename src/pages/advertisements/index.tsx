import React from 'react';
import logo from './../../logo.svg';
import './transaction.scss';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../redux/index';
import { createBrowserHistory,createHashHistory } from 'history';
import { userReducer,loginUser } from '../../redux/modules/user';
import { getAllAds } from '../../redux/modules/ads';
import {Navbar} from '../../components/navbar';
import {BuyContainer} from '../../components/buy';
import {TransactionTile} from '../../components/transactions/index'
import Dropdown from '../../components/dropdown';

const {ThemedButton,InputGroupAddon,Row,ListItem,ThemedText} = require('unifyre-web-wallet-components');
class AdvertisementsPage extends React.Component<{loginUser:any,user:any,history:any,getAllAds: any,ads:any}>{
  state = { 
    user: null,
    ads: null, 
  };

  componentWillMount(){
    this.props.getAllAds()
  }

  render(){
    return (
      <>
        <Navbar user={this.props}/>
        <div className="App">
          <p>Trending Sales</p>
          {
            !this.props.ads.loading && 
            <TransactionTile ads={this.props.ads}/>
          }
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
      getAllAds
    },
    dispatch
  );
};

const Advertisements = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvertisementsPage);

export default Advertisements;