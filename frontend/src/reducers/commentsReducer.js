const commentsReducer = (state = {}, action) => {

    switch (action.type) {
        case 'GET_COMMENTS':
            state = {
                ...state,
                comments: action.payload
            };
            break;
        default:
            return state;
    }
    return state;
};

export default commentsReducer;