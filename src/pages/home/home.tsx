import React from 'react';
import logo from './../../logo.svg';
import './home.scss';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../redux/index';
import { createBrowserHistory,createHashHistory } from 'history';
import { userReducer,loginUser,loading } from './../../redux/modules/user';
const {ThemedButton,InputGroupAddon,Row,ListItem} = require('unifyre-web-wallet-components');
const {PageTopPart} = require('unifyre-web-components');

export const browserHistory = createBrowserHistory();
export const hashHistory = createBrowserHistory();

class HomeComponent extends React.Component<{loginUser:any,user:any,history:any}>{
  state = { 
    user: null,
    ads: null, 
    btnText: 'Go to LocalBitcoin',
    loading: this.props.user.loading
  };

  handleLogin = async (id:any) => {
    await this.props.loginUser(id);
    if(this.props.user.name!=''){
      this.props.history.push('/dashboard')
    }
  }

  render(){
    const {btnText} = this.state;
    const {loading} = this.props.user
    return (
      <div className="App">
        <header className="App-header">
          <div className="btn" >
              <ThemedButton text={!loading?btnText:'logging user in'} onPress={()=>this.handleLogin('456fghhhhhhgf2')} type={'primary'}/> 
              <p></p> 
              <ThemedButton text={!loading?btnText:'logging user in'} onPress={()=>this.handleLogin('456fghhhhhhgf1')} type={'primary'}/>  
              {/* <li ><Link to={'/'} className="nav-link"> Home </Link></li>
              <li><Link to={'/contact'} className="nav-link">Dashboard</Link></li> */} 
          </div>
        </header>
      </div>
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

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);

export default Home;