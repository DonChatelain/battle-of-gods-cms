import React from 'react';
import styled from 'styled-components';

import color from '../styles/color-variables';

export default class Header extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    const Wrapper = this.style();

    return (
      <Wrapper>
        <h1>Battle of Gods</h1>
      </Wrapper>
    );
  }

  style() {
    const headerHeight = 50;
    return styled.header`
      width: 100%;
      height: ${headerHeight}px;
      line-height: ${headerHeight}px;
      background: ${color.blue};
      text-align: center;
      color: white;
      text-transform: uppercase;
      letter-spacing: 2px;

      h1 {
        font-size: 1.2em;
      }
    `;
  }
}
