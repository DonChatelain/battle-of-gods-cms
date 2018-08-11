import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import config from '../config';
import SpecialCardTile from './SpecialCardTile';

export default class TeamViewer extends React.Component {
  constructor(props) {
    super(props);
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
      .catch(err => {
        if (err.response && err.response.status === 401) {
          window.location.href = '/signin'
        }
        console.error(err)
      })
  }

  displayLoader() {
    if (this.state.cards.length === 0) {
      return <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    }
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
    const Wrapper = this.style();
    return (
      <Wrapper>
        <Filter characters={this.state.characters}/>
        {this.displayLoader()}
        {this.state.cards.map((card, i) => 
          <SpecialCardTile
            key={i}
            card={card}
            characters={this.state.characters}
            index={i}
            onChange={this.onChange.bind(this)}>
          </SpecialCardTile>
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

class Filter extends React.Component {
  constructor() {
    super();
    this.charFilter = new URL(window.location.href).searchParams.get('owner');
    this.sortables = [
      {
        id: 'owner',
        label: 'Owner'
      },
      {
        id: 'qty',
        label: 'Quantity'
      },
      {
        id: 'atk',
        label: 'Attack'
      },
      {
        id: 'def',
        label: 'Defense'
      }
    ]
  }

  onFilterChange(char) {
    const url = new URL(window.location.href);
    if (char === 'none') {
      url.searchParams.delete('owner');
    } else {
      url.searchParams.set('owner', char);
    }
    window.location.href = url;
  }

  render() {
    const Wrapper = this.style();
    return (
      <Wrapper>
        <div>
          <span>Filter By Character</span>
          <select defaultValue={this.charFilter} 
                  onChange={(event) => this.onFilterChange(event.target.value)}>
            <option key="-1" value="none">None</option>
            {this.props.characters.map((char, i) => {
              return <option key={'char_' + i} value={char.name}>{char.name}</option>
            })}

          </select>
        </div>

        <div>
          <span>Sort By</span>
          <select defaultValue="character"
                  onChange={(event) => console.log('sort', event.target.value)}>
            {
              this.sortables.map((x, i) => {
                return <option key={i} value={x.id}>{x.label}</option>
              })
            }
          </select>
        </div>

        <div>
          ASC / DSC
        </div>
      </Wrapper>
    )
  }

  style() {
    return styled.div`
      width: 100%;
      display: flex;
      justify-content: space-around;
      border-bottom: 1px solid #eaeaea;
      padding-bottom: 20px;

      div {
        /* width: 300px; */

        span {
          opacity: 0.5;
          font-size: 0.8em;
        }

        select {
          /* width: 100%; */
          -webkit-appearance: none;
          height: 30px;
          text-indent: 10px;
        }
      }
    `;
  }
}
