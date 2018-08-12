import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Tile from './Tile';
import config from '../config';

export default class SpecialCardTile extends Tile {
  constructor(props) {
    super(props);
    this.colorClass = this.props.colorClass;
    this.state = {
      classData: [],
      display: false,
    };
    this.cancelRequest = () => {};
  }

  displayLoader() {
    if (this.state.classData.length === 0 && this.state.display === true) {
      return <div style={{ position: 'static', transform: 'translateX(0)' }} className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    }
  }

  componentWillUnmount() {
    this.cancelRequest();
  }

  fetchClassDataByColor(color) {
    this.setState({ display: !this.state.display });

    if (this.state.classData.length > 0) return;

    this.cancelRequest();

    axios
      .get(
        config.API_URL + '/basiccardclasses/' + color,
        { cancelToken: new axios.CancelToken(executor => this.cancelRequest = executor) },
      )
      .then(res => this.setState({ classData: res.data.cards }))
      .catch(err => {
        if (err.response && err.response.status === 401) {
          window.location.href = '/signin'
        }
        console.error(err)
      })
  }

  render() {
    const Wrapper = this.style();

    return (
      <Wrapper onClick={() => this.fetchClassDataByColor(this.colorClass)}>
      <h1>{this.colorClass}</h1>
      {this.displayLoader()}
      <div style={{ display: this.state.display ? 'flex' : 'none' }} className="basic-card-wrapper">
      {this.state.classData.map((x, i) => {
        return (
          <div key={i} className="basic-card">
            <p>Atk {x.atk}</p>
            <p>Def {x.def}</p>
            <p>Qty {x.qty}</p>
          </div>
        );
      })}
      </div>
      </Wrapper>
    )
  }

  style() {
    return styled.section`
      padding: 50px;
      opacity: 0.95;
      text-align: center;
      background: white;
      transition: opacity 250ms ease;
      border-bottom: 1px solid #e0e0e0;
      cursor: pointer;
      z-index: 1;

      &:hover {
        opacity: 1;
        z-index: 2;
      }

      h1 {
        letter-spacing: 2px;
        font-size: 1.2em;
      }

      .basic-card-wrapper {
        display: flex;
        flex-wrap: wrap;
        margin-top: 15px;

        .basic-card {
          width: 200px;
          height: 200px;
          border: 1px solid #eaeaea;
          display: flex;
          flex-direction: column;
          justify-content: center;

          > * {
            font-size: 1.1em;
            padding-bottom: 10px;
          }
        }
       }
    `;
  }
}
