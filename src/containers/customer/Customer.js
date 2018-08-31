import React, { Component } from 'react'
import CustomerRoute from './CustomerRoute';

class Customer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CustomerRoute />
      </div>
    )
  }
}

export default Customer