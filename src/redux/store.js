import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk'
import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(thunk));

export default store;


// import {firebase} from '../config';

// const initialState = {
//     loading: false,
//     user: {},
//     product: [],
//     cart: [],

// }

// const reducer = (state = initialState, action) => {
//     switch(action.type){
        
//         case 'SET_LOADING' : 
//             return {
//                 ...state,
//                 loading: action.value
//             };
    
//         case 'PUSH_CART':
//             // console.log("PUSH_CART: ", action.value)
//             let status = false;
//             state.cart.map((item) => {
//                 if(item.id === action.value.id){
//                     status = true;
//                     console.log('data sudah ada');
//                 }
//             })

//             if (status === false){
//                 console.log('data belum ada');
//                 return {
//                     ...state,
//                     cart: [...state.cart, action.value]
                    
//                 }
//             }

//         case 'DELETE_CART':
//             console.log("DELETE_CART: ", action.value)
//             let tempCart = state.cart

//             for (let i = 0; i < tempCart.length; i++) {
//                 let obj = tempCart[i];
            
//                 if (obj.id === action.value.itemId) {
//                     tempCart.splice(i, 1);
//                 }
//             }
//             return {
//                 ...state,
//                 cart: tempCart
//             }
//         case 'CLEAR_CART':
//             return {
//                 ...state,
//                 cart: []
//             }
//         case 'UPDATE_COUNT_INCREMENT':
//             console.log('hello');
//             let tempCart2 = state.cart
//             tempCart2.map((item) => {
//                 if(item.id === action.value.itemId){
//                     item.count += 1;
                    
//                 }
//             })
//             return {
//                 ...state,
//                 cart: tempCart2
//             }
//         case 'UPDATE_COUNT_DECREMENT':
//             let tempCart3 = state.cart
//             tempCart3.map((item) => {
//                 if(item.id === action.value.itemId){
//                     item.count -= 1;
//                 }
//             })
//             return {
//                 ...state,
//                 cart: tempCart3
//             }
//         case 'SAVE_USER':
//             console.log("SAVE_USER: ", action.value)
//             return {
//                 ...state,
//                 user: action.value,
//             }
//         default:
//             return state;
//     }
// }

// const store = createStore(reducer)

// store.subscribe(() => {
//     console.log('store change: ', store.getState())
// })

// export default store;