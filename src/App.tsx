import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from './pages/home/home';
import Home from './pages/dashboard/dashboard';
import Buydetails from './pages/buyDetails';
import Profile from './pages/profile';
import Transacctions from './pages/advertisements';

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
                <Route path='/transaction' component={Buydetails}/>
                <Route path='/alltransactions' component={Transacctions}/>
                <Route path='/profile/:userId' component={Profile}/>
            </Switch>
          </div>
      </Router>
    );
  }
}

export default App;
