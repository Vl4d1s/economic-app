import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

class HeaderMenu extends Component {
  render() {
    const { items, location, headerIcon } = this.props;

    let menuItems = [];
    for (let i = 0; i < items.length; i++) {
      if (this.props.items[i].length !== 2) {
        console.error('HeaderMenu: items format should be ["name", "route"]');
        break;
      }
      const name = items[i][0];
      const route = items[i][1];
      menuItems.push(
        <Menu.Item key={'item-' + i} index={i} as={Link} to={route} active={route === location.pathname}>
          {name}
        </Menu.Item>
      );
    }

    const rightMenu = () => (
      <Menu.Menu position="right">
        <Dropdown item text="Tabels">
          <Dropdown.Menu>
            <Dropdown.Item icon="group" text="Workers" as={Link} to={'/workers'} />
            <Dropdown.Item icon="percent" text="InterestRate" as={Link} to={'/interestrate'} />
            <Dropdown.Item icon="settings" text="option3" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    );

    return (
      <Menu size="massive">
        <Menu.Item header as={Link} to={'/'}>
          {headerIcon && <Icon name={headerIcon} size="large" />}
          Economic Calculator
        </Menu.Item>
        {menuItems}
        {rightMenu()}
      </Menu>
    );
  }
}

HeaderMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
};

export default withRouter(HeaderMenu);
