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

    const tabelsInfo = [
      { icon: 'group', text: 'Workers', to: '/workers' },
      { icon: 'percent', text: 'Interest Rate', to: '/interestrate' },
      { icon: 'chart line', text: 'Leaving Prob', to: '/leavingprob' },
      { icon: 'female', text: 'Life Womens', to: '/lifewomens' },
      { icon: 'male', text: 'Life Mans', to: '/lifemens' },
    ];

    const renderedTabelsInfo = tabelsInfo.map((item, index) => {
      return <Dropdown.Item icon={item.icon} text={item.text} as={Link} to={item.to} key={index} />;
    });

    const rightMenu = () => (
      <Menu.Menu position="right">
        <Dropdown item text="Tabels" icon="dropdown">
          <Dropdown.Menu>{renderedTabelsInfo}</Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    );

    return (
      <Menu size="small" secondary>
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
