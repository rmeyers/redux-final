import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Posts from "./Posts"
import NoMatch from "./PageNotFound";


class LandingPage extends Component {
  state = {
    // This is passed down into the Posts component further down.
    filterBy: 'all'
  }

  componentDidMount() {
    this.filterBy(this.props.match.params)
  }

  // Need to use this because otherwise the function filterBy
  // would run before props has even been updated.
  componentWillReceiveProps(nextProps) {
    this.filterBy(nextProps.match.params)
  }

  filterBy = (params) => {
    var catList = [undefined, '', 'all', 'redux', 'react', 'udacity'];
    var category = params.category

    if (catList.includes(category)) {
      if (category === undefined || category === '') {
        category = 'all'
      }
    }

    this.setState({
      filterBy: category
    })
  }

  render () {

    var catList = [undefined, '', 'all', 'redux', 'react', 'udacity'];
    var thisCategory = this.props.match.params.category

    if(catList.includes(thisCategory) === false) {
      return (
        <NoMatch />
      )
    }

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
                      <td><Link to='/' name='all'>All</Link></td>
                    </tr>
                    <tr>
                      <td><Link to='/react' name='react'>React</Link></td>
                    </tr>
                    <tr>
                      <td><Link to='/redux' name='redux'>Redux</Link></td>
                    </tr>
                    <tr>
                      <td><Link to='/udacity' name='udacity'>Udacity</Link></td>
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

