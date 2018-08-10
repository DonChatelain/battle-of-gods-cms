import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import config from '../config.js';
import color from '../styles/color-variables';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      error: '',
    };
    this.userRef = React.createRef();
    this.passRef = React.createRef();
  }

  onSubmit(e) {
    e.preventDefault();
    const name = this.userRef.current.value;
    const password = this.passRef.current.value;
    const error = this.preValidateLogin(name, password);
    if (error) return this.setState({ error });

    axios
      .post(config.API_URL + '/auth/signin', { name, password })
      .then(res => {
        if (res.data.success === true) {
          localStorage.setItem('BOG_JWT', res.data.token);
          window.location.href = '/cms';
        } else {
          this.setState({ error: res.data.msg });
        }
      })
      .catch(err => {
        if (err.response) {
          this.setState({ error: err.response })
        }
        console.error(error);
      });
  }

  preValidateLogin(user = '', password = '') {
    let errorMessage = '';
    if (typeof user !== 'string' || user.trim() === '') {
      errorMessage = 'Username is required';
    } else if (typeof password !== 'string' || password.trim() === '') {
      errorMessage = 'Password is required';
    }
    return errorMessage;
  }

  render() {
    const Wrapper = this.style();
    return (
      <Wrapper>
        <p>You must be signed in to enter</p>
        <p className="login-error">{this.state.error}</p>

        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text"
                 id="username"
                 key="username"
                 ref={this.userRef}
                 placeholder="Username" />

          <input type="password"
                 id="password"
                 key="password"
                 ref={this.passRef}
                 placeholder="Password" />

          <input type="submit"
                 value="Sign In" />
        </form>
      </Wrapper>
    );
  }

  style() {
    return styled.main`
      margin-top: 30px;
      width: 100%;
      text-align: center;

      h1 {
        font-size: 1.2em;
      }

      p {
        margin: 15px 0;

        &.login-error {
          color: ${color.red};
          height: 20px;
          margin: 0;
        }
      }

      form {
        input {
          display: block;
          width: 80%;
          max-width: 500px;
          height: 50px;
          padding: 0 20px;
          margin: 10px auto;
          font-size: 1.2em;
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: 1px solid grey;

          &[type=submit] {
            margin-top: 30px;
            border: none;
            text-transform: uppercase;
            cursor: pointer;
          }
        }
      }
    `
  }
}
