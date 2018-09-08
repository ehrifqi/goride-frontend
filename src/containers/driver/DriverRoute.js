import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchOrder from './order/SearchOrder';
import withAuth from '../../hocs/withAuth';
import OrderHistory from '../customer/orderHistory/OrderHistory'
import Profile from './profile/DriverProfile';

class DriverRoute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { match } = this.props;
    return (
      <div id="router">
        <Switch>
          <Route exact path={`${match.url}/orderhistory`} component={withAuth(OrderHistory)} />
          <Route exact path={`${match.url}/profile`} component={withAuth(Profile)} />
          <Route exact path={`${match.url}`} component={withAuth(SearchOrder)} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(DriverRoute);