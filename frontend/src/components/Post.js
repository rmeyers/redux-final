import React, { Component } from 'react'
import { Media } from 'react-bootstrap'
import {connect} from "react-redux";
import { Link } from 'react-router-dom'
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { getComments } from '../actions/index'

class Post extends Component {
    state = {
      deleteModal: false,
      editModal: false
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

    render () {
      const post = this.props.thisPost
      const { deleteModal, editModal } = this.state

      // Note to self: This 'new' looks like it's required so it doesn't read the current time.
      const date = new Date(post.timestamp).toString()

      return (
        <div>
          <Media className="post">
            <Media.Body>
              <div className="row">
                <div className="col-sm-9">
                  <Link to={"/" + post.category + "/" + post.id}><Media.Heading>{ post.title }</Media.Heading></Link>
                  <p>By { post.author }</p>
                  <p>
                    { post.body }
                  </p>
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
                <div className="col-sm-3 post-info">
                  <p>{ date }</p>
                  <p>
                    <button className="btn" onClick={() => this.props.decRating(post.id)}>-</button>
                      { post.voteScore }
                    <button className="btn" onClick={() => this.props.incRating(post.id)}>+</button>
                  </p>
                </div>
              </div>
            </Media.Body>
          </Media>

          <EditModal
            isOpen={ editModal }
            post={ post }
            onRequestClose={this.closeEditModal}
          />

          <DeleteModal
            isOpen={ deleteModal }
            onRequestClose={this.closeDeleteModal}
            closeModal={this.closeDeleteModal}
            postId={ post.id }
          />
        </div>
      );
    };
};

// Can pass state or either of the reducers in here.
const mapStateToProps = (commentsReducer) => {
  return {
      comments: commentsReducer.comments
  };
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getComments: (postId) => dispatch(getComments(postId)),
//     }
// };

// Rather than have the above mapDispatchToProps function, can
// simply directly add getComments to props using this ES6 approach
export default connect(mapStateToProps, { getComments })(Post);

