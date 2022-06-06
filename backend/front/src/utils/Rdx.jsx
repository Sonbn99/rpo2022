import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import Utils from "./Utils";

// ACTIONS

const alertConstants = {
    ERROR: "ERROR",
    CLEAR: "CLEAR",
};
export const alertActions = {
    error,
    clear,
};

function error(msg) {
    return { type: alertConstants.ERROR, msg };
}
function clear() {
    return { type: alertConstants.CLEAR };
}

const userConstants = {
    LOGIN: "USER_LOGIN",
    LOGOUT: "USER_LOGOUT",
};
export const userActions = {
    login,
    logout,
};
function login(user) {
    Utils.saveUser(user);
    return { type: userConstants.LOGIN, user };
}
function logout() {
    Utils.removeUser();
    return { type: userConstants.LOGOUT };
}
// REDUCERS

function alert(state = {}, action) {
    switch (action.type) {
        case alertConstants.ERROR:
            return { msg: action.msg };
        case alertConstants.CLEAR:
            return {};
        default:
            return state;
    }
}

let user = Utils.getUser();
const initialState = user ? { user } : {};

function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN:
            return { user: action.user };
        case userConstants.LOGOUT:
            return {};
        default:
            return state;
    }
}
//Store
const rootReducer = combineReducers({
    authentication,
    alert,
});
const loggerMiddleware = createLogger();
export const store = createStore(
    rootReducer,
    applyMiddleware(loggerMiddleware)
);