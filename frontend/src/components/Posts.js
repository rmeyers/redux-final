import React, { Component } from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Post from "./Post";
import { getPosts, getComments, incRating, decRating } from '../actions/index'
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

  // findComments = (posts) => {
  //   for (var i = 0; i < posts.length; i++) {
  //     var post = posts[i]
  //     const id = post.id
  //     this.props.getComments()
  //     const commentsList = this.props.comments
  //     console.log(this.props)
  //     const numComments = commentsList.length
  //     post['numComments'] = numComments
  //   }
  //   return posts
  // }

  render() {
    if ('posts' in this.props.posts) {
      var posts = this.props.posts.posts
      var comments = this.props.comments

      // Filter based on the selection by the user
      const filterBy = this.props.filterBy
      if (filterBy !== 'all') {
        posts = posts.filter(post => post.category === this.props.filterBy)
      }
      const sortMetric = this.state.sortBy
      posts = posts.sort(function(a, b) {
        return parseInt(b[sortMetric], 10) - parseInt(a[sortMetric], 10)
      })
      // posts = this.findComments(posts)

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
              comments={ comments }
            />
          ))}
        </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
      posts: state.postsReducer,
      comments: state.commentsReducer.comments
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      getPosts: () => dispatch(getPosts()),
      getComments: () => dispatch(getComments()),
      incRating: (postId) => dispatch(incRating(postId)),
      decRating: (postId) => dispatch(decRating(postId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
