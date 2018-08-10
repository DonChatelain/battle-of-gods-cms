import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom'

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

  signOut() {
    localStorage.removeItem('BOG_JWT');
  }

  render() {
    const Wrapper = this.style();
    const displaySignOutButton = () => {
      if (this.props.history.location.pathname !== '/signin') {
        return <Link className="sign-out-btn" onClick={this.signOut.bind(this)} to="/signin">Sign Out</Link>
      }
    }

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
        {displaySignOutButton()}
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

      .sign-out-btn {
        right: ${headSideExtend * 1.5}px;
        width: auto;
        left: auto;
        color: white;
        padding: 0 5px;
      }
    `;
  }
}

export default withRouter(Header);
