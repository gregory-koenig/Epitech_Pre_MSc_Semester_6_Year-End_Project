import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      user: "",
      email: "",
      roles: "",
      act: ""
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));

    this.setState({
      id: user.id,
      user: user.username,
      email: user.email,
      roles: user.roles,
      act: user.accessToken


    })

  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader><h5>Hello {this.state.user} !</h5></CardHeader>
              <CardBody>
                <Table responsive striped hover>

                  <tbody>
                    <tr>
                      <td><strong>ID:</strong></td>
                      <td>{this.state.id}</td>
                    </tr>
                    <tr>
                      <td><strong>Username:</strong></td>
                      <td>{this.state.user}</td>
                    </tr>
                    <tr>
                      <td><strong>Email:</strong></td>
                      <td>{this.state.email}</td>
                    </tr>
                    <tr>
                      <td><strong>Roles:</strong></td>
                      <td>{this.state.roles}</td>
                    </tr>
                    <tr>
                      <td><strong>Access Token:</strong></td>
                      <td>{this.state.act}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Profile;
