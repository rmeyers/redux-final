import React, { Component } from 'react'
import {connect} from "react-redux";
import Modal from 'react-modal';
import { getPosts, getComments, incRating, decRating, addComment, upvoteComment, downvoteComment } from '../actions/index'
import { editComment, deleteComment } from '../actions/index'
import Comments from "./Comments";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import NoMatch from "./PageNotFound";

class PostDetail extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // Modal states, default start closed
        commentModal: false,
        deleteModal: false,
        editModal: false,

        // Variables for comment and post information
        commentAuthor: '',
        commentBody: '',
        postId: '',
        post: {},
        date: ''
      };

      // Bind two functions here so they have access to this.state, I think?
      this.handleCommentInputChange = this.handleCommentInputChange.bind(this);
    }

    componentWillMount = () => {
        this.props.getPosts()
    }

    // Changes local state for comment info as it's changed
    handleCommentInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
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
        const { commentModal, deleteModal, editModal } = this.state
        const id = this.props.match.params.post_id
        var post = {title: '', author: '', category: '', voteScore: 0, body: '', id:''};
        var date = ''

        if (this.props.posts !== undefined && this.props.posts.length > 0) {
            post = this.props.posts.find(function(element) {
                return element.id === id
            })
            if (post === undefined) {
              return (
                <NoMatch />
              )
            }
            var score = post.voteScore
            date = new Date(post.timestamp).toString()
        }

        this.props.getComments(id)

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
                    upvoteComment={(commentId) => this.props.upvoteComment(commentId)}
                    downvoteComment={(commentId) => this.props.downvoteComment(commentId)}
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

                <EditModal
                  isOpen={ editModal }
                  post={ post }
                  onRequestClose={this.closeEditModal}
                />

                <DeleteModal
                  isOpen={ deleteModal }
                  postId={ post.id }
                  onRequestClose={this.closeDeleteModal}
                />
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
        editComment: (content) => dispatch(editComment(content)),
        deleteComment: (content) => dispatch(deleteComment(content)),
        upvoteComment: (commentId) => dispatch(upvoteComment(commentId)),
        downvoteComment: (commentId) => dispatch(downvoteComment(commentId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);

