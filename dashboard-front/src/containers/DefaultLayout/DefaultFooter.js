import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    //const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="/">Projet Libre</a> &copy; 2020 Epitech Strasbourg</span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
