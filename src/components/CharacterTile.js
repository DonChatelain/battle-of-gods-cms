import React from 'react';
import { Link } from 'react-router-dom';

import Tile from './Tile';

export default class CharacterTile extends Tile {
  constructor(props) {
    super(props);
    this.state = {
      isEditingName: false,
    }
    this.state = Object.assign(this.state, this.props.character);
    this.inputRef = null;
  }

  changeName(newName) {
    this.props.onBlur(newName, this.props.index, 'name');
    this.setState({ isEditingName: false, name: newName });
  }

  displayName() {
    if (this.state.isEditingName === true) {
      return (
        <input type="text"
               className="tile-name"
               defaultValue={this.state.name}
               ref={(input) => this.inputRef = input}
               onSubmit={() => console.log('fuck')}
               onBlur={(event) => this.changeName(event.target.value)} 
               onKeyPress={(event) => { if (event.key === 'Enter') this.changeName(event.target.value) }} />
      ) 
    }
    return (
      <h3 className="row full tile-name"
          onClick={() => {
            this.setState({ isEditingName: true }, () => this.inputRef.focus());
          }}>
        {this.state.name}
      </h3>
    )
  }

  render() {
    const char = this.state;
    const i = this.props.index;
    return (
      <Tile>
        <a className="anchor-target" name={char.name}>&nbsp;</a>
        
        {this.displayName()}

        <div className="row half">
          <div>
            <label>Health</label>
            <input type="number"
                  defaultValue={char.health}
                  onBlur={(event) => this.props.onBlur(event.target.value, i, 'health')}
            />
          </div>
          <div>
            <label>Image</label>
            <input type="file" /> 
          </div>
        </div>
        <div className="row full">
          <label>Description</label>
          <textarea defaultValue={char.description}
                    onBlur={(event) => this.props.onBlur(event.target.value, i, 'description')}>
          </textarea>
        </div>
        <div className="row full">
          <Link to={`/specialcards?owner=${char.name}`}>
            View Special Cards
          </Link>
        </div>
      </Tile>
    )
  }
}
