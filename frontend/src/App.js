import React, { Component } from 'react';
import './App.css';

import { LandingPage } from "./components/LandingPage";


class App extends Component {
  render() {
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

export default App;
