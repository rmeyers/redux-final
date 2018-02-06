import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { createPost } from '../actions/index'
import {connect} from "react-redux";

class CreatePost extends Component {
    constructor(props) {
      super(props);
      this.state = {
        title: '',
        author: '',
        category: '',
        content: ''
      };

      this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    render () {
      const { createPost } = this.props

      return (
          <div className="container">
            <form>
              Title: <input
                        className='new-post-input'
                        name='title'
                        type='text'
                        placeholder='Title of Post'
                        onChange={this.handleInputChange}
                      />
              Author: <input
                        className='new-post-input'
                        name='author'
                        type='text'
                        placeholder='Author Name'
                        onChange={this.handleInputChange}
                      />
              Category: <input
                        className='new-post-input'
                        name='category'
                        type='text'
                        placeholder='Category'
                        onChange={this.handleInputChange}
                      />
              Content: <input
                        className='new-post-input'
                        name='body'
                        type='text'
                        placeholder='Post Content'
                        onChange={this.handleInputChange}
                      />
            </form>
            <br />
            <Link to="/"><button className="btn btn-secondary">Cancel</button></Link>
            <Link to="/"><button
              className="btn btn-primary"
              onClick={() => { createPost(this.state)} }>
                Create Post
            </button></Link>
          </div>
      );
    };
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      createPost: (content) => dispatch(createPost(content)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
