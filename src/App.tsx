import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from './pages/home/home';
import Home from './pages/dashboard/dashboard';
import Buydetails from './pages/buyDetails';
import Profile from './pages/profile';
import Transactions from './pages/advertisements';
import UserTransactions from './pages/userTransactions';
import ManageTransactions from './pages/transactionDetails';

import { ToastContainer, toast } from 'react-toastify';

import createBrowserHistory from 'history/createBrowserHistory'

export const history = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <Router>
          <div>
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/dashboard' component={Home} />
                <Route path='/transaction/:id' component={Buydetails}/>
                <Route path='/alltransactions' component={Transactions}/>
                <Route path='/profile/:userId' component={Profile}/>
                <Route path='/myTransactions' component={UserTransactions}/>
                <Route path='/manageTransaction/:id' component={ManageTransactions}/>
            </Switch>
            <ToastContainer />
          </div>
      </Router>
    );
  }
}

export default App;
