import React,{useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from './pages/home/home';
import Home from './pages/dashboard/dashboard';
import Buydetails from './pages/buyDetails';
import Profile from './pages/profile';
import Transactions from './pages/advertisements';
import UserTransactions from './pages/userTransactions';
import ManageTransactions from './pages/transactionDetails';
import TraderTransactions from './pages/adminTransactions';
import EscrowManagement from './pages/escrowManagement';
import PaymentDetails from './pages/paymentDetails';
import {SideNav} from './components/sidenav';
import {Navbar} from './components/navbar';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import { RootState } from '../src/redux';
import Sales from './pages/sales';
import SaleRequest from './pages/saleRequest';

import createBrowserHistory from 'history/createBrowserHistory'
import { useContext } from "react";

export const history = createBrowserHistory();

class App extends React.Component<{user:any}> {
  state={
    width: false
  }

  toggleWidth=()=>{
    const {width} = this.state;
    this.setState({width: !width})
  }
  

  render() {
    const {width} = this.state;
    const {user} = this.props;
    return (
      <Router>     
          <div>
            {
              user && <SideNav width={width?'40%':'0%'} user={this.props}/>
            }{
              user && <Navbar user={this.props} handleSideBar={this.toggleWidth}/>
            }
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/dashboard' component={Home} />
                <Route path='/transaction/:id' component={Buydetails}/>
                <Route path='/alltransactions' component={Transactions}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/myTransactions' component={UserTransactions}/>
                <Route path='/manageTransaction/:id' component={ManageTransactions}/>
                <Route path='/traderTransactions' component={TraderTransactions}/>
                <Route path='/manageEscrow' component={EscrowManagement}/>
                <Route path='/sales' component={Sales}/>
                <Route path='/saleRequest' component={SaleRequest}/>
                <Route path='/managePayment' component={PaymentDetails}/>
            </Switch>
            <ToastContainer />
          </div>
      </Router>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  ads: state.ads
});

const mapDispatchToProps = (dispatch: Dispatch) => {
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
