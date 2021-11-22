import {LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS, USER_LOAD_FAILED, USER_LOADED, USER_LOADING} from "../InitialValues";
import axios from "axios";
import {API_GET_USER_INFO, API_LOGIN} from "../../settings/ApiSettings";

export const getState = () => {
    const key = localStorage.getItem("jwtKey");
    if (key != null && key != "" && key != undefined){
        return key;
    }
    return false;
}

export const loadUser = () => {
    return (dispatch) => {

        dispatch({ type: USER_LOADING });
        const state = getState();

        if (state != false){
            axios.defaults.headers.common['Authorization'] = "Bearer " + state;
            axios.get(API_GET_USER_INFO)
                .then((res) => {
                    return dispatch({ type: USER_LOADED, payload:res.data });
                })
                .catch((err) => {
                    console.log("Hata => "+err.message);
                    return dispatch({ type: USER_LOAD_FAILED });
                });
        }
        else{
            return dispatch({ type: USER_LOAD_FAILED });
        }
    }
}

export const loginUser = (authRequest) => {
    return (dispatch) => {
        dispatch({type:LOGIN_LOADING});
        axios.post(API_LOGIN,authRequest)
            .then((res) => {
                console.log("Giriş işlemi başarılı!")
                return dispatch({ type: LOGIN_SUCCESS, payload: res.data })
            })
            .catch((err) => {
                console.log("Giriş işlemi başarısız!")
                return dispatch({ type: LOGIN_FAIL, payload: err })
            })
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        return dispatch({type:USER_LOAD_FAILED});
    }
}