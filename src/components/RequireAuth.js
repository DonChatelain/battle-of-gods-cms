import React, { Component } from 'react';  

export default function(ComposedComponent) {  
  class Authentication extends Component {

    componentWillMount() {
      if(!this.props.authenticated) {
        this.context.router.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.authenticated) {
        this.context.router.push('/signin');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }
}