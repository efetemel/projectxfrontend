import {
    EXPENSE_LOADED,
    EXPENSE_LOADING,
    INCOME_LOADED,
    INCOME_LOADING,
    LOGIN_LOADING,
    NOW_VAULT_LOADED,
    NOW_VAULT_LOADING, RECEIVED_LOADED, RECEIVED_LOADING
} from "../InitialValues";
import axios from "axios";
import {API_GET_EXPENSE, API_GET_INCOME, API_GET_NOW_VAULT, API_GET_RECEIVED} from "../../settings/ApiSettings";

export const getNowVault = () => {
    return (dispatch) => {
        dispatch({type:NOW_VAULT_LOADING});
        axios.get(API_GET_NOW_VAULT)
            .then((res) => {
                dispatch({type:NOW_VAULT_LOADED, payload:res.data});
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}

export const getInCome = () => {
    return (dispatch) => {
        dispatch({type:INCOME_LOADING});
        axios.get(API_GET_INCOME)
            .then((res) => {
                dispatch({type:INCOME_LOADED, payload:res.data});
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}

export const getExpense = () => {
    return (dispatch) => {
        dispatch({type:EXPENSE_LOADING});
        axios.get(API_GET_EXPENSE)
            .then((res) => {
                dispatch({type:EXPENSE_LOADED, payload:res.data});
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}

export const getReceived = () => {
    return (dispatch) => {
        dispatch({type:RECEIVED_LOADING});
        axios.get(API_GET_RECEIVED)
            .then((res) => {
                dispatch({type:RECEIVED_LOADED, payload:res.data});
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}

