import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Header from './Header';
import NotFound from './NotFound';
import Login from './Login';

class Main extends Component {
  render() {
    // const secretCode = process.env.REACT_APP_SECRET_CODE;
    return (
      <div>
        <h1>DASHBOARD!</h1>
      </div>
    );
  }
}

export default () => (
  <Router>
    <div>
      <Header/>
      <Switch>
        <Route exact path="/signin" component={Login} />
        <Route exact path="/cms" component={Main} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)
