import React, { Component } from "react";
import TargetDataService from "../../services/target.service";
import { Link } from "react-router-dom";
import { Table } from 'reactstrap';


export default class TargetsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveTargets = this.retrieveTargets.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.removeAllTargets = this.removeAllTargets.bind(this);

    this.state = {
      targets: [],
    };
  }

  componentDidMount() {
    this.retrieveTargets();
  }

  retrieveTargets() {
    TargetDataService.getAll()
      .then(response => {
        this.setState({
          targets: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTargets();
  }

  removeAllTargets() {
    TargetDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { targets } = this.state;

    return (
      <div className="animated fadeIn">
        <Table responsive hover>
          <thead>
            <tr>
              <th scope="col">IP or URL</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">CRON</th>
              <th scope="col">Actions</th>
            </tr>

          </thead>
            {targets.map((target, index) =>
              <tbody key={target._id}>
                <tr>
                  <td><a href={"http://" + target.url} target="_blank" rel="noopener noreferrer">{target.url}</a> </td>
                  <td>{target.description}</td>
                  <td>TIME-LAST-ATTACK</td>
                  <td>* * * * *</td>
                  <td>
                    <Link to={"/target/" + target._id} className="badge badge-warning mr-2">Edit</Link>
                  </td>
                </tr>
              </tbody>
            )}
        </Table>
        <button className="mt-3 btn btn-sm btn-danger" onClick={this.removeAllTargets}>
          Remove All
        </button>
      </div>
    );
  }
}
