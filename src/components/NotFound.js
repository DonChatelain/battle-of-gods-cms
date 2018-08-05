import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import petsematary from '../static/petsematary.jpg';

export default class NotFound extends React.Component {

  render() {
    const Wrapper = this.style();
    return (
      <Wrapper>
        <h1>Page Not Found</h1>
        <div className="image-container"></div>
        <h2>You Don't Wanna Go Down That Road...</h2>
        <Link to="/cms">Go Back</Link>
      </Wrapper>
    )
  }

  style() {
    return styled.main`
      height: 80vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;

      * {
        margin-bottom: 10px;
      }

      .image-container {
        width: 200px;
        height: 200px;
        background-image: url(${petsematary});
        background-position: -100% 25%;
        margin: 10px auto;
      }
    `;
  }
}
