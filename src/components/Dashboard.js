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
        <Link to="/characters"><div>Characters</div></Link>
        <Link to="/teams"><div>Teams</div></Link>
        <Link to="/specialcards"><div>Special Cards</div></Link>
        <Link to="/basiccards"><div>Basic Cards</div></Link>
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
    return styled.header`
      background: black;
      
      div {
        width: 100%;
        height: calc(25vh - 12px);
        font-size: 1.5em;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #eaeaea;
        box-sizing: border-box;
        cursor: pointer;
        transition: opacity 300ms ease;
        opacity: 0.95;
        background: white;

        &:hover {
          opacity: 1;
        }
      }
    `;
  }
}
