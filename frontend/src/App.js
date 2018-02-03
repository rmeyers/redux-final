import React, { Component } from 'react';
import './App.css';
import { Table } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Ryan's Reader App</h1>
        </header>

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
                    <td>All</td>
                  </tr>
                  <tr>
                    <td>React</td>
                  </tr>
                  <tr>
                    <td>Redux</td>
                  </tr>
                  <tr>
                    <td>Udacity</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="col-sm-9">

              Hellofjfdk;adfkl;dkfldfksadkl;adfk;adfkl;kdfl;kl;dfa
            </div>
          </div>
        </div>

        <footer className="App-footer">
          <p>Ryan's Reader 2018</p>
        </footer>

      </div>
    );
  }
}

export default App;
