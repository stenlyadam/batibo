const initOrder = {
    orderFromDetail:{},
    orderTemp: {},
    order: [],
    onProcess: [],
    history: [],
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
    return state;
}