import { combineReducers } from "redux";
import {registerReducer, loginReducer, photoReducer} from './auth';
import {globalReducer} from './global';
import {homeReducer} from './home';
import { orderReducer } from "./order";

const reducer = combineReducers({
    registerReducer, 
    loginReducer,
    photoReducer,
    globalReducer, 
    homeReducer, 
    orderReducer
});

export default reducer;