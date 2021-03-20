import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu, Icon, Dropdown } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

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
        <Menu.Item
          key={"item-" + i}
          index={i}
          as={Link}
          to={route}
          header={i === 0}
          active={route === location.pathname}
        >
          {name}
        </Menu.Item>
      );
    }

    return (
      <Menu pointing secondary size="huge">
        {this.props.headerIcon && (
          <Menu.Item>
            <Icon name={headerIcon} size="large" />
          </Menu.Item>
        )}

        {menuItems}
        <Menu.Menu position="right">
          <Dropdown item text="More">
            <Dropdown.Menu>
              <Dropdown.Item icon="edit" text="option1" as={Link} to={"/"} />
              <Dropdown.Item icon="globe" text="option2" />
              <Dropdown.Item icon="settings" text="option3" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}

HeaderMenu.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  headerIcon: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
};

export default withRouter(HeaderMenu);
