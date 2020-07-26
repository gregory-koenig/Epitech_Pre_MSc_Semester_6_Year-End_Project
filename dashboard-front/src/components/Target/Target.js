import React, { Component } from "react";
import TargetDataService from "../../services/target.service";

export default class Target extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTarget = this.getTarget.bind(this);
    this.updateTarget = this.updateTarget.bind(this);
    this.deleteTarget = this.deleteTarget.bind(this);

    this.state = {
      currentTarget: {
        id: null,
        url: "",
        description: "",
      },
    };
  }

  componentDidMount() {
    this.getTarget(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const url = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTarget: {
          ...prevState.currentTarget,
          url: url
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(prevState => ({
      currentTarget: {
        ...prevState.currentTarget,
        description: description
      }
    }));
  }

  getTarget(id) {
    TargetDataService.get(id)
      .then(response => {
        this.setState({
          currentTarget: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTarget() {
    TargetDataService.update(
      this.state.currentTarget._id,
      this.state.currentTarget
    )
      .then(response => {
        console.log(response.data);
        this.props.history.push('/target')
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTarget() {
    TargetDataService.delete(this.state.currentTarget._id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/target')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTarget } = this.state;

    return (
      <div>
        {currentTarget ? (
          <div className="edit-form">
            <h4>Target</h4>
            <form>
              <div className="form-group">
                <label htmlFor="url">IP or URL</label>
                <input
                  type="text"
                  className="form-control"
                  id="url"
                  value={currentTarget.url}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTarget.description}
                  onChange={this.onChangeDescription}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTarget}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTarget}
            >
              Update
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Target...</p>
          </div>
        )}
      </div>
    );
  }
}
