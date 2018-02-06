import React, { Component } from 'react'
import { Media } from 'react-bootstrap'
import Modal from 'react-modal';

class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      commentModal: false,
      deleteModal: false,
      body: '',
      author: '',
      id: '',
      parentId: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  openCommentModal = (comment) => {
    this.setState(() => ({
      commentModal: true,
      body: comment.body,
      author: comment.author,
      id: comment.id,
      parentId: comment.parentId
    }))
  }

  closeCommentModal = () => {
    this.setState(() => ({
      commentModal: false
    }))
  }

  submitComment = () => {
    this.setState(() => ({
      commentModal: false
    }))
    this.props.editComment(this.state)
  }

  handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      })
    }

  openDeleteModal = (comment) => {
    this.setState(() => ({
      deleteModal: true,
      body: comment.body,
      author: comment.author,
      id: comment.id,
      parentId: comment.parentId
    }))
  }

  closeDeleteModal = () => {
    this.setState(() => ({
      deleteModal: false
    }))
  }

  deleteComment = () => {
    this.setState(() => ({
      deleteModal: false
    }))
    this.props.deleteComment(this.state)
  }

  render() {
    const comments = this.props.comments
    const { commentModal, deleteModal, body, author } = this.state

    if (comments === undefined || comments.length === 0) {
      return (
        <h4>No comments for this post</h4>
      )
    } else {
      return (
        <div>
        { comments.map((comment) => (
          <div key={ comment.id }>
            <Media className="post">
              <Media.Body>
                <div className="row">
                  <div className="col-sm-9">
                    <p>{ comment.body }</p>
                    <p>Comment by: { comment.author }</p>
                  </div>
                  <div className="col-sm-3 post-info">
                    <button
                      className="btn btn-info"
                      onClick={() => this.openCommentModal(comment)}
                      >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.openDeleteModal(comment)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Media.Body>
            </Media>
          </div>
        ))}

        <Modal
            className='newModal'
            overlayClassName='overlay'
            isOpen={ commentModal }
            onRequestClose={this.closeCommentModal}
            contentLabel='Modal'
            ariaHideApp={false}
          >
            <h3>
              Edit Comment
            </h3>
            <input
              className='post-comment'
              type='text'
              name='body'
              placeholder='E.g., "This was the best post ever!"'
              defaultValue={ body }
              onChange={this.handleInputChange}
            /><br />
            <input
              className='post-comment'
              type='text'
              name='author'
              placeholder='E.g., "John Doe"'
              defaultValue={ author }
              onChange={this.handleInputChange}
            /><br />
            <button
              className='btn btn-default'
              onClick={this.closeCommentModal}
              >
                Cancel
            </button>
            <button
              className='btn btn-success'
              onClick={() => this.submitComment()}
              >
                Update Comment
            </button>
          </Modal>

          <Modal
            className='deleteModal'
            overlayClassName='overlay'
            isOpen={ deleteModal }
            onRequestClose={this.closeDeleteModal}
            contentLabel='Modal'
            ariaHideApp={false}
          >
              <h3>
                Are you sure you want to delete this post?
              </h3>
              <button
                className='btn btn-default'
                onClick={this.closeDeleteModal}
                >
                  Cancel
              </button>
              <button
                  className="btn btn-danger"
                  onClick={() => this.deleteComment()}
                >
                  Yes, delete post
              </button>
          </Modal>

        </div>
      );
    }
  }
};

export default Comments
