import React, { Component } from 'react'
import {connect} from "react-redux";
import Modal from 'react-modal';
import { editPost } from '../actions/index'

class EditModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // Variables for comment and post information
        postId: '',
        post: props.post,
        date: ''
      };

      // Bind function here so it has access to this.state, I think?
      this.handleInputChange = this.handleInputChange.bind(this);
    }

    // Changes local state for post info as it's changed
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      var currentPost = Object.assign({}, this.state.post)
      currentPost[name] = value

      this.setState({
        post: currentPost
      })
    }

    submitEdit = (content) => {
        this.props.onRequestClose()

        this.props.editPost(content)
    }

    render() {
        const { isOpen, onRequestClose } = this.props
        const post = this.state.post

        return (
          <Modal
            className='editModal'
            overlayClassName='overlay'
            isOpen={ isOpen }
            onRequestClose={ onRequestClose }
            contentLabel='Modal'
            ariaHideApp={false}
          >
              <h3>
                Edit Post
              </h3>
              <input
                className='post-comment'
                type='text'
                name='title'
                placeholder='Title'
                defaultValue={ post.title }
                onChange={this.handleInputChange}
              /><br />
              <input
                className='post-comment'
                type='text'
                name='author'
                placeholder='Author'
                defaultValue={ post.author }
                onChange={this.handleInputChange}
              /><br />                    <input
                className='post-comment'
                type='text'
                name='category'
                placeholder='Category'
                defaultValue={ post.category }
                onChange={this.handleInputChange}
              /><br />
              <input
                className='post-comment'
                type='text'
                name='body'
                placeholder='Body'
                defaultValue={ post.body }
                onChange={this.handleInputChange}
              /><br />
              <button
                className='btn btn-default'
                onClick={ onRequestClose }
                >
                  Cancel
              </button>
              <button
                className='btn btn-success'
                onClick={() => this.submitEdit({
                  author: post.author,
                  body: post.body,
                  category: post.category,
                  title: post.title,
                  id: post.id
              })}
                >
                  Edit Post
              </button>
          </Modal>
        );
    };
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editPost: (content) => dispatch(editPost(content)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);

