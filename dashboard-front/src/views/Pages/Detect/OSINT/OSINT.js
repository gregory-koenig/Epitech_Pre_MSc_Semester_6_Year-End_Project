import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Alert, Table } from 'reactstrap';
import { CopyBlock, dracula } from "react-code-blocks";

class Osint extends Component {

  render() {

    return (
      <div className="animated fadeIn">
        <Alert color="primary">
          INFORMATION - For the moment this features is not yet automated, it is a manual request list to allow you to find information
        </Alert>

        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>What is OSINT ?</CardHeader>
              <CardBody>
                <p>Open source intelligence is derived from data and information that is available to the general public. It’s not limited to what can be found using Google, although the so-called “surface web” is an important component.</p>
                <p>OSINT Framework: <a href="https://osintframework.com/" target="_blank" rel="noopener noreferrer">https://osintframework.com/</a></p>
              </CardBody>
            </Card>
          </Col>

          <Col xl={6}>
            <Card>
              <CardHeader>Google Dorks ?</CardHeader>
              <CardBody>
                <p>Google dorking, also known as Google hacking, can return information that is difficult to locate through simple search queries.</p>
                <p>That description includes information that is not intended for public viewing but that has not been adequately protected</p>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardHeader>List of useful Google Dorks</CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th scope="col">Dorks</th>
                      <th scope="col">Description</th>
                      <th scope="col">Search on Google</th>
                    </tr>

                  </thead>
                    <tbody>
                      <tr>
                        <td>"index of" ".env"</td>
                        <td>Sensitive file disclosure containing passwords</td>
                        <td><a href='https://www.google.com/search?q="index of" ".env"' target="_blank" rel="noopener noreferrer">Search</a></td>
                      </tr>
                      <tr>
                        <td>intitle:"index of" inurl:ftp</td>
                        <td>Open FTP Server</td>
                        <td><a href='https://www.google.com/search?q=intitle:"index of" inurl:ftp' target="_blank" rel="noopener noreferrer">Search</a></td>
                      </tr>
                      <tr>
                        <td>intitle:index.of id_rsa -id_rsa.pub</td>
                        <td>SSH Private Key</td>
                        <td><a href='https://www.google.com/search?q=intitle:index.of id_rsa -id_rsa.pub' target="_blank" rel="noopener noreferrer">Search</a></td>
                      </tr>
                    </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardHeader>How to prevent ?</CardHeader>
              <CardBody>
                <p>One of the best ways to prevent Google dorks is by using a robots.txt file</p>
                <p className="mt-2">The following configuration will deny all crawling from any directory within your website, which is pretty useful for private access websites that don’t rely on publicly-indexable Internet content.</p>
                <CopyBlock
                  language="text"
                  text={`User-agent: *\nDisallow: /`}
                  codeBlock
                  theme={dracula}
                  showLineNumbers={false}
                />

                <p className="mt-2">You can also block specific directories to be excepted from web crawling. If you have an /admin area and you need to protect it, just place this code inside:</p>
                <CopyBlock
                  language="text"
                  text={`User-agent: *\nDisallow: /admin/`}
                  codeBlock
                  theme={dracula}
                  showLineNumbers={false}
                />
              </CardBody>
            </Card>
          </Col>

        </Row>
      </div>
    )
  }
}

export default Osint;
