import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom'

import menuIcon from '../static/menu.svg';
import color from '../styles/color-variables';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Content Management',
    };
  }

  componentDidMount() {
    this.onHistoryChange(this.props.history.location.pathname)
    this.props.history.listen(location => this.onHistoryChange(location.pathname));
  };

  // TODO: do this moar better
  onHistoryChange(pathname) {
    let title;
    switch(pathname) {
      case '/characters': title = 'Characters'; break;
      case '/specialcards': title = 'Special Cards'; break;
      case '/teams': title = 'Teams'; break;
      case '/basiccards': title = 'Basic Cards'; break;
      default: title = 'Content Management'; break;
    }
    this.setState({ title })
  }

  render() {
    const Wrapper = this.style();

    const displayHomeButton = () => {
      if (this.props.history.location.pathname !== '/signin') {
        return (
          <Link to="/cms">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              width="96" height="96"
              viewBox="0 0 48 48"
              style={{fill: '#ffffff'}}><g id="surface1"><path style={{fill: '#E65100'}} d="M 40 37 L 21 10 L 3 37 Z "></path><path style={{fill: '#F57C00'}} d="M 32.769531 20.398438 L 20 37 L 45 37 Z "></path><path style={{fill: '#BF360C'}} d="M 16.828125 34.5625 L 14.953125 37 L 20 37 L 30.441406 23.421875 L 28.03125 19.992188 Z "></path></g>
            </svg>
          </Link>
        )
      }
    }

    return (
      <Wrapper>
        {displayHomeButton()}
        <h1>{this.state.title}</h1>
        <MenuButton location={this.props.history.location.pathname} />
      </Wrapper>
    );
  }

  style() {
    const headHeight = 35;
    const headTopExtend = 165;
    const headSideExtend = 50;
    const headTextPaddingLeft = 50;

    return styled.header`
      z-index: 100;
      position: fixed;
      top: 0;
      left: -${headSideExtend}px;
      width: calc(100% + ${headSideExtend * 2}px);
      height: ${headHeight + headTopExtend}px;
      margin-top: -${headTopExtend}px;
      line-height: ${headHeight}px;
      letter-spacing: 1px;

      background: #3189d2;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right,#3189d2,#7fc6ff);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right,#3189d2,#7fc6ff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      background: linear-gradient(to right,#3189d2,#7fc6ff);

      a {
        position: absolute;
        left: ${headTextPaddingLeft}px;
        bottom: 0;
        width: 42px;
        background: transparent;
        transition: background-color 300ms ease;
      }

      a:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      a:hover svg {
        filter: grayscale(0);
      }

      h1 {
        font-size: 1em;
        color: white;
        position: absolute;
        bottom: -2px;
        left: ${headSideExtend + headTextPaddingLeft}px;
      }

      svg {
        position: relative;
        left: 3px;
        top: 14px;
        width: 35px;
        height: 35px;
        filter: grayscale(0.7);
      }

      .menu-wrapper {
        padding: 5px 15px;
        position: absolute;
        left: auto;
        bottom: 0px;
        right: 50px;
        width: 20px;
        height: 25px;
        cursor: pointer;
        background: rgba(255, 255, 255, 0);
        transition: background-color 250ms ease;

        &:hover {
          background: rgba(255, 255, 255, 0.15);
        }
        
        span {
          height: 100%;
          background-repeat: no-repeat;
          background-size: cover;
          display: block;
        }

        .menu-box {
          background: rgba(255, 255, 255, 0.98);
          position: absolute;
          top: ${headHeight}px;
          right: 0;
          width: 100vw;
          height: 100vh;
          box-shadow: -3px 0px 4px 0px rgba(0,0,0, 0.1);
          transition: right 500ms ease-in-out;
          @media only screen and (min-width : 768px) {
            width: 400px;
          }

          ul {
            list-style: none;
            user-select: none;

            li {
              opacity: 0.7;
              border-bottom: 1px solid #bdbdbd;
              padding: 20px;
              background-color: transparent;
              position: relative;

              &:hover:before {
                width: 10px;
              }

              &:before {
                content: "";
                width: 0;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background: ${color.blue};
                transition: width 250ms ease;
              }
              
              &:hover {
                opacity: 1;
              }

            }
          }
        }
      }
    `;
  }
}

class MenuButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.busy = false;
    this.options = [
      {
        title: 'Totally Useless Menu Item',
        callback: () => {},
      },
      {
        title: 'Just Filler...',
        callback: () => {},
      },
      {
        title: 'Sign Out',
        callback: () => {
          localStorage.removeItem('BOG_JWT');
          window.location.href = '/signin';
        }
      },
    ];
  }

  onClick(e) {
    if (this.busy) return;
    this.busy = true;
    this.setState({ open: !this.state.open }, () => this.busy = false);
  }

  render() {
    const displayMenu = () => {
      if (this.state.open) {
        return <div className="menu-box">
          <ul>
            {this.options.map((opt, i) => {
              return <li key={i} onClick={() => opt.callback()}>{opt.title}</li>
            })}
          </ul>
        </div>
      }
    }

    if (this.props.location === '/signin') return ''

    return (
      <div onClick={this.onClick.bind(this)} className="menu-wrapper">
        <span style={{ backgroundImage: `url(${menuIcon})` }}></span>
        {displayMenu()}
      </div>
    )
  }
}

export default withRouter(Header);
