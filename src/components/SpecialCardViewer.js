import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import config from '../config';
import SpecialCardTile from './SpecialCardTile';
import SpecialCardFilter from './SpecialCardFilter';

export default class TeamViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      characters: [],
      requestActive: false,
    };
    this.addingCard = false;
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
    document.removeEventListener('scroll', this.onScroll);
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
      .get(config.API_URL + '/characters/names')
      .then(res => { this.setState({ characters: res.data })})
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

  addCard() {
    if (this.addingCard) return;
    this.addingCard = true;

    const cardData = {
      name: 'Untitled',
      owner: '',
      effect: '',
      atk: 0,
      def: 0,
      qty: 0
    }
    this.postCard(cardData)
  }

  postCard(card) {
    if (!card) return;
    axios
      .post(config.API_URL + '/specialcards', card)
      .then(res => {
        const cards = Array.from(this.state.cards);
        cards.unshift(res.data);
        this.setState({ cards }, () => this.addingCard = false);
      })
      .catch(err => console.error(err));
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
        const cards = Array.from(this.state.cards);
        cards.splice(index, 1);
        this.setState({ cards })
      })
      .catch(err => console.error(err));
  }

  render() {
    const Wrapper = this.style();
    return (
      <Wrapper>

        <SpecialCardFilter
          characters={this.state.characters}
          addCard={this.addCard.bind(this)}
        />
        
        <div className="cards-wrapper">
          {this.state.cards.map((card, i) => 
            <SpecialCardTile
              key={i}
              card={card}
              characters={this.state.characters}
              index={i}
              onChange={this.onChange.bind(this)}
              deleteCard={this.deleteCard.bind(this)}
            />
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
          /* width:/ calc(100% - 10px); */
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
