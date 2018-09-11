import React, { Component } from 'react'
import CustomerRoute from './CustomerRoute';
import LandingPageFooter from '../../components/footers/LandingpageFooter';
import LandingPageHeader from '../../components/headers/LandingpageHeader';
import SideMenu from '../../components/menus/SideMenu';
import { withRouter } from 'react-router-dom';

const customerMenus = [
  {
    id: "menu-order",
    displayName: "Order",
    redirectTo: "/customer"
  },
  {
    id: "menu-order-history",
    displayName: "Order History",
    redirectTo: "/customer/orderhistory"
  },
  {
    id: "menu-profile",
    displayName: "Profile",
    redirectTo: "/customer/profile"
  }
  ,
  {
    id: "menu-logout",
    displayName: "Logout",
    redirectTo: "/customer/logout"
  }
]

class Customer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeId: "menu-order"
    }
  }

  setActiveId = (id, redirectTo) => {
    this.setState({ ...this.state, activeId: id });
    this.props.history.push(redirectTo)
  }

  render() {
    return (
      <div>
        <LandingPageHeader
          redirectToHome={() => {
            this.setActiveId(customerMenus[0].id, customerMenus[0].redirectTo)
          }}
        />
        <div style={{ display: 'flex' }}>
          <SideMenu
            menus={customerMenus}
            activeId={this.state.activeId}
            setActiveId={this.setActiveId}
          />
          <div style={{ padding: '2rem 4rem 2rem 4rem', width: '100%' }}>
            <CustomerRoute />
          </div>
        </div>
        <LandingPageFooter
          isAbsolute={false}
        />
      </div>
    )
  }
}

export default withRouter(Customer)