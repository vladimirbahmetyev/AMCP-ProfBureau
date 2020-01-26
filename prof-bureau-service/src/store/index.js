import { createStore } from "redux";
import reducer from "../reducers";

const initialState = { comission: 'Профбюро' };
export const store = createStore(reducer, initialState);