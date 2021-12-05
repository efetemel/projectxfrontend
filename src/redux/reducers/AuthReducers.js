import {LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS, USER_LOAD_FAILED, USER_LOADED, USER_LOADING} from "../InitialValues";

const initialState = {
    isUserLoading:false,
    isLoginLoading:false,
    isAuthentication:false,
    user:null,
}

export default function (state = initialState,action){
    switch (action.type){
        case USER_LOADING:
            return {
                ...state,
                isUserLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isUserLoading: false,
                user: action.payload,
                isAuthentication: true
            }
        case USER_LOAD_FAILED:
            localStorage.clear();
            return {
                ...state,
                isUserLoading: false,
                isAuthentication: false,
                user: null
            }
        case LOGIN_LOADING:
            return {
                ...state,
                isLoginLoading: true
            }
        case LOGIN_SUCCESS:
            localStorage.setItem("jwtKey",action.payload.token);
            return {
                ...state,
                isLoginLoading: false,
                isAuthentication: true
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isLoginLoading: false
            }
        default:
            return state;
    }
}