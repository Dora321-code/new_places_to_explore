import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';
import authReducer from './reducers/auth';
import placeReducers from "./reducers/placeReducers";

const rootReducer = combineReducers({
    auth:authReducer,
    places:placeReducers

})

export default store = createStore(rootReducer, applyMiddleware(ReduxThunk))