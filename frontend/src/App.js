import React, { Component } from 'react';
import {connect} from "react-redux";
import './App.css';

import { LandingPage } from "./components/LandingPage";


class App extends Component {
  render() {
    console.log("HERE", this.props)

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Ryan's Reader App</h1>
        </header>

        <LandingPage />

        <footer className="App-footer">
          <p>Ryan's Reader 2018</p>
        </footer>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("Testing: ", state)
  return {
      categories: state.catReducer,
      posts: state.postsReducer
  };
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);


