# Battle of Gods: Content Management System
_**Battle of Gods**_ is a physical board game currently in development and led by Don Chatelain and Patrick Johnson. 
While working on the API for characters and cards, etc., I decided to build a full CMS alongside it- giving my partners and I fine-tuned access to making changes and viewing our game's content. Below serves as a description of technologies used and technical decisions made.

- MERN stack single page application utlizing server-side rendering.
Express handles all API endpoints and lets other requests fall through to React's front-end [router](https://github.com/ReactTraining/react-router).
This allows both the client and server code to be hosted in the same place (deployed using [Now](https://zeit.co/now) by Zeit)

- [Passport.js](http://www.passportjs.org/) is used for authentication using a JWT strategy and encrypted payloads

- [Mongoose](http://mongoosejs.com/) serves as an ODM to MongoDB- utlizing aggregation and model schemas

- I use [styled components](https://github.com/styled-components/styled-components) in such a way that allows me to write all pertinant code to a component (JS, HTML, CSS) within the same class _while_ keeping my preferred order hierarchy- JavaScript at the top, with HTML below it (`render()`) and CSS at the bottom (`style()`). For example: 

```javascript
import React from 'react';
import styled from 'styled-components';

export default class CharacterViewer extends React.Component {
  constructor(props) { ...
  }
  
  fetchData(event) { ...
  }

  render() {
    const Wrapper = this.style();
    return (
      <Wrapper onClick={this.fetchData.bind(this)}>
        {this.props.children}
      </Wrapper>
    );
  }

  style() {
    return styled.main`
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;

      > section {
        width: 100%;
      }

      @media only screen and (min-width : 768px) {
        > section {
          width: 40%;
        }
      }
    `;
  }
}

```
