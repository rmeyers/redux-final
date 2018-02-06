// Used axios as the HTTP request package
import axios from 'axios';

// Set default URL for backend server
const URL = 'http://localhost:3001';
// Just set the default authorization header to my name for now
axios.defaults.headers.common['Authorization'] = 'Ryan';

export const GET_POSTS = 'GET_POSTS'
export const GET_COMMENTS = 'GET_COMMENTS'

// Main function to pull all the posts from the DB and populate on landing page
export const getPosts = () => dispatch => {
    axios.get(URL + `/posts`).then(result => dispatch(getPostsSuccess(result)))
}

// Get all the comments for a specific post
export const getComments = (postId) => dispatch => {
    if (postId !== '') {
        axios.get(URL + `/posts/` + postId + `/comments`)
            .then(result => dispatch(getCommentsSuccess(result))
                )
        }
}

// Increase the rating of a post
export const incRating = (postId) => dispatch => {
    axios.post(URL + `/posts/` + postId,
        {'option': 'upVote'})
        .then(result =>
            dispatch(getPosts())
        )
}

// Decrease the rating of a post
export const decRating = (postId) => dispatch => {
    axios.post(URL + `/posts/` + postId,
        {'option': 'downVote'})
        .then(result =>
            dispatch(getPosts())
        )
}

// Create a new post
export const createPost = (content) => dispatch => {
    axios.post(URL + `/posts/`,
        {'id': Math.random().toString(36).substr(2, 10),
         'timestamp': Date.now(),
         'title': content.title,
         'body': content.body,
         'author': content.author,
         'category': content.category.toLowerCase()})
        .then(result =>
            dispatch(getPosts())
        )
}

// Edit a post
export const editPost = (content) => dispatch => {
    axios.put(URL + `/posts/` + content.id,
        {
            'title': content.title,
            'body': content.body,
            'category': content.category,
            'author': content.author,
            'timestamp': Date.now()
        })
}

// Delete a post
export const deletePost = (postId) => dispatch => {
    axios.delete(URL + `/posts/` + postId)
        .then(result =>
            dispatch(getPosts())
        )
}

// Add a comment to a specific post
export const addComment = (content) => dispatch => {
    axios.post(URL + `/comments`,
        {
            'id': Math.random().toString(36).substr(2, 10),
            'timestamp': Date.now(),
            'body': content.body,
            'author': content.author,
            'parentId': content.postId
        })
    .then(result =>
        dispatch(getComments(content.postId))
    )
}

// Edit a comment for a post
export const editComment = (content) => dispatch => {
    axios.put(URL + `/comments/` + content.id,
        {
            'timestamp': Date.now(),
            'body': content.body,
            'author': content.author
        })
    .then(result =>
        dispatch(getComments(content.parentId)))
}

// Delete a comment for a post
export const deleteComment = (content) => dispatch => {
    axios.delete(URL + '/comments/' + content.id)
    .then(result =>
        dispatch(getComments(content.parentId)))
}

// These two functions are currently unused.
export const upvoteComment = (commentId) => dispatch => {
    console.log("Upvote comment")
}

export const downvoteComment = (commentId) => dispatch => {
    console.log("Downvote comment")
}

// If getting the posts was successful, dispatch on to reducer.
export const getPostsSuccess = result => {
    return {
        type: GET_POSTS,
        payload: result.data
    }
}

// If getting the comments was successful, dispatch on to reducer.
export const getCommentsSuccess = result => {
    return {
        type: GET_COMMENTS,
        payload: result.data
    }
}


