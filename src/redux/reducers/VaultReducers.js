import {
    EXPENSE_LOADED,
    EXPENSE_LOADING,
    INCOME_LOADED,
    INCOME_LOADING,
    NOW_VAULT_LOADED,
    NOW_VAULT_LOADING, RECEIVED_LOADED, RECEIVED_LOADING
} from "../InitialValues";

const initialState = {
    isNowVaultLoading : false,
    isInComeLoading : false,
    isExpenseLoading : false,
    isReceivedLoading : false,
    nowVault : null,
    inCome : null,
    expense : null,
    received : null
}

export default function (state = initialState,action){
    switch (action.type){
        case NOW_VAULT_LOADING:
            return {
                ...state,
                isNowVaultLoading: true
            }
        case NOW_VAULT_LOADED:
            return {
                ...state,
                isNowVaultLoading: false,
                nowVault: action.payload
            }
        case INCOME_LOADING:
            return {
                ...state,
                isInComeLoading: true,
            }
        case INCOME_LOADED:
            return {
                ...state,
                isInComeLoading: false,
                inCome: action.payload
            }
        case EXPENSE_LOADING:
            return {
                ...state,
                isExpenseLoading: true,
            }
        case EXPENSE_LOADED:
            return {
                ...state,
                isExpenseLoading: false,
                expense: action.payload
            }
        case RECEIVED_LOADING:
            return {
                ...state,
                isReceivedLoading: true
            }
        case RECEIVED_LOADED:
            return {
                ...state,
                isReceivedLoading: false,
                received: action.payload
            }
        default:
            return state;
    }
}