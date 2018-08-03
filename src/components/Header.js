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
    const headHeight = 35;
    const headTopExtend = 165;
    const headLeftExtend = 50;
    const headTextPaddingLeft = 7;
    return styled.header`
      z-index: 100;
      position: fixed;
      top: 0;
      left: -${headLeftExtend}px;
      width: 130%;
      height: ${headHeight + headTopExtend}px;
      margin-top: -${headTopExtend}px;
      line-height: ${headHeight}px;
      background: ${color.blue};
      text-transform: uppercase;
      letter-spacing: 2px;

      h1 {
        font-size: 1em;
        color: white;
        position: absolute;
        bottom: 0;
        left: ${headLeftExtend + headTextPaddingLeft}px;
      }
    `;
  }
}
