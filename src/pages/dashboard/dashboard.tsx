import React from 'react';
import './dashboard.scss';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../redux/index';
import { loginUser } from './../../redux/modules/user';
import { getAllAds,addAd,getAllSales } from './../../redux/modules/ads';
import {Navbar} from './../../components/navbar';
import {BuyContainer} from './../../components/buy';
import {TransactionTile} from '../../components/transactions/index';
import 'react-toastify/dist/ReactToastify.css';

const {ThemedButton,InputGroupAddon,Row,ListItem,ThemedText} = require('unifyre-web-wallet-components');

class Dashboard extends React.Component<{loginUser:any,user:any,history:any,getAllAds: any,ads:any,addAd:any,getAllSales:any}>{
  state = { 
    user: null,
    ads: null,
    filter:null,
    value: null,
    crypto:null
  };

  componentWillMount(){
    this.props.getAllAds()
    this.props.getAllSales()

    console.log(localStorage.getItem('user'),'----0000')
  }

  handleFilter=(params:any,volume:any,icon:any)=>{
    console.log(params.ads,'====<>',volume)
    const res = params.ads.filter((e:any)=>Number(e.minimum_volume) <= volume && Number(e.amount) >= volume )
    console.log(res)
    this.setState({filter:res, value: volume,crypto:icon}) 
  }
  
  handleLogin = async () => {
    await this.props.loginUser();
    if(this.props.user.name!=''){
      this.props.history.push('/')
    }
  }

  handleCloseSearch = () =>{
    this.setState({filter:null}) 
  }

  render(){
    const ad = this.props.ads;
    const {filter,crypto,value} = this.state
    return (
      <>
        <div className="estimate-container">
          <BuyContainer ad={this.props.addAd} user={this.props.user}  ads={ad} filter={this.handleFilter}/> 
        </div>
        {
            (!this.props.ads.loading && filter!=null) && 
            <div className="App">
              <div className="headerContainer">
        <p>Search Results for {value} {crypto}</p>
                <p onClick={this.handleCloseSearch}>Close Search</p>
              </div>
                <TransactionTile ads={filter} type={'buy'}/>
            </div>
        }
        <div className="App">
          <p>Crypto Sale Offers</p>
          {
            !this.props.ads.loading && 
            <TransactionTile ads={this.props.ads.ads} type={'buy'} />
          }
          <Link to='/allTransactions' className="moreTransactions"><p>View All Sale Offers</p></Link>
        </div>
        <div className="App">
          <p>Crypto Buy Requests</p>
          {
            !this.props.ads.sales.loading && 
            <TransactionTile ads={this.props.ads.sales.sales}  type={'sale'}/>
          }
          <Link to='/allTransactions' className="moreTransactions"><p>View All Buy Requests</p></Link>
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
      addAd,
      getAllSales
    },
    dispatch
  );
};

const Dash = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default Dash;