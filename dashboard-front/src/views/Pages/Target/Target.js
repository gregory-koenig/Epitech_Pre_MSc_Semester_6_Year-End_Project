import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import Disclaimer from '../../../components/Disclaimer/Disclaimer';
import AddTarget from '../../../components/AddTarget/AddTarget'
import TargetList from '../../../components/TargetList/TargetList'

class Target extends Component {

  render() {

    return (
      <div className="animated fadeIn">
        <Disclaimer />

        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>Add a target</CardHeader>
              <CardBody>
                <AddTarget/>
              </CardBody>
            </Card>
          </Col>

          <Col xl={6}>
            <Card>
              <CardHeader>Target List</CardHeader>
              <CardBody>
                <TargetList/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Target;
