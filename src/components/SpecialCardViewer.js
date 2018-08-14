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
      requestActive: false,
    };
    this.allCardsPresent = false;
    this.totalCount = 0;
    this.requestOffset = 0;
    this.requestLimit = 10;
    this.cancelRequest = () => {}; // reassigned by axios before req
    this.onScroll = this.onScroll.bind(this);
  }

  onScroll() {
    if (this.state.requestActive) return;
    if (window.scrollY >= document.body.scrollHeight - window.innerHeight - 10) {
      if (this.allCardsPresent) document.removeEventListener('scroll', this.onScroll)
      else this.fetchCards();
    }
  }

  componentDidMount() {
    this.fetchCards();
    this.fetchCharacterNames();
    document.addEventListener('scroll', this.onScroll);
  }

  componentDidUpdate(props, state) {
    if (state.cards && this.totalCount !== 0 && state.cards.length === this.totalCount) {
      this.allCardsPresent = true;
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  fetchCards() {
    if (this.state.requestActive ) return;
    const url = new URL(window.location.href);
    const queries = [
      'offset=' + this.requestOffset,
      'limit=' + this.requestLimit, 
      url.searchParams.get('owner') ? 'owner=' + url.searchParams.get('owner') : '',
      url.searchParams.get('limit') ? 'limit=' + url.searchParams.get('limit') : '',
      url.searchParams.get('sortBy') ? 'sortBy=' + url.searchParams.get('sortBy') : '',
      url.searchParams.get('sortOrder') ? 'sortOrder=' + url.searchParams.get('sortOrder') : '',
    ];
    this.setState({ requestActive: true });
    axios
      .get(
        config.API_URL + '/specialcards?' + queries.join('&'),
        { cancelToken: new axios.CancelToken(executor => this.cancelRequest = executor) },
      )
      .then(res => {
        if (!this.totalCount) this.totalCount = res.headers['total-count'];
        if (res.data.length > 0) {
          this.setState({ cards: this.state.cards.concat(res.data) }, () => this.setState({ requestActive: false }));
        } else {
          this.setState({ requestActive: false });
        }
        this.requestOffset += this.requestLimit;
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          // Authentication error from passport
          window.location.href = '/signin'
        }
        console.error(err)
        this.setState({ requestActive: false });
      });
  }

  componentWillUnmount() {
    this.cancelRequest();
  }

  displayLoader() {
    if (this.state.requestActive) {
      return <div style={{ top: '20px', position: 'relative' }} className="lds-ellipsis">
        <div></div><div></div><div></div><div></div>
      </div>
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
      .then(res => { return; this.setState({ characters: res.data })})
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

  deleteCard(id) {
    let index;
    const card = this.state.cards.find((c, i) => {
      if (c._id === id) index = i;
      return c._id === id;
    });
    if (!card) return console.log('cannot find card with id', id);
    axios
      .delete(config.API_URL + '/specialcards/' + id)
      .then((res) => {
        console.log(res);
        const cards = Array.from(this.state.cards);
        const out = cards.splice(index, 1);
        this.setState({ cards })
      })
      .catch(err => console.error(err));
  }

  render() {
    const Wrapper = this.style();
    return (
      <Wrapper>
        <Filter characters={this.state.characters}/>
        
        <div className="cards-wrapper">
          {this.state.cards.map((card, i) => 
            <SpecialCardTile
              key={i}
              card={card}
              characters={this.state.characters}
              index={i}
              onChange={this.onChange.bind(this)}
              deleteCard={this.deleteCard.bind(this)} >
            </SpecialCardTile>
          )}
        </div>
        <div className="bottom-filler">
          {this.displayLoader()}
        </div>
      </Wrapper>
    );
  }

  style() {
    return styled.main`
      padding: 10px;
      width: 100%;

      .bottom-filler {
        width: 100%;
        height: 100px;
      }

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
          cursor: pointer;
        }
      }
    `;
  }
}
