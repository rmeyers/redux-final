import React, { Component } from 'react'
import {connect} from "react-redux";
import Modal from 'react-modal';
import { getPosts, getComments, incRating, decRating, addComment, deletePost } from '../actions/index'
import { editComment, deleteComment, upvoteComment, downvoteComment, editPost } from '../actions/index'
import Comments from "./Comments";

class PostDetail extends Component {
    constructor(props) {
      super(props);
      this.state = {
        commentModal: false,
        deleteModal: false,
        editModal: false,
        commentAuthor: '',
        commentBody: '',
        postId: '',
        author: '',
        body: '',
        category: '',
        title: '',
        date: ''
      };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleCommentInputChange = this.handleCommentInputChange.bind(this);
    }

    componentWillMount = () => {
        const id = this.props.match.params.post_id
        this.props.getComments(id)

        var post = {title: '', author: '', category: '', voteScore: 0, body: '', id:''};
        var date = ''
        if (this.props.posts !== undefined && this.props.posts.length > 0) {
            post = this.props.posts.find(function(element) {
                return element.id === id
            })
            date = Date(post.timestamp).toString()
        }

        this.setState({
            post: post,
            date: date
        })
    }

    handleCommentInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      })
    }

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

    openCommentModal = () => {
        this.setState(() => ({
            commentModal: true
        }))
    }

    closeCommentModal = () => {
        this.setState(() => ({
            commentModal: false
        }))
    }

    submitComment = (content) => {
        this.setState(() => ({
            commentModal: false
        }))
        this.props.addComment(content)
    }

    openEditModal = () => {
        this.setState(() => ({
            editModal: true
        }))
    }

    closeEditModal = () => {
        this.setState(() => ({
            editModal: false
        }))
    }

    submitEdit = (content) => {
        this.setState(() => ({
            editModal: false
        }))

        this.props.editPost(content)
    }

    openDeleteModal = () => {
        this.setState(() => ({
            deleteModal: true
        }))
    }

    closeDeleteModal = () => {
        this.setState(() => ({
            deleteModal: false
        }))
    }

    render() {
        const { commentModal, deleteModal, editModal, post } = this.state
        const id = this.props.match.params.post_id

        if (this.props.posts !== undefined && this.props.posts.length > 0) {
            var votePost = this.props.posts.find(function(element) {
                return element.id === id
            })
            var score = votePost.voteScore
            var date = new Date(votePost.timestamp).toString()
        }

        return (
            <div>
                <div className="container">
                  <div className="row">
                    <div className="col-sm-9">
                      <h1>{ post.title }</h1>
                      <h3>{ post.author }</h3>
                      <p>
                        { post.body }
                      </p>
                    </div>
                    <div className="col-sm-3 post-info">
                      <p>{ date }</p>
                      <p>
                        Rating: <button className="btn" onClick={() => this.props.decRating(post.id)}>-</button>
                          { score }
                        <button className="btn" onClick={() => this.props.incRating(post.id)}>+</button>
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-9">
                      <button className="btn btn-primary" onClick={this.openCommentModal}>Add Comment</button>
                    </div>
                    <div className="col-sm-3 post-info">
                        <button
                            className="btn btn-info"
                            onClick={this.openEditModal}
                        >
                            Edit Post
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={this.openDeleteModal}
                        >
                            Delete Post
                        </button>
                    </div>
                  </div>
                  <hr />
                  <h4>Comments</h4>
                  <Comments
                    comments={ this.props.comments }
                    editComment={ (content) => this.props.editComment(content)}
                    deleteComment={ (content) => this.props.deleteComment(content)}
                  />
                </div>


                <Modal
                  className='newModal'
                  overlayClassName='overlay'
                  isOpen={ commentModal }
                  onRequestClose={this.closeCommentModal}
                  contentLabel='Modal'
                  ariaHideApp={false}
                >
                    <h3>
                      Add Comment
                    </h3>
                    <input
                      className='post-comment'
                      type='text'
                      name='commentBody'
                      placeholder='E.g., "This was the best post ever!"'
                      onChange={this.handleCommentInputChange}
                    /><br />
                    <input
                      className='post-comment'
                      type='text'
                      name='commentAuthor'
                      placeholder='E.g., "John Doe"'
                      onChange={this.handleCommentInputChange}
                    /><br />
                    <button
                      className='btn btn-default'
                      onClick={this.closeCommentModal}
                      >
                        Cancel
                    </button>
                    <button
                      className='btn btn-success'
                      onClick={() => this.submitComment({
                        author: this.state.commentAuthor,
                        body: this.state.commentBody,
                        postId: post.id
                    })}
                      >
                        Add Comment
                    </button>
                </Modal>

                <Modal
                  className='editModal'
                  overlayClassName='overlay'
                  isOpen={ editModal }
                  onRequestClose={this.closeEditModal}
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
                      onClick={this.closeEditModal}
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
                    <a href="/">
                        <button
                            className="btn btn-danger"
                            onClick={() => this.props.deletePost(post.id)}
                          >
                            Yes, delete post
                        </button>
                    </a>
                </Modal>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
  return {
      posts: state.postsReducer.posts,
      comments: state.commentsReducer.comments
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: () => dispatch(getPosts()),
        getComments: (postId) => dispatch(getComments(postId)),
        incRating: (postId) => dispatch(incRating(postId)),
        decRating: (postId) => dispatch(decRating(postId)),
        addComment: (content) => dispatch(addComment(content)),
        deletePost: (postId) => dispatch(deletePost(postId)),
        editPost: (content) => dispatch(editPost(content)),
        editComment: (content) => dispatch(editComment(content)),
        deleteComment: (content) => dispatch(deleteComment(content)),
        upvoteComment: (commentId) => dispatch(upvoteComment(commentId)),
        downvoteComment: (commentId) => dispatch(downvoteComment(commentId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);

