import React, { Component } from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Post } from "./Post";
import { getPosts, incRating, decRating } from '../actions/index'
import {connect} from "react-redux";

class Posts extends Component {
  state = {
    sortBy: 'timestamp'
  }

  componentWillMount() {
    this.props.getPosts();
  }

  sortBy = (event) => {
    this.setState(() => ({
      sortBy: event
    }))
  }

  render() {
    if ('posts' in this.props.posts) {
      var posts = this.props.posts.posts

      // Filter based on the selection by the user
      const filterBy = this.props.filterBy
      if (filterBy !== 'all') {
        posts = posts.filter(post => post.category === this.props.filterBy)
      }
      const sortMetric = this.state.sortBy
      posts = posts.sort(function(a, b) {
        return parseInt(b[sortMetric], 10) - parseInt(a[sortMetric], 10)
      })

    } else {
      posts = []
    }

    return (
        <div>
          <h1>Posts</h1>
          <div>
            <Link to="/create-post"><button className="btn btn-primary">Add Post</button></Link>
            <DropdownButton title="Sort By" id="SortByDropdown" onSelect={ this.sortBy }>
              <MenuItem eventKey="timestamp">Date</MenuItem>
              <MenuItem eventKey="voteScore">Rating</MenuItem>
            </DropdownButton>
          </div><br />
          { posts.map((post) => (
            <Post
              key={post.id}
              thisPost={post}
              incRating={(postId) => this.props.incRating(postId)}
              decRating={(postId) => this.props.decRating(postId)}
            />
          ))}
        </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
      posts: state.postsReducer
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      getPosts: () => dispatch(getPosts()),
      incRating: (postId) => dispatch(incRating(postId)),
      decRating: (postId) => dispatch(decRating(postId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
