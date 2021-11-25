export const API_URL = "http://localhost:5000/";

export const AUTHENTICATION_PREFIX = API_URL + "Authentication/";
export const USER_PREFIX = API_URL + "User/";
export const VAULT_PREFIX = API_URL + "Vault/";
export const PRODUCT_PREFIX = API_URL + "Product/";
export const CATEGORY_PREFIX = API_URL + "Category/";

export const AUTHENTICATE = "Authenticate";
export const GET_USER_INFO = "GetUserInfo";
export const GET_NOW_VAULT = "GetNowVault";
export const GET_INCOME = "GetTotalInCome";
export const GET_EXPENSE = "GetTotalExpense";
export const RECEIVED = "ReceivedMoney";
export const ADD_PRODUCT = "AddProduct";
export const GET_CATEGORIES = "GetCategories";
export const GET_PRODUCTS = "GetProducts";

export const API_LOGIN = AUTHENTICATION_PREFIX + AUTHENTICATE;
export const API_GET_USER_INFO = USER_PREFIX + GET_USER_INFO;
export const API_GET_NOW_VAULT = VAULT_PREFIX + GET_NOW_VAULT;
export const API_GET_INCOME = VAULT_PREFIX + GET_INCOME;
export const API_GET_EXPENSE = VAULT_PREFIX + GET_EXPENSE;
export const API_GET_RECEIVED = VAULT_PREFIX + RECEIVED;
export const API_ADD_PRODUCT = PRODUCT_PREFIX + ADD_PRODUCT;
export const API_GET_CATEGORIES = CATEGORY_PREFIX + GET_CATEGORIES;
export const API_GET_PRODUCTS = PRODUCT_PREFIX + GET_PRODUCTS;
