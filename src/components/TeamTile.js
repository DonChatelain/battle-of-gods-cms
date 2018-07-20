import React from 'react';
import styled from 'styled-components';

export default class TeamTile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const t = this.props.team;
    const Wrapper = this.style();
    return (
      <Wrapper>
        <h3>{t.name}</h3>
        <div className="teamInfo">
          <div>
            <label>Faction</label>
            <p>{t.faction}</p>
          </div>
          <div>
            <label>Class</label>
            <p>{t.deckClass}</p>
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
          text-indent: 10px;
          line-height: 2em;
          
          label {
            font-size: 0.9em;
            color: grey;
          }
          p {
            font-size: 1.2em;
          }
        }
      }
    `;
  }
}