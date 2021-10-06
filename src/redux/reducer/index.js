import { combineReducers } from "redux";
import {registerReducer, loginReducer} from './auth';
import {globalReducer} from './global';
import {homeReducer} from './home';
import { orderReducer } from "./order";

const reducer = combineReducers({
    registerReducer, 
    loginReducer, 
    globalReducer, 
    homeReducer, 
    orderReducer
});

export default reducer;