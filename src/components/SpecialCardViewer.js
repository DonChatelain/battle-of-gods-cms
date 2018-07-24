import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import config from '../config';
import Tile from './Tile';
// import heartPng from '../static/heart.png';
// import attackPng from '../static/attack.png';
// import defensePng from '../static/defense.png';

export default class TeamViewer extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      characters: [],
    };
  }

  componentDidMount() {
    const url = new URL(window.location.href);
    const queries = [
      url.searchParams.get('owner') ? 'owner=' + url.searchParams.get('owner') : '',
      url.searchParams.get('limit') ? 'limit=' + url.searchParams.get('limit') : ''
    ];
    axios
      .get(config.API_URL + '/specialcards?' + queries.join('&'))
      .then(res => this.setState({ cards: res.data }, this.fetchCharacterNames))
      .catch(err => console.error(err));
  }

  patchData(id, data) {
    axios
      .patch(`${config.API_URL}/specialcards/${id}`, data)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }

  fetchCharacterNames() {
    axios
      .get(config.API_URL + '/characters?fields=name')
      .then(res => this.setState({ characters: res.data }))
      .catch(err => console.error(err));
  }

  onChange(value, cardIndex, field) {
    const newState = {};
    newState[field] = value;
    const card = this.state.cards[cardIndex];
    if (card[field] === newState[field]) return;
    card[field] = newState[field];
    this.patchData(card._id, newState);
  }

  render() {
    /**
     * Fields:
     * 
     * 1 name : text
     * 2 owner : select (Character)
     * 8 effect: textarea
     * 4 atk : Number
     * 5 instant: Number
     * 6, 7 def: Number Checkbox for 100% (-1)
     * 3 qty: Number (extra: give visual feedback if teams special card allotment goes over the line)
     */

    const Wrapper = this.style();
    return (
      <Wrapper>
        {this.state.cards.map((card, i) => 
          <Tile data={card} key={i}>
            <h3 className="row full">{card.name}</h3>
            <div className="row half">
              <div>
                <label>Owner</label>
                <select defaultValue={card.owner} 
                        onChange={(event) => this.onChange(event.target.value, i, 'owner')}>
                  <option key="-1" value={card.owner}>{card.owner}</option>
                  {this.state.characters.map((char, i) => {
                    return <option key={'char_' + i} value={char.name}>{char.name}</option>
                  })}

                </select>
              </div>
              <div>
                <label>Quantity</label>
                <input type="number"
                       onBlur={(event) => this.onChange(event.target.value, i, 'qty')}
                       defaultValue={card.qty} />
              </div>
            </div>
            <div className="row half">
              <div>
                <label>Attack</label>
                <input type="number"
                       onBlur={(event) => this.onChange(event.target.value, i, 'atk')}
                       defaultValue={card.atk} />
              </div>
              <div>
                <label>Instant Damange</label>
                <input type="number"
                       onBlur={(event) => this.onChange(event.target.value, i, 'instant')}
                       defaultValue={card.instant} />
              </div>
            </div>
            <div className="row half">
              <div>
                <label>Defense</label>
                <input type="number"
                       onBlur={(event) => this.onChange(event.target.value, i, 'def')}
                       defaultValue={card.def} />
              </div>
              <div>
                <label>Fully Block?</label>
                <input type="checkbox" disabled
                       defaultChecked={card.def === -1} />
                {/* Disabled */}
              </div>
            </div>
            <div className="row full">
              <div>
                <label>Effect Description</label>
                <textarea defaultValue={card.effect}
                          onBlur={(event) => this.onChange(event.target.value, i, 'effect')}>

                </textarea>
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

      select {
        width: calc(100% - 10px);
      }

      @media only screen and (min-width : 768px) {
        > section {
          width: 40%;
        }
      }
    `;
  }
}
