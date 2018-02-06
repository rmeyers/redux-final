import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import Posts from "./Posts";

class LandingPage extends Component {

  state = {
    filterBy: 'all'
  }

  filterBy = (event) => {
    const target = event.target
    const name = target.name

    this.setState({
      filterBy: name
    })
  }

  render () {
    return (
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <Table striped bordered condensed hover className="cat-table">
                  <thead>
                    <tr>
                      <th>Categories</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><a name='all' onClick={this.filterBy}>All</a></td>
                    </tr>
                    <tr>
                      <td><a name='react' onClick={this.filterBy}>React</a></td>
                    </tr>
                    <tr>
                      <td><a name='redux' onClick={this.filterBy}>Redux</a></td>
                    </tr>
                    <tr>
                      <td><a name='udacity' onClick={this.filterBy}>Udacity</a></td>
                    </tr>
                  </tbody>
              </Table>
            </div>
            <div className="col-sm-9">
              <Posts filterBy={ this.state.filterBy } />
            </div>
          </div>
        </div>
      );
  };
};

export default LandingPage;

