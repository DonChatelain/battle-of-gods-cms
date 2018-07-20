import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import config from '../config';
import TeamTile from './TeamTile';

export default class TeamViewer extends React.Component {
  constructor() {
    super();
    this.state = {
      teams: [],
    };
  }

  componentDidMount() {
    axios
      .get(config.API_URL + '/teams')
      .then(res => this.setState({ teams: res.data }))
      .catch(err => console.error(err));
  }

  render() {
    const Wrapper = this.style();
    return (
      <Wrapper>
        {this.state.teams.map((t, i) => 
          <TeamTile team={t} key={i} />
        )}
      </Wrapper>
    );
  }

  style() {


    return styled.main`

    `;
  }
}
