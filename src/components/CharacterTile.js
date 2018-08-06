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
    this.props.onBlur(newName, this.state._id, 'name');
    this.setState({ isEditingName: false, name: newName });
  }

  displayName() {
    if (this.state.isEditingName === true) {
      return (
        <input type="text"
               className="tile-name"
               defaultValue={this.state.name}
               ref={(input) => this.inputRef = input}
               onBlur={(event) => this.changeName(event.target.value)} 
               onKeyPress={(event) => { if (event.key === 'Enter') this.changeName(event.target.value) }} />
      ) 
    }
    return (
      <h3 className="tile-name"
          onClick={() => {
            this.setState({ isEditingName: true }, () => this.inputRef.focus());
          }}>
        {this.state.name}
      </h3>
    )
  }

  displayMinorCount(index) {
    if (this.state.minorCount != null) {
      return (
          <input type="number"
                 className="major-minor"
                 defaultValue={this.state.minorCount}
                 onBlur={(event) => this.props.onBlur(event.target.value, this.state._id, 'minorCount')} />
      )
    }
    // return (
    //   <h4 className="major-minor">Major</h4>
    // )
  }

  render() {
    const char = this.state;
    const id = this.state._id;
    const getImageFileText = () => {
      if (this.state.image === '')
        return 'No Image Uploaded'
    };
    return (
      <Tile>
        <a className="anchor-target" name={char.name}>&nbsp;</a>
        
        <div className="row half">
          {this.displayName()}
          {this.displayMinorCount(this.props.index)}
        </div>

        <div className="row half">
          <div>
            <label>Health</label>
            <input type="number"
                  defaultValue={char.health}
                  onBlur={(event) => this.props.onBlur(event.target.value, id, 'health')}
            />
          </div>
          <div>
            <label>Image</label>
            <label className="file-input"
                   style={{ backgroundImage: `url(character_images/${char.image})`}}
                   htmlFor={char.name + "_image_input"}>
              {getImageFileText()}
            </label>
            <input type="file" 
                   id={char.name + "_image_input"}
                   onChange={(event) => {
                     console.log('upload image! just kidding', event.target.files[0])
                     this.props.handleFile(char._id, event.target.files[0], (filename) => this.setState({ image: filename }))
                  }}
            /> 
          </div>
        </div>
        <div className="row full">
          <label>Description</label>
          <textarea defaultValue={char.description}
                    onBlur={(event) => this.props.onBlur(event.target.value, id, 'description')}>
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
