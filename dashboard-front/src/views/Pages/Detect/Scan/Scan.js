import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

import Disclaimer from '../../../../components/Disclaimer/Disclaimer';
import TargetDataService from "../../../../services/target.service";
import DetectDataService from "../../../../services/detect.service";
import StatDataService from "../../../../services/stat.service";

class Scan extends Component {
  constructor(props) {
    super(props);
    this.retrieveTargets = this.retrieveTargets.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.scanTarget = this.scanTarget.bind(this);

    this.state = {
      targets: [],
      modal: false,
      selectValue: "",
      submitted: false
    };
  }

  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  componentDidMount() {
    this.retrieveTargets();
  }

  retrieveTargets() {
    TargetDataService.getAll()
      .then(response => {
        this.setState({
          targets: response.data,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  async scanTarget() {
    let data = {
      ip_addr: this.state.selectValue,
    }

    DetectDataService.scan(data)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    this.setState({
      submitted: true
    });
    this.toggle();
    this.newClick();
  }

  newClick() {
    let data = {
      type: "scan"
    }

    StatDataService.newClick(data)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { targets } = this.state;

    return (
      <div className="animated fadeIn">
        <Disclaimer />

        <Row>
          <Col>
            <Card>
              <CardHeader>Target List</CardHeader>
              <CardBody>
                <p>Choose the website you want to scan</p>
                <Input type="select" name="select" onChange={this.handleDropdownChange}>
                  <option>--- Choose a website ---</option>
                  {targets.map((target) =>
                    <option key={target._id}>{target.url}</option>
                  )}
                </Input>
                <Button color="success" className="mt-4" onClick={this.toggle}>Start scan</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Validation</ModalHeader>
          <ModalBody>
            Are you sure you want to start an attack on <strong>{this.state.selectValue}</strong> ? Remember that it's illegal to attack a website that isn't your.
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.scanTarget}>Validate</Button>
            <Button color='secondary' onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>

        {this.state.submitted ? (
          <div>
            <Alert>Your scan is started, you can retrieve the report on the history section of the site</Alert>
          </div>
        ) : null }

      </div>
    )
  }
}

export default Scan;
