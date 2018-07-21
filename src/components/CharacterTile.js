import React from 'react';
import styled from 'styled-components';

import color from '../styles/color-variables';

// class Input extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = Object.assign({}, this.props);
//   }

//   render() {
//     return (
//       <input type={this.props.type}
//         value={this.props.value}
//         onChange={this.props.onChange}
//       />
//     )
//   }
// }

export default class CharacterTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props.character);
    this.descriptionRef = React.createRef();
  }

  onBlur(event, field) {
    const newState = {};
    newState[field] = event.target.value;
    if (this.state[field] === newState[field]) return;
    this.props.patchData(this.state.index, newState);
    this.setState(newState);
  }

  render() {

    // TODO: display team (name + faction symbol)
    // TODO: display aggregate stats per character
    const char = this.state;
    const Wrapper = this.style();
    return (
      <Wrapper>
        <h3>{char.name}</h3>
        <div className="info-wrapper">
          <div>
            <label>Health</label>
            <input type="number"
                   defaultValue={char.health}
                   onBlur={(event) => this.onBlur(event, 'health')}
            />
          </div>
          <div>
            <label>Image</label>
            <input type="file" /> 
            {/* TODO: file upload USE LABEL and hide this shit */}
          </div>
        </div>
        <div>
          <label>Description</label>
          <textarea defaultValue={char.description}
                    onBlur={(event) => this.onBlur(event, 'description')}>
          </textarea>
        </div>
      </Wrapper>
    );
  }

  style() {
    const teamNameSize = '1.2em';
    const teamNamePadding = '10px';

    return styled.section`
      width: 100%;
      height: 250px;
      border-bottom: 1px solid #eaeaea;
      
      h3 {
        font-size: ${teamNameSize};
        padding: ${teamNamePadding};
      }

      .info-wrapper {
        display: flex;
        flex-wrap: wrap;
        height: calc(50% - ${teamNameSize} - (${teamNamePadding} * 2));

        div {
          width: 50%;
          height: 50%;
          text-indent: 15px;
          line-height: 2em;
        }
      }

      label {
        font-size: 0.9em;
        color: grey;
        text-indent: 15px;
        display: block;
      }

      input {
        display: block;
        -webkit-appearance: none;
        -moz-appearance: none;
        /* padding: 0 10px; */
        height: 30px;
        min-width: calc(50% - 30px);
        max-width: calc(100% - 30px);
        margin-left: 15px;
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

        &[type=file] {
          line-height: 2.5;
          text-indent: 0;
        }
      }

      div {
        height: calc(50% - 35px);
      }

      textarea {
        width: calc(100% - 50px);
        height: 60%;
        padding: 10px;
        margin: 10px 15px;
        display: block;
        -webkit-appearance: none;
        -moz-appearance: none;
        border: 0;
        border-bottom: 2px solid ${color.blue};
        box-shadow: 1px 2px 7px 0px rgba(0,0,0,0.3);
      }
      /* TODO: MAJOR styling refactor / sensibility */
    `;
  }
}