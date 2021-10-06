const initHome = {
        product: [],
        inCategory: [],
        onDiscount: [],
    };

export const homeReducer = (state = initHome, action) => {

    if (action.type === 'SET_PRODUCT') {
        return {
            ...state,
            product: action.value,
        };
    }
    if (action.type === 'SET_INCATEGORY') {
        return {
            ...state,
            inCategory: action.value,
        };
        
    }
    if (action.type === 'SET_ONDISCOUNT') {
        return {
            ...state,
            onDiscount: action.value,
        };
    }

    return state;
};
