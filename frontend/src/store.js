import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import postsReducer from "./reducers/postsReducer";
import commentsReducer from "./reducers/commentsReducer";

export default createStore(
    combineReducers({
        postsReducer,
        commentsReducer
    }),
    {},
    applyMiddleware(thunk)
);
