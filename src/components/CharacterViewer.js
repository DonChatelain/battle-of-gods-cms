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
    this.cancelRequest = () => {};
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
      .get(
        config.API_URL + '/characters?' + queries.join('&'),
        { cancelToken: new axios.CancelToken(executor => this.cancelRequest = executor) },
      )
      .then(res => this.setState({ characters: res.data }))
      .catch(err => {
        if (err.response && err.response.status === 401) {
          window.location.href = '/signin'
        }
        console.error(err)
      });
  }

  componentWillUnmount() {
    this.cancelRequest();
  }

  displayLoader() {
    if (this.state.characters.length === 0) {
      return <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    }
  }

  onBlur(value, charId, field) {
    const newState = {};
    newState[field] = value;
    const char = this.state.characters.find(c => c._id === charId);
    if (!char || char[field] === newState[field]) return;
    char[field] = newState[field];
    this.patchData(charId, newState);
  }

  handleFile(id, file, cb) {
    if (!file) return;

    const data = new FormData();
    data.append('name', file.name);
    data.append('type', 'character');
    data.append('id', id);
    data.append('file', file);

    axios
      .post(`${config.API_URL}/imageuploads`, data)
      .then(res => cb(file.name))
      .catch(err => console.error(err));
  }

  patchData(id, data) {
    this.cancelRequest();
    
    axios
      .patch(`${config.API_URL}/characters/${id}`, data)
      .then(res => console.log(res.data))
      .catch(err => {
        if (err.response && err.response.status === 403) console.log('Nice try, but your credentials have READ-only access');
        console.error(err);
      });
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
        {this.displayLoader()}
        {this.state.characters.map((char, i) => {
          return (
            <CharacterTile
              character={char}
              key={i}
              index={i}
              onBlur={this.onBlur.bind(this)}
              handleFile={this.handleFile.bind(this)}>
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
