import React, { Component } from "react";
import { Alert } from "reactstrap";

export default class Disclaimer extends Component {
  render() {

    return (
      <Alert color="warning">
        DISCLAIMER - We have no responsibility for detecting or not detecting malicious code on your website or any other website.
      </Alert>
    );
  }
}
