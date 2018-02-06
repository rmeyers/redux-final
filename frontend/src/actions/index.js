import axios from 'axios';

const URL = 'http://localhost:3001';
axios.defaults.headers.common['Authorization'] = 'Ryan';
export const GET_POSTS = 'GET_POSTS'
export const GET_COMMENTS = 'GET_COMMENTS'

export const getPosts = () => dispatch => {
    axios.get(URL + `/posts`).then(result => dispatch(getPostsSuccess(result)))
}

export const getComments = (postId) => dispatch => {
    if (postId !== '') {
        axios.get(URL + `/posts/` + postId + `/comments`)
            .then(result => dispatch(getCommentsSuccess(result))
                )
        }
}


export const incRating = (postId) => dispatch => {
    axios.post(URL + `/posts/` + postId,
        {'option': 'upVote'})
        .then(result =>
            dispatch(getPosts())
        )
}

export const decRating = (postId) => dispatch => {
    axios.post(URL + `/posts/` + postId,
        {'option': 'downVote'})
        .then(result =>
            dispatch(getPosts())
        )
}

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

export const deletePost = (postId) => dispatch => {
    axios.delete(URL + `/posts/` + postId)
        .then(result =>
            dispatch(getPosts())
        )
}

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

export const deleteComment = (content) => dispatch => {
    axios.delete(URL + '/comments/' + content.id)
    .then(result =>
        dispatch(getComments(content.parentId)))
}

export const upvoteComment = (commentId) => dispatch => {
    console.log("Upvote comment")
}

export const downvoteComment = (commentId) => dispatch => {
    console.log("Downvote comment")
}

export const getPostsSuccess = result => {
    return {
        type: GET_POSTS,
        payload: result.data
    }
}

export const filterAndOrder = (result) => {
    return getCommentsSuccess(result)
}

export const getCommentsSuccess = result => {
    return {
        type: GET_COMMENTS,
        payload: result.data
    }
}


