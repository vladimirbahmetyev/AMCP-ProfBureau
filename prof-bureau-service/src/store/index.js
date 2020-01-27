import { createStore } from "redux";
import reducer from "../reducers";

const initialState = { 
    comission: 'Профбюро',
    page: 'main',
    isAuthorized: false,
    login: '',
    course: 0,
    stNum: 0,
    responseData: JSON.stringify('')
};
export const store = createStore(reducer, initialState);