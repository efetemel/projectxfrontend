import RootReducer from "./RootReducer";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export default createStore(
    RootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)