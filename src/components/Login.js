import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import config from '../config.js';
import color from '../styles/color-variables';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      loading: false,
    };

    this.cancelRequest = () => {}; // reassigned by axios before req
  }

  componentWillUnmount() {
    this.cancelRequest();
  }

  onSubmit(e, name, password) {
    e.preventDefault();
    if (this.state.error) this.setState({ error: '' });
    const error = this.preValidateLogin(name, password);
    if (error) return this.setState({ error });

    this.setState({ loading: true });

    if (typeof this.cancelRequest === 'function') {
      this.cancelRequest();
    }

    axios
      .post(
        config.API_URL + '/auth/signin',
        { name, password },
        { cancelToken: new axios.CancelToken(executor => this.cancelRequest = executor) },
      )
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
          this.setState({ error: err.message })
        }
        console.error(err.message);
      })
      .finally(() => this.setState({ loading: false }));
  }

  displayLoader() {
    if (this.state.loading) {
      return <div style={{ position: 'static', transform: 'translateX(0)' }} className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    }
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
    console.log('render')
    const Wrapper = this.style();
    return (
      <Wrapper>
        <p>You must be signed in to enter</p>
        <p className="login-error">{this.state.error}</p>

        <LoginForm onSubmit={this.onSubmit.bind(this)}/>
        {this.displayLoader()}
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

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.userRef = React.createRef();
    this.passRef = React.createRef();
  }
  
  shouldComponentUpdate() { return false }

  render() {
    return (
      <form onSubmit={(e) => this.props.onSubmit(e, this.userRef.current.value, this.passRef.current.value)}>
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
    );
  }
} 
