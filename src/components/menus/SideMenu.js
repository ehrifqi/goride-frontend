import React, { Component } from 'react'
import './SideMenu.css';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class SideMenu extends Component {
  constructor(props) {
    super(props);

  }

  getActiveClass = id => {
    if (this.props.activeId === id) {
      return "active"
    }
    return " "
  }

  mapCustomerMenusToSideMenu = () => {
    return this.props.menus.map((menu) => {
      return (
        <a
          key={menu.id}
          className={`item ${this.getActiveClass(menu.id)}`}
          id={menu.id}
          onClick={() => this.props.setActiveId(menu.id, menu.redirectTo)}>
          {menu.displayName}
        </a>
      )
    })
  }

  render() {

    return (
      <div className="sidemenu" style={{ minHeight: '90vh' }}>
        {this.mapCustomerMenusToSideMenu()}
      </div>
    )
  }
}

SideMenu.propTypes = {
  menus: PropTypes.array.isRequired,
  activeId: PropTypes.string.isRequired,
  setActiveId: PropTypes.func.isRequired
}

export default withRouter(SideMenu)