import React from 'react';
import styled from 'styled-components';

import color from '../styles/color-variables';

export default class TeamTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props.team);
  }

  onFactionChange(event) {
    const faction = event.target.value
    this.props.patchData(this.state.key, { faction });
    this.setState({ faction });
  }

  onDeckClassChange(event) {
    const deckClass = event.target.value;
    this.props.patchData(this.state.key, { deckClass });
    this.setState({ deckClass });
  }

  render() {
    const team = this.state;
    const Wrapper = this.style();
    return (
      <Wrapper>
        <h3>{team.name}</h3>
        <div className="teamInfo">
          <div>
            <label>Faction</label>
            <select value={team.faction} 
                    onChange={this.onFactionChange.bind(this)}>
              <option value="Egyptian">Egyptian</option>
              <option value="Norse">Norse</option>
              <option value="Greek">Greek</option>
              <option value="Mesoamerican">Mesoamerican</option>
            </select>
          </div>
          <div>
            <label>Class</label>
            <select value={team.deckClass}
                    onChange={this.onDeckClassChange.bind(this)}>
              <option value="BLUE">BLUE</option>
              <option value="GREEN">GREEN</option>
              <option value="RED">RED</option>
            </select>
          </div>
        </div>
      </Wrapper>
    );
  }

  style() {
    const teamNameSize = '1.2em';
    const teamNamePadding = '10px';

    return styled.section`
      width: 100%;
      height: 200px;
      border-bottom: 1px solid #eaeaea;
      
      h3 {
        font-size: ${teamNameSize};
        padding: ${teamNamePadding};
      }

      .teamInfo {
        display: flex;
        flex-wrap: wrap;
        height: calc(100% - ${teamNameSize} - (${teamNamePadding} * 2));

        div {
          width: 50%;
          height: 50%;
          text-indent: 15px;
          line-height: 2em;
          
          label {
            font-size: 0.9em;
            color: grey;
          }
          select {
            -webkit-appearance: none;
            -moz-appearance: none;
            padding: 10px;
            min-width: 50%;
            max-width: calc(100% - 10px);
            margin-left: 15px;
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
          }
        }
      }
    `;
  }
}