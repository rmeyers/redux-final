import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import '../App.css';
import LandingPage from "./LandingPage";
import PostDetail from "./PostDetail";
import CreatePost from "./CreatePost";
import NoMatch from "./PageNotFound";

class App extends Component {
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <Link to='/'><h1 className="App-title">Ryan's Reader App</h1></Link>
        </header>

        <Switch>
          <Route exact path='/' component={ LandingPage } />
          <Route path='/create-post' component={ CreatePost } />
          <Route exact path='/:category' component={ LandingPage } />
          <Route path='/:category/:post_id' component={ PostDetail } />
          <Route component={ NoMatch } />
        </Switch>

        <footer className="App-footer">
          <p>Ryan's Reader 2018</p>
        </footer>

      </div>
    );
  }
}

export default App
