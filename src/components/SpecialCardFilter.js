import React from 'react';
import styled from 'styled-components';

import ascIcon from '../static/sort-asc.png';
import dscIcon from '../static/sort-dsc.png';
import addIcon from '../static/plus-button.svg';

export default class SpecialCardFilter extends React.Component {
  constructor(props) {
    super(props);
    this.charFilter = new URL(window.location.href).searchParams.get('owner');
    this.sortBy = new URL(window.location.href).searchParams.get('sortBy');
    this.sortOrder = new URL(window.location.href).searchParams.get('sortOrder');
    if (this.sortOrder == null) this.sortOrder = 1;
    this.sortables = [
      {
        id: 'owner',
        label: 'Owner'
      },
      {
        id: 'qty',
        label: 'Quantity'
      },
      {
        id: 'atk',
        label: 'Attack'
      },
      {
        id: 'def',
        label: 'Defense'
      }
    ]
  }

  onFilterChange(char) {
    const url = new URL(window.location.href);
    if (char === 'none') {
      url.searchParams.delete('owner');
    } else {
      url.searchParams.set('owner', char);
    }
    window.location.href = url;
  }

  onSortByChange(field) {
    const url = new URL(window.location.href);
    url.searchParams.set('sortBy', field);
    window.location.href = url;
  }

  onSortOrderChange() {
    const order = this.sortOrder * -1;
    const url = new URL(window.location.href);
    url.searchParams.set('sortOrder', order);
    window.location.href = url; 
  }

  render() {
    const Wrapper = this.style();
    const sortOrder = this.sortOrder == -1 ? dscIcon : ascIcon; // eslint-disable-line

    return (
      <Wrapper>
        <div>
          <span>Add</span>
          <div style={{ backgroundImage: `url(${addIcon})` }} className="filter-btn" onClick={this.props.addCard}></div>
        </div>
        <div>
          <span>Filter By Character</span>
          <select className="filter"
                  defaultValue={this.charFilter} 
                  onChange={(event) => this.onFilterChange(event.target.value)}>
            <option key="-1" value="none">None</option>
            {this.props.characters.map((char, i) => {
              return <option key={'char_' + i} value={char.name}>{char.name}</option>
            })}
          </select>
        </div>

        <div>
          <span>Sort By</span>
          <select className="filter"
                  defaultValue={this.sortBy}
                  onChange={(event) => this.onSortByChange(event.target.value)}>
            {
              this.sortables.map((x, i) => {
                return <option key={i} value={x.id}>{x.label}</option>
              })
            }
          </select>
        </div>

        <div>
          <span>Order</span>
          <div style={{ backgroundImage: `url(${sortOrder})` }}
               className="filter-btn"
               onClick={this.onSortOrderChange.bind(this)}>
          </div>
        </div>
      </Wrapper>
    )
  }

  style() {
    return styled.div`
      width: 300px;
      display: flex;
      justify-content: space-around;
      border-bottom: 1px solid #eaeaea;
      padding-bottom: 15px;
      margin-bottom: 15px;

      .filter-btn {
        width: 30px;
        height: 30px;
        background-size: contain;
        background-repeat: no-repeat;
        cursor: pointer;
      }

      div {
        /* width: 300px; */

        span {
          opacity: 0.5;
          font-size: 0.8em;
          display: block;
        }

        select.filter {
          border-radius: 0;
          width: 100%;
          min-width: 70px;
          -webkit-appearance: none;
          height: 30px;
          text-indent: 10px;
          cursor: pointer;
          border-bottom: 2px solid #000;
          font-weight: bold;
        }
      }
    `;
  }
}
