import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import Dashboard from './Dashboard';
import Header from './Header';
import NotFound from './NotFound';
import Login from './Login';
import TeamViewer from './TeamViewer';

export default () => (
  <Router>
    <div>
      <Header/>
      <Switch>
        <Route exact path="/signin" component={Login} />
        <Route exact path="/cms" component={Dashboard} />
        <Route exact path="/teams" component={TeamViewer} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)
