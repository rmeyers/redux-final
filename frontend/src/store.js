import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import catReducer from "./reducers/catReducer";
import postsReducer from "./reducers/postsReducer";

export default createStore(
    combineReducers({
        catReducer,
        postsReducer
    }),
    {},
    applyMiddleware(thunk)
);
