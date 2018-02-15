import React, { Component } from 'react'
import {connect} from "react-redux";
import Modal from 'react-modal';
import { deletePost } from '../actions/index'

class DeleteModal extends Component {
    render() {
        const { isOpen, onRequestClose, postId } = this.props

        return (
            <Modal
              className='deleteModal'
              overlayClassName='overlay'
              isOpen={ isOpen }
              onRequestClose={ onRequestClose }
              contentLabel='Modal'
              ariaHideApp={false}
            >
                <h3>
                  Are you sure you want to delete this post?
                </h3>
                <button
                  className='btn btn-default'
                  onClick={ onRequestClose }
                  >
                    Cancel
                </button>
                <a href="/">
                    <button
                        className="btn btn-danger"
                        onClick={ () => this.props.deletePost(postId) }
                      >
                        Yes, delete post
                    </button>
                </a>
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
        deletePost: (postId) => dispatch(deletePost(postId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);

