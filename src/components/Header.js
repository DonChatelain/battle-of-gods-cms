import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

import color from '../styles/color-variables';

export default class Header extends React.Component {
  // constructor() {
  //   super();
  // }

  

  render() {
    const Wrapper = this.style();

    return (
      <Wrapper>
        <Link to="/cms">
          <h1>Battle of Gods</h1>
        </Link>
      </Wrapper>
    );
  }

  style() {
    const headerHeight = 35;
    return styled.header`
      width: 100%;
      height: ${headerHeight}px;
      line-height: ${headerHeight}px;
      background: ${color.blue};
      text-transform: uppercase;
      letter-spacing: 2px;

      h1 {
        font-size: 1em;
        color: white;
        padding-left: ${headerHeight / 5}px;
      }
    `;
  }
}
