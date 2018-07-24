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
        
        a {
          border: 2px solid ${color.blue};
          cursor: pointer;
          transition: opacity 200ms ease;
          opacity: 0.75;
          color: ${color.blue};
          font-weight: bold;
          width: calc(50% - 10px * 2) !important;
          border-radius: 5px;
          font-size: 0.9em;
          text-align: center;
          box-sizing: border-box;
          padding: 5px;

          &:hover {
            opacity: 1;
          }
        }
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
            min-width: 50%;
          }
          >* {
            width: calc(50% - ${sectionPadding} / 2);
          }
        }
        &.third {
          * {
            /* max-width: 100%; */
            /* min-width: 50%; */
          }
          > * {
            width: calc(33.33% - ${sectionPadding} / 2);
          }
        }
      }

      label {
        font-size: 0.9em;
        color: grey;
        display: block;
        width: 100%;
      }

      select, input, textarea {
        display: block;
        -webkit-appearance: none;
        -moz-appearance: none;
        height: 30px;
        font-size: 0.8em;
        font-weight: bold;
        -webkit-letter-spacing: .15em;
        -moz-letter-spacing: .15em;
        -ms-letter-spacing: .15em;
        letter-spacing: .15em;
        box-shadow: 1px 2px 7px 0px rgba(0,0,0,0.3);
        text-indent: 10px;
        border: none;
        border-bottom: solid 2px ${color.blue};
        border-bottom-left-radius: 0% !important;
        border-bottom-right-radius: 0% !important;
        border-radius: 0% !important;
        overflow: hidden;
        box-sizing: border-box;
        &:focus, &:active {
          outline: 0;
          border-bottom-color: ${color.red};
        }
      }

      input {

        &[type=file] {
          line-height: 2.5;
          text-indent: 0;
        }

        &[type=checkbox]:checked {
          background: ${color.blue};
          border: 2px solid ${color.blue};
        }
        &:disabled {
          opacity: 0.2;
        }
      }

      textarea {
        min-width: 100%;
        max-width: 100%;
        min-height: 75px;
        font-weight: normal;
        padding:  10px 10px;
        text-indent: 0;
      }

      select {
      }
    `;
  }
}