import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import Dashboard from './Dashboard';
import Header from './Header';
import NotFound from './NotFound';
import Login from './Login';
import TeamViewer from './TeamViewer';
import CharacterViewer from './CharacterViewer';
import SpecialCardViewer from './SpecialCardViewer';
import BasicCardViewer from './BasicCardViewer';

export default () => (
  <Router>
    <div>
      <Header/>
      <Filler />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/signin" component={Login} />
        <Route exact path="/cms" component={Dashboard} />
        <Route exact path="/teams" component={TeamViewer} />
        <Route exact path="/characters" component={CharacterViewer} />
        <Route exact path="/specialcards" component={SpecialCardViewer} />
        <Route exact path="/basiccards" component={BasicCardViewer} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)

const Main = () => {
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    p {
      font-size: 1.3em;
      padding: 10px 0;
      text-align: center;
      a {
        text-decoration: underline;
        color: peru;
      }
    }
  `;
  return (
    <Wrapper>
      <p>Main page is in development</p>
      <p>Go to the <a href="/cms">Content Managment System</a></p>
    </Wrapper>
  )
}

axios.interceptors.request.use(config => {
  config.headers['Authorization'] = localStorage.getItem('BOG_JWT');  
  return config;
});

const Filler = () => {
  const Wrapper = styled.div`
      &::before {
      display: block; 
      content: " "; 
      height: 35px; 
      visibility: hidden; 
      pointer-events: none;
    }
  `;
  return <Wrapper />
}
