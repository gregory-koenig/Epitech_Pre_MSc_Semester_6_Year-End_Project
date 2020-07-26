import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';
import DetectDataService from "../../../services/detect.service";
import AttackDataService from "../../../services/attack.service";

class History extends Component {
  constructor(props) {
    super(props);

    this.getScanDoc = this.getScanDoc.bind(this);
    this.getAttackDoc = this.getAttackDoc.bind(this);

    this.state = {
      scanDocs: [],
      atkDocs: []
    };
  }

  getScanDoc() {
    DetectDataService.getDoc()
      .then(response => {
        this.setState({
          scanDocs: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  getAttackDoc() {
    AttackDataService.getDoc()
      .then(response => {
        this.setState({
          atkDocs: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentDidMount() {
    this.getScanDoc();
    this.getAttackDoc();
  }

  render() {
    const { scanDocs } = this.state;
    const { atkDocs } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>Scan Report</CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Document</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  {scanDocs.map(doc =>
                    <tbody key={doc}>
                      <tr>
                        <td><i className="fa fa-file-pdf-o"></i> {doc}</td>
                        <td>
                          <Button color="success" className="mr-2">Open</Button>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </Table>
              </CardBody>
            </Card>
          </Col>

          <Col xl={6}>
            <Card>
              <CardHeader>Attack Report</CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Document</th>
                      <th scope="col">Action</th>
                    </tr>

                  </thead>
                  {atkDocs.map(doc =>
                    <tbody key={doc}>
                      <tr>
                        <td><i className="fa fa-file-pdf-o"></i> {doc}</td>
                        <td>
                          <Button color="success" className="mr-2">Open</Button>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default History;
