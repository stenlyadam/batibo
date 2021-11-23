const initOrder = {
    orderFromDetail:false,
    orderTemp: {},
    order: [],
    onProcess: [],
    history: [],
    // checkoutAddress: [],
    selectedAddress: [],
    coordinates: {latitude: 0, longitude: 0, distance: 0},
    ongkir: 0
};

export const orderReducer = (state = initOrder, action) => {
    if (action.type === 'SET_ORDER_FROM_DETAIL'){
        return {
            ...state,
            orderFromDetail: action.value,
            
        }   
    }
    if (action.type === 'SET_ORDER_TEMP'){
        return {
            ...state,
            orderTemp: action.value,
            
        }   
    }
    if (action.type === 'SET_ORDER'){
        return {
            ...state,
            order: action.value,
            
        }   
    }
    if (action.type === 'SET_ON_PROCESS'){
        return {
            ...state,
            onProcess: action.value,
            
        }   
    }
    if (action.type === 'SET_HISTORY'){
        return {
            ...state,
            history: action.value,
            
        }   
    }
    // if (action.type === 'SET_CHECKOUT_ADDRESS'){
    //     return {
    //         ...state,
    //         checkoutAddress: action.value,
            
    //     }   
    // }
    if (action.type === 'SET_SELECTED_ADDRESS'){
        return {
            ...state,
            selectedAddress: action.value,
            
        }   
    }
    if (action.type === 'SET_COORDINATES'){
        return {
            ...state,
            coordinates: action.value,
            
        }   
    }
    if (action.type === 'SET_ONGKIR'){
        return {
            ...state,
            ongkir: action.value,
            
        }   
    }
    return state;
}