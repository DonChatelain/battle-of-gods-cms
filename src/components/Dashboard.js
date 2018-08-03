import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom'

import config from '../config';

export default class Header extends React.Component {
  // constructor() {
  //   super();
  // }

  componentDidMount() {
    // this.fetchData(ENDPOINT.TEAMS)
    //   .then(res => this.setState({ teams: res.data }))
    //   .catch(error => console.error(error));

    // this.fetchData(ENDPOINT.CHARACTERS)
    //   .then(res => this.setState({ characters: res.data }))
    //   .catch(error => console.error(error));

    // this.fetchData(ENDPOINT.SPECIAL_CARDS)
    //   .then(res => this.setState({ specialCards: res.data }))
    //   .catch(error => console.error(error));
  }

  render() {
    const Wrapper = this.style();
    return (
      <Wrapper>
        <div><Link to="/characters">Characters</Link></div>
        <div><Link to="/teams">Teams</Link></div>
        <div><Link to="/specialcards">Special Cards</Link></div>
        <div><Link to="/basiccards">Basic Cards</Link></div>
      </Wrapper>
    );
  }

  fetchData(endpoint) {
    return new Promise((resolve, reject) => {
      axios
        .get(config.API_URL + endpoint)
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }

  style() {
    return styled.main`
      background: black;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;

      div {
        width: 100%;
        height: calc(25vh - 12px);
        font-size: 1.5em;
        border-left: 1px solid #eaeaea;
        border-bottom: 1px solid #eaeaea;
        box-sizing: border-box;
        transition: opacity 300ms ease;
        opacity: 0.95;
        background: white;

        &:hover {
          opacity: 1;
        }

        a {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          cursor: pointer;
          justify-content: center;
        }
      }

      @media only screen and (min-width : 768px) {
        flex-direction: row;

        div {
          width: 50%;
          height: calc(50vh - 12px)
        }
      }
    `;
  }
}
