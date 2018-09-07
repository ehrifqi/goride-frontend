import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import OrderPanel from './order/OrderPanel';
import OrderHistory from './orderHistory/OrderHistory';
import withAuth from '../../hocs/withAuth';

class CustomerRoute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { match } = this.props;
    return (
      <div id="router">
        <Switch>
          <Route exact path={`${match.url}/orderhistory`} component={withAuth(OrderHistory)} />
          <Route exact path={`${match.url}`} component={withAuth(OrderPanel)} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(CustomerRoute);