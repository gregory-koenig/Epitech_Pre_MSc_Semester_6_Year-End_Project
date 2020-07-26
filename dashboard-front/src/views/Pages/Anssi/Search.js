import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

import AnssiDataService from '../../../services/anssi.service';

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      request: '',
      results: [],
      getResults: false,
      messageError: ''
    };

    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateInput(event) {
    this.setState({
      request: event.target.value
    });
  }

  handleSubmit() {
    let request = {
      'title': this.state.request
    }

    AnssiDataService.search(request)
      .then(response => {
        this.setState({
          results: response.data,
          getResults: true,
          messageError: ''
        });
      })
      .catch(error => {
        this.setState({
          getResults: false,
          messageError: 'No results found!'
        });
        console.log(error);
      });
  }

  getResults(data) {
    const items =  [];

    for (const [index, value] of data.entries()) {
      items.push(
        <ListGroupItem key={index}>
          <a
            href={value.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {value.title}
          </a>
        </ListGroupItem>
      );
    }

    return (
      <ListGroup>
        {items}
      </ListGroup>
    )
  }

  onKeyDown = (event) => {
    if (event.key === 'Enter')
      this.handleSubmit();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <label htmlFor="request">ANSSI alerts search</label>
              </CardHeader>

              <CardBody>
                <input
                  type="text"
                  className="form-control"
                  id="request"
                  value={this.state.request}
                  onChange={this.updateInput}
                  onKeyDown={this.onKeyDown}
                />

                <Button
                  color="success"
                  className="mt-4"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Search
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {this.state.getResults ? (
          <>
            <p>{this.state.results.count} result(s)</p>
            {this.getResults(this.state.results.data)}
          </>
        ) : (
          <p>{this.state.messageError}</p>
        )}
      </div>
    )
  }
}

export default Search;
