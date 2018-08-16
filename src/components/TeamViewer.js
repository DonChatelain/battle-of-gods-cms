import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import config from '../config';
import Tile from './Tile';
import heartPng from '../static/heart.png';
import cardPng from '../static/cards.png';
import attackPng from '../static/attack.png';
import defensePng from '../static/defense.png';

export default class TeamViewer extends React.Component {
  constructor() {
    super();
    this.state = {
      teams: [],
      stats: {},
      editingTeamName: null,
    };
    this.inputRef = null;
    this.cancelRequest = () => {};
  }

  componentDidMount() {
    axios
      .get(
        config.API_URL + '/teams',
        { cancelToken: new axios.CancelToken(executor => this.cancelRequest = executor) },
      )
      .then(res => this.setState({ teams: res.data }, this.fetchStats))
      .catch(err => {
        if (err.response && err.response.status === 401) {
          window.location.href = '/signin'
        }
        console.error(err)
      });
  }

  displayLoader() {
    if (this.state.teams.length === 0) {
      return <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    }
  }

  fetchStats() {
    axios 
      .get(config.API_URL + '/teams?statsonly=true')
      .then(res => {
        console.log(res.data);
        this.setState({ stats: res.data });
      })
      .catch(err => console.error(err));
  }

  patchData(key, data) {
    this.cancelRequest();
    
    axios
      .patch(`${config.API_URL}/teams/${key}`, data)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }

  onChange(value, charIndex, field) {
    const newState = {};
    newState[field] = value;
    const team = this.state.teams[charIndex];
    if (team[field] === newState[field]) return;
    team[field] = newState[field];
    this.patchData(team.key, newState);
  }

  changeName(newName, index) {
    this.onChange(newName, index, 'name');
    this.setState({ editingTeamName: null });
  }

  displayName(name, key, index) {
    if (this.state.editingTeamName === key) {
      return (
        <input type="text"
               defaultValue={name}
               ref={(input) => this.inputRef = input}
               onBlur={(event) => this.changeName(event.target.value, index)} 
               onKeyPress={(event) => { if (event.key === 'Enter') this.changeName(event.target.value, index) }} />
      ) 
    }
    return (
      <h3 className="row full tile-name"
          onClick={() => {
            this.setState({ editingTeamName: key }, () => this.inputRef.focus());
          }}>
        {name}
      </h3>
    )
  }

  getTeamByKey(teamKey) {
    const team = this.state.stats[teamKey]
    return team || {};
  };

  componentWillUnmount() {
    this.cancelRequest();
  }

  render() {

    const Wrapper = this.style();
    return (
      <Wrapper>
        {this.displayLoader()}
        {this.state.teams.map((team, i) => 
          <Tile data={team} key={i}>
            {this.displayName(team.name, team.key, i)}
            <div className="row fourth stats">
              <span className="health">{this.getTeamByKey(team.key).health}</span>
              <span className="sp-count">{this.getTeamByKey(team.key).spQty}</span>
              <span className="attack">{this.getTeamByKey(team.key).totalAtk}</span>
              <span className="defense">{this.getTeamByKey(team.key).totalDef}</span>
            </div>
            <div className="row half">
              <div>
                <label>Faction</label>
                <select defaultValue={team.faction} 
                        onChange={(event) => this.onChange(event.target.value, i, 'faction')}>
                  <option value="Egyptian">Egyptian</option>
                  <option value="Norse">Norse</option>
                  <option value="Greek">Greek</option>
                  <option value="Mesoamerican">Mesoamerican</option>
                </select>
              </div>
              <div>
                <label>Class</label>
                <select defaultValue={team.deckClass}
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

      .stats {
        height: 30px;

        span {
          position: relative;
        }

        span::before {
          content: '';
          width: 50px;
          height: 50px;
          position: relative;
          content: '';
          width: 25px;
          height: 25px;
          position: relative;
          top: 0;
          left: 0;
          background-size: 20px;
          display: inline-block;
          background-repeat: no-repeat;
          vertical-align: middle;
        }

        .health::before {
          background-image: url(${heartPng});
        }
        .sp-count::before {
          background-image: url(${cardPng});
        }
        .attack::before {
          background-image: url(${attackPng});
        }
        .defense::before {
          background-image: url(${defensePng});
        }
      }

      @media only screen and (min-width : 768px) {
        > section {
          width: 40%;
        }
      }
    `;
  }
}
