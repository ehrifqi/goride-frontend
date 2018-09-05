import React, { Component } from 'react'
import DriverRoute from './DriverRoute';
import LandingPageFooter from '../../components/footers/LandingpageFooter';
import LandingPageHeader from '../../components/headers/LandingpageHeader';
import SideMenu from '../../components/menus/SideMenu';
import { withRouter } from 'react-router-dom';

const driverMenus = [
  {
    id: "menu-search-order",
    displayName: "Search Order",
    redirectTo: "/driver"
  },
  {
    id: "menu-order-history",
    displayName: "Order History",
    redirectTo: "/driver/orderhistory"
  },
  {
    id: "menu-profile",
    displayName: "Profile",
    redirectTo: "/driver/profile"
  }
]

class Driver extends Component {
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
            this.setActiveId(driverMenus[0].id, driverMenus[0].redirectTo)
          }}
        />
        <div style={{ display: 'flex' }}>
          <SideMenu 
            menus={driverMenus}
            activeId={this.state.activeId}
            setActiveId={this.setActiveId}
          />
          <div style={{ padding: '2rem 4rem 2rem 4rem', width: '100%' }}>
            <DriverRoute />
          </div>
        </div>
        <LandingPageFooter
          isAbsolute={false}
        />
      </div>
    )
  }
}

export default withRouter(Driver)