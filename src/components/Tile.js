import React from 'react';
import styled from 'styled-components';

import color from '../styles/color-variables';

export default class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props.data);  
  }

  render() {
    const Wrapper = this.style();
    return (
      <Wrapper>
        { this.props.children  }
      </Wrapper>
    );
  }

  style() {
    const sectionPadding= '10px';
    return styled.section`

      border-bottom: 1px solid #eaeaea;
      * {
        margin: 7px 0;
      }
      h3 {
        font-size: 1.2em;
      }
      .row {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        &.full {
          display: block;
          > * {
            width: calc(100% - ${sectionPadding} * 2);
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
          }
          * {
            max-width: calc(100% - ${sectionPadding} * 2);
          }
        }
        &.half {
          * {
            max-width: 100%;
          }
          >* {
            width: calc(50% - ${sectionPadding} / 2);
          }
        }
      }

      label {
        font-size: 0.9em;
        color: grey;
        display: block;
        width: 100%;
      }

      input {
        display: block;
        -webkit-appearance: none;
        -moz-appearance: none;
        height: 30px;
        font-size: 0.8em;
        overflow: hidden;
        border: 0;
        border-bottom: 2px solid #428bca;
        font-weight: bold;
        -webkit-letter-spacing: .15em;
        -moz-letter-spacing: .15em;
        -ms-letter-spacing: .15em;
        letter-spacing: .15em;
        box-shadow: 1px 2px 7px 0px rgba(0,0,0,0.3);
        text-indent: 10px;
        border-bottom-left-radius: 0% !important;
        border-bottom-right-radius: 0% !important;
        border-radius: 0% !important;
        &:focus, &:active {
          outline: 0;
          border-bottom-color: ${color.red};
        }

        &[type=file] {
          line-height: 2.5;
          text-indent: 0;
        }
      }

      textarea {
        min-width: 100%;
        max-width: 100%;
        min-height: 75px;
        height: 30px;
        -webkit-appearance: none;
        -moz-appearance: none;
        border: 0;
        border-bottom: 2px solid ${color.blue};
        box-shadow: 1px 2px 7px 0px rgba(0,0,0,0.3);
        &:focus, &:active {
          outline: 0;
          border-bottom-color: ${color.red};
        }
      }

      select {
        -webkit-appearance: none;
        -moz-appearance: none;
        padding: 10px;
        /* min-width: 50%;
        max-width: calc(100% - 10px); */
        /* margin-left: 15px; */
        font-size: 0.8em;
        overflow: hidden;
        border: 0;
        border-bottom: 2px solid ${color.blue};
        font-weight: bold;
        -webkit-letter-spacing: .15em;
        -moz-letter-spacing: .15em;
        -ms-letter-spacing: .15em;
        letter-spacing: .15em;
        box-shadow: 1px 2px 7px 0px rgba(0,0,0,0.3);
        border-bottom-left-radius: 0% !important;
        border-bottom-right-radius: 0% !important;
        border-radius: 0% !important;
        display: block;
        &:focus, &:active {
          outline: 0;
          border-bottom-color: ${color.red};
        }
    `;
  }
}