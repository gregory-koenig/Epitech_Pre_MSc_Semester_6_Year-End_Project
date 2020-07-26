import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import avatar from '../../assets/img/brand/hacker.jpg';

const propTypes = {
  accnt: PropTypes.bool,
};
const defaultProps = {
  accnt: false,
};

class DefaultHeaderDropdown extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  dropAccnt() {
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <img src={avatar} className="img-avatar" alt="img" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
          <DropdownItem><i className="fa fa-user"></i><a href="/#/profile">Profile</a></DropdownItem>
          <DropdownItem onClick={this.props.onLogout}><i className="fa fa-lock"></i> Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    const { accnt } = this.props;
    return (
          accnt ? this.dropAccnt() : null
    );
  }
}

DefaultHeaderDropdown.propTypes = propTypes;
DefaultHeaderDropdown.defaultProps = defaultProps;

export default DefaultHeaderDropdown;
