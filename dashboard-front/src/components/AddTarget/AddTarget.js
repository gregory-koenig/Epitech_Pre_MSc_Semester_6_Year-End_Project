import React, { Component } from "react";
import { Alert } from 'reactstrap';
import TargetDataService from "../../services/target.service";

export default class AddTarget extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTarget = this.saveTarget.bind(this);
    this.newTarget = this.newTarget.bind(this);

    this.state = {
      id: null,
      url: "",
      description: "",
      status: new Date(),

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      url: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveTarget() {
    var data = {
      url: this.state.url,
      description: this.state.description,
      status: this.state.status
    };

    TargetDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          url: response.data.url,
          description: response.data.description,
          status: new Date(),

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTarget() {
    this.setState({
      id: null,
      url: "",
      description: "",
      status: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <Alert>You submitted successfully!</Alert>
            <button className="btn btn-success" onClick={this.newTarget}>
              Back
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="url">IP or URL</label>
              <input
                type="text"
                className="form-control"
                id="url"
                required
                value={this.state.url}
                onChange={this.onChangeTitle}
                name="url"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveTarget} id="btn" className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
