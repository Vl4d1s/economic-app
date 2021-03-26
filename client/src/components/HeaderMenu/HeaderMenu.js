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
            <Dropdown.Item icon="percent" text={`Interest Rate`} as={Link} to={'/interestrate'} />
            <Dropdown.Item icon="chart line" text={`Leaving Prob`} as={Link} to={'/leavingprob'} />
            <Dropdown.Item icon="female" text={`Life Womens`} as={Link} to={'/lifewomens'} />
            <Dropdown.Item icon="male" text={`Life Mans`} as={Link} to={'/lifemens'} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    );

    return (
      <Menu size="middle" secondary>
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
