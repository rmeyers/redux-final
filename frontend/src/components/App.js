import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import '../App.css';
import LandingPage from "./LandingPage";
import PostDetail from "./PostDetail";
import CreatePost from "./CreatePost";


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href="/"><h1 className="App-title">Ryan's Reader App</h1></a>
        </header>

        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={ LandingPage } />
            <Route path='/create-post' component={ CreatePost } />
            <Route path='/post-detail/:post_id' component={ PostDetail } />
          </Switch>
        </BrowserRouter>

        <footer className="App-footer">
          <p>Ryan's Reader 2018</p>
        </footer>

      </div>
    );
  }
}

export default App
