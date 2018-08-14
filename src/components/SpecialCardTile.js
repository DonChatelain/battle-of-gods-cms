import React from 'react';

import Tile from './Tile';

export default class SpecialCardTile extends Tile {
  constructor(props) {
    super(props);
    this.state = {
      isEditingName: false,
      name: this.props.card.name,
    }
    this.inputRef = null;
  }

  changeName(newName) {
    this.props.onChange(newName, this.props.index, 'name');
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
      <h3 className="row full tile-name"
          onClick={() => {
            this.setState({ isEditingName: true }, () => this.inputRef.focus());
          }}>
        {this.state.name}
      </h3>
    )
  }

  deleteCard(id, name) {
    const sure = confirm(`Are you sure you want to delete ${name}?`);
    if (sure) {
      const reallySure = confirm(`Are you REALLY sure you want to DELETE ${name}?`)
      if (reallySure) {
        const affirm = confirm(`Take a deep breath and really think hard about your life and the decisions being made. You are ABSO-FUCKING-LUTELY POSITIVE you want to delete ${name}????`)
        if (affirm) this.props.deleteCard(id);
      }
    }
  }

  render() {
    const card = this.props.card;
    const i = this.props.index;
    return (
      <Tile>
        <a className="anchor-target" name={this.state.name}>&nbsp;</a>
        
        {this.displayName()}

        <div className="row half">
          <div>
            <label>Owner</label>
            <select defaultValue={card.owner} 
                    onChange={(event) => this.props.onChange(event.target.value, i, 'owner')}>
              <option key="-1" value={card.owner}>{card.owner}</option>
              {this.props.characters.map((char, i) => {
                return <option key={'char_' + i} value={char.name}>{char.name}</option>
              })}

            </select>
          </div>
          <div>
            <label>Quantity</label>
            <input type="number"
                    onBlur={(event) => this.props.onChange(event.target.value, i, 'qty')}
                    defaultValue={card.qty} />
          </div>
        </div>
        <div className="row half">
          <div>
            <label>Attack</label>
            <input type="number"
                    onBlur={(event) => this.props.onChange(event.target.value, i, 'atk')}
                    defaultValue={card.atk} />
          </div>
          <div>
            <label>Instant Damage</label>
            <input type="number"
                    onBlur={(event) => this.props.onChange(event.target.value, i, 'instant')}
                    defaultValue={card.instant} />
          </div>
        </div>
        <div className="row half">
          <div>
            <label>Defense</label>
            <input type="number"
                    onBlur={(event) => this.props.onChange(event.target.value, i, 'def')}
                    defaultValue={card.def} />
          </div>
          <div>
            <label>Fully Block?</label>
            <input type="checkbox" disabled
                    defaultChecked={card.def === -1} />
            {/* Disabled */}
          </div>
        </div>
        <div className="row full">
          <div>
            <label>Effect Description</label>
            <textarea defaultValue={card.effect}
                      onBlur={(event) => this.props.onChange(event.target.value, i, 'effect')}>

            </textarea>
          </div>
        </div>
        <div className="row full">
          <span onClick={() => this.deleteCard(card._id, this.state.name)} className="delete-card-btn">Delete</span>
        </div>
      </Tile>
    )
  }
}
