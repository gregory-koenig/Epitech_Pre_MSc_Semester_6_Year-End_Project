import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button } from 'reactstrap';

class Harvest extends Component {

  render() {
    return (
      <div className="animated fadeIn">
      <Row>
        <Col xl={4}>
          <Card>
            <CardHeader>IntelX</CardHeader>
            <CardBody>
              <p>Search engine and data archive</p>
              <Button color="success" href="https://intelx.io" target="_blank" rel="noopener noreferrer">View</Button>
            </CardBody>
          </Card>
        </Col>
        <Col xl={4}>
          <Card>
            <CardHeader>Hunter</CardHeader>
            <CardBody>
              <p>Finding email addresses with domain name</p>
              <Button color="success" href="https://hunter.io" rel="noopener noreferrer" target="_blank">View</Button>
            </CardBody>
          </Card>
        </Col>
        <Col xl={4}>
          <Card>
            <CardHeader>PhonebookCZ</CardHeader>
            <CardBody>
              <p>List subdomain / url / email for a given domain</p>
              <Button color="success" href="https://phonebook.cz" rel="noopener noreferrer" target="_blank">View</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
      </div>
    )
  }
}

export default Harvest;
