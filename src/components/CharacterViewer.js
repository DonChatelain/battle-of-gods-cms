import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import config from '../config';
import CharacterTile from './CharacterTile';


export default class CharacterViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      editing: null,
    };
  }

  componentDidMount() {
    const url = new URL(window.location.href);
    const queries = [
      url.searchParams.get('name') ? 'name=' + url.searchParams.get('name') : '',
      url.searchParams.get('faction') ? 'faction=' + url.searchParams.get('faction') : '',
      url.searchParams.get('team') ? 'team=' + url.searchParams.get('team') : '',
      url.searchParams.get('health') ? 'health=' + url.searchParams.get('health') : ''
    ];
    axios
      .get(config.API_URL + '/characters?' + queries.join('&'))
      .then(res => this.setState({ characters: res.data }))
      .catch(err => console.error(err));
  }

  onBlur(value, charIndex, field) {
    const newState = {};
    newState[field] = value;
    const char = this.state.characters.find(c => c.index === charIndex);
    if (char[field] === newState[field]) return;
    char[field] = newState[field];
    this.patchData(charIndex, newState);
  }

  patchData(index, data) {
    axios
      .patch(`${config.API_URL}/characters/${index}`, data)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(this.state.characters) !== JSON.stringify(nextState.characters) ||
        this.state.editing !== nextState.editing) 
      return true
    else
      return false
  }

  render() {
    const Wrapper = this.style();

    return (
      <Wrapper>
        {this.state.characters.map((char, i) => {
          return (
            <CharacterTile
              character={char}
              key={i}
              index={i}
              onBlur={this.onBlur.bind(this)}>
            </CharacterTile>
          )
        })}
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
