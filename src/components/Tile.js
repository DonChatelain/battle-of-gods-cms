import React from 'react';
import styled from 'styled-components';

import color from '../styles/color-variables';

export default class Tile extends React.Component {
  
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
      position: relative;
      top: 0;
      left: 0;
      border-bottom: 1px solid #eaeaea;

      * {
        margin: 4px 0;
      }
      >:last-child {
        margin-bottom: 15px;
      }
      a.anchor-target {
        position: absolute;
        top: -35px;
        left: 0;
        visibility: hidden;
      }
      h3 {
        font-size: 1.2em;
      }
      .row {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
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
            max-width: calc(100% - ${sectionPadding});
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
        &.fourth {
          * {
          }
          > * {
            width: calc(25% - ${sectionPadding} / 2);
          }
        }
      }

      .major-minor {
        opacity: 0.5;
        font-style: italic;
        display: flex;
        align-items: center;

      }
      input.major-minor {
        min-width: 50px !important;
        width: 50px !important;
        max-width: 50px !important;
      }

      label {
        font-size: 0.9em;
        color: grey;
        display: block;
        width: 100%;
      }

      select, input, textarea, a, label.file-input {
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
        &[type=submit] {
          -webkit-appearance: none;
        }

        &[type=file] {
          line-height: 2.5;
          text-indent: 0;
          position: absolute;
          left: -9999px;
        }

        &[type=checkbox]:checked {
          background: ${color.blue};
          border: 2px solid ${color.blue};
        }
        &:disabled {
          opacity: 0.2;
        }
      }

      label.file-input {
        color: black;
        letter-spacing: normal;
        line-height: 30px;
        background-size: 100%;
        background-position-y: center;
      }

      textarea {
        min-width: 100%;
        max-width: 100%;
        min-height: 75px;
        letter-spacing: normal;
        font-weight: normal;
        padding:  10px 10px;
        text-indent: 0;
      }

      a {
        text-align: center;
        max-width: 70% !important;
        margin: 0 auto;
        color: ${color.blue};
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.8;
        &:hover {
          opacity: 1;
        }
      }

      select {
      }

      .delete-card-btn {
        padding-top: 5px;

        span {
          margin-left: auto;
          cursor: pointer;
          color: ${color.red};
        }
      }

      .sp-card-count {
        display: flex;
        align-items: center;
        justify-content: center;

        > * {
          max-width: none !important;
          min-width: auto !important;
          padding: 0 2px;
        }

        div {
          width: 20px;
          height: 20px;
          background-size: contain;
          background-repeat: no-repeat;
          filter: grayscale(1);
        }

        span {
          font-size: 0.8em;
          opacity: 0.6;
        }
      }
    `;
  }
}