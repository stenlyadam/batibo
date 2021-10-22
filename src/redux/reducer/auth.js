const initStateRegister = {
    name : '',
    email: '',
    password: '',
    password_confirmation: '',
    phone_number: '',
}

const initStateLogin = {
    token: {},
    user: {},
    address: [],
    cart: [],
    checkout: [],
}

const initPhoto = {
    uri: '',
    type: '',
    name: '',
    isUploadPhoto: false,
};

export const registerReducer = (state = initStateRegister, action) => {
    if(action.type === 'SET_REGISTER'){
        return{
            ...state,
            name: action.value.name,
            email: action.value.email,
            password: action.value.password,
            password_confirmation: action.value.password,
            phone_number: action.value.phone_number,
        }
    }
    
    return state;
}

export const loginReducer = (state = initStateLogin, action) => {
    if(action.type === 'SET_TOKEN'){
        return{
            ...state,
            token: action.value,
        }
    }
    if(action.type === 'SET_USER'){
        return{
            ...state,
            user: action.value,
        }
    }
    if(action.type === 'SET_ADDRESS'){
        return{
            ...state,
            address: action.value,
        }
    }
    if(action.type === 'SET_CART'){
        return{
            ...state,
            cart: action.value,
        }
    }
    if(action.type === 'SET_CHECKOUT'){
        return{
            ...state,
            checkout: action.value,
        }
    }
    return state;
}

export const photoReducer = (state = initPhoto, action) => {
    if (action.type === 'SET_PHOTO') {
        return {
            ...state,
            uri: action.value.uri,
            type: action.value.type,
            name: action.value.name,
        };
    }
    if (action.type === 'SET_UPLOAD_STATUS') {
        return {
            ...state,
            isUploadPhoto: action.value,
        };
    }
    return state;
};