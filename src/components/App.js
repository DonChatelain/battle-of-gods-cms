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
import CharacterViewer from './CharacterViewer';
import SpecialCardViewer from './SpecialCardViewer';

export default () => (
  <Router>
    <div>
      <Header/>
      <Switch>
        <Route exact path="/signin" component={Login} />
        <Route exact path="/cms" component={Dashboard} />
        <Route exact path="/teams" component={TeamViewer} />
        <Route exact path="/characters" component={CharacterViewer} />
        <Route exact path="/specialcards" component={SpecialCardViewer} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)
