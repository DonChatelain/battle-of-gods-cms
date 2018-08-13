import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import config from '../config';
import SpecialCardTile from './SpecialCardTile';
import ascIcon from '../static/sort-asc.png';
import dscIcon from '../static/sort-dsc.png';

export default class TeamViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      characters: [],
    };
    this.cancelRequest = () => {}; // reassigned by axios before req
  }

  componentDidMount() {
    const url = new URL(window.location.href);
    const queries = [
      url.searchParams.get('owner') ? 'owner=' + url.searchParams.get('owner') : '',
      url.searchParams.get('limit') ? 'limit=' + url.searchParams.get('limit') : '',
      url.searchParams.get('sortBy') ? 'sortBy=' + url.searchParams.get('sortBy') : '',
      url.searchParams.get('sortOrder') ? 'sortOrder=' + url.searchParams.get('sortOrder') : '',
    ];
    axios
      .get(
        config.API_URL + '/specialcards?' + queries.join('&'),
        { cancelToken: new axios.CancelToken(executor => this.cancelRequest = executor) },
      )
      .then(res => this.setState({ cards: res.data }, this.fetchCharacterNames))
      .catch(err => {
        if (err.response && err.response.status === 401) {
          window.location.href = '/signin'
        }
        console.error(err)
      })
  }

  componentWillUnmount() {
    this.cancelRequest();
  }

  displayLoader() {
    if (this.state.cards.length === 0) {
      return <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    }
  }

  patchData(id, data) {
    this.cancelRequest();

    axios
      .patch(
        `${config.API_URL}/specialcards/${id}`,
        data,
        { cancelToken: new axios.CancelToken(executor => this.cancelRequest = executor) },
      )
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
        <div className="cards-wrapper">
          {this.state.cards.map((card, i) => 
            <SpecialCardTile
              key={i}
              card={card}
              characters={this.state.characters}
              index={i}
              onChange={this.onChange.bind(this)}>
            </SpecialCardTile>
          )}
        </div>
      </Wrapper>
    );
  }

  style() {
    return styled.main`
      padding: 10px;
      width: 100%;

      .cards-wrapper {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;

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
      }
    `;
  }
}

// = = = = = = = = == = = = = = == = = = = = == = = = = = = = = = = = = == = = = = = == == =

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.charFilter = new URL(window.location.href).searchParams.get('owner');
    this.sortBy = new URL(window.location.href).searchParams.get('sortBy');
    this.sortOrder = new URL(window.location.href).searchParams.get('sortOrder');
    if (this.sortOrder == null) this.sortOrder = 1;
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

  onSortByChange(field) {
    const url = new URL(window.location.href);
    url.searchParams.set('sortBy', field);
    window.location.href = url;
  }

  onSortOrderChange() {
    const order = this.sortOrder * -1;
    const url = new URL(window.location.href);
    url.searchParams.set('sortOrder', order);
    window.location.href = url; 
  }

  render() {
    const Wrapper = this.style();
    const sortOrder = this.sortOrder == -1 ? dscIcon : ascIcon; // eslint-disable-line

    return (
      <Wrapper>
        <div>
          <span>Filter By Character</span>
          <select className="filter"
                  defaultValue={this.charFilter} 
                  onChange={(event) => this.onFilterChange(event.target.value)}>
            <option key="-1" value="none">None</option>
            {this.props.characters.map((char, i) => {
              return <option key={'char_' + i} value={char.name}>{char.name}</option>
            })}
          </select>
        </div>

        <div>
          <span>Sort By</span>
          <select className="filter"
                  defaultValue={this.sortBy}
                  onChange={(event) => this.onSortByChange(event.target.value)}>
            {
              this.sortables.map((x, i) => {
                return <option key={i} value={x.id}>{x.label}</option>
              })
            }
          </select>
        </div>

        <div>
          <span>Order</span>
          <div style={{ backgroundImage: `url(${sortOrder})` }}
               className="sort-order"
               onClick={this.onSortOrderChange.bind(this)}>
          </div>
        </div>
      </Wrapper>
    )
  }

  style() {
    return styled.div`
      width: 300px;
      display: flex;
      justify-content: space-around;
      border-bottom: 1px solid #eaeaea;
      padding-bottom: 15px;
      margin-bottom: 15px;

      .sort-order {
        width: 30px;
        height: 30px;
        background-size: contain;
        background-repeat: no-repeat;
        cursor: pointer;
      }

      div {
        /* width: 300px; */

        span {
          opacity: 0.5;
          font-size: 0.8em;
          display: block;
        }

        select.filter {
          border-radius: 0;
          width: 100%;
          min-width: 70px;
          -webkit-appearance: none;
          height: 30px;
          text-indent: 10px;
        }
      }
    `;
  }
}
