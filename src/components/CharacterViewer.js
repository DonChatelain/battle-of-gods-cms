import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import config from '../config';
import CharacterTile from './CharacterTile';

export default class CharacterViewer extends React.Component {
  constructor() {
    super();
    this.state = {
      characters: [],
    };
  }

  componentDidMount() {
    axios
      .get(config.API_URL + '/characters')
      .then(res => this.setState({ characters: res.data }))
      .catch(err => console.error(err));
  }

  patchData(index, data) {
    axios
      .patch(`${config.API_URL}/characters/${index}`, data)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }

  render() {
    const Wrapper = this.style();
    return (
      <Wrapper>
        {this.state.characters.map((c, i) => 
          <CharacterTile character={c} key={i} patchData={this.patchData.bind(this)} />
        )}
      </Wrapper>
    );
  }

  style() {
    return styled.main`

    `;
  }
}
