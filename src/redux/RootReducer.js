import { combineReducers } from "redux";
import AuthReducers from "./reducers/AuthReducers";
import VaultReducers from "./reducers/VaultReducers";

export default combineReducers ({
    auth:AuthReducers,
    vault:VaultReducers
})