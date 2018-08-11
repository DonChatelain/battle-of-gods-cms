import React from 'react';
import styled from 'styled-components';

import BasicCardClassTile from './BasicCardClassTile';

export default class BasicCardViewer extends React.Component {
  constructor() {
    super();
    this.colors = [
      'RED',
      'BLUE',
      'GREEN',
    ]
  }

  render() {
    const Wrapper = this.style();
    return (
      <Wrapper>
        {this.colors.map((colorClass, i) => 
          <BasicCardClassTile
            key={i}
            colorClass={colorClass}
            index={i}>
          </BasicCardClassTile>
        )}
      </Wrapper>
    );
  }

  style() {
    return styled.main`
      /* padding: 10px; */
      background: black;

      > section {
        width: 100%;

      }

      @media only screen and (min-width : 768px) {
        > section {
          /* width: 40%; */
        }
      }
    `;
  }
}
