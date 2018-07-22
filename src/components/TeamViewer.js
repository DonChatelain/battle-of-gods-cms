import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import config from '../config';
import Tile from './Tile';

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

  patchData(key, data) {
    axios
      .patch(`${config.API_URL}/teams/${key}`, data)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }

  onChange(value, charIndex, field) {
    const newState = {};
    newState[field] = value;
    if (this.state.characters[charIndex][field] === newState[field]) return;
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.characters[charIndex][field] = newState[field];
    this.patchData(charIndex, newState);
    this.forceUpdate();
  }

  render() {
    const Wrapper = this.style();
    return (
      <Wrapper>
        {this.state.teams.map((team, i) => 
          <Tile data={team} key={i}>
            <h3 className="row full">{team.name}</h3>
            <div className="row half">
              <div>
                <label>Faction</label>
                <select value={team.faction} 
                        onChange={(event) => this.onChange(event.target.value, i, 'faction')}>
                  <option value="Egyptian">Egyptian</option>
                  <option value="Norse">Norse</option>
                  <option value="Greek">Greek</option>
                  <option value="Mesoamerican">Mesoamerican</option>
                </select>
              </div>
              <div>
                <label>Class</label>
                <select value={team.deckClass}
                        onChange={(event) => this.onChange(event.target.value, i, 'deckClass')}>
                  <option value="BLUE">BLUE</option>
                  <option value="GREEN">GREEN</option>
                  <option value="RED">RED</option>
                </select>
              </div>
            </div>
          </Tile>
        )}
      </Wrapper>
    );
  }

  style() {
    return styled.main`
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      padding: 10px;

      > section {
        width: 100%;
      }

      @media only screen and (min-width : 768px) {
        > section {
          width: 40%;
        }
      }
    `;
  }
}
