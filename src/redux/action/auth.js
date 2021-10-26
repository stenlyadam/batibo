import axios from "axios";
import { API_HOST } from "../../config";
import { showMessage, storeData } from "../../utils";
import {setLoading} from './global';

export const userAuthAction = (resToken, navigation) => (dispatch) => {
    
    const token = resToken.value;

    axios.get(`${API_HOST.url}/user`, {
        headers: {
            'Accept' : 'application/json',
            'Authorization' : token
        }
    })
    .then(res => {

        //simpan data user kedalam data reducer
        dispatch({type: 'SET_USER', value: res.data.data});
        //simpan data user kedalam data reducer
        dispatch({type: 'SET_TOKEN', value: token});

        //ambil data address
        axios.get(`${API_HOST.url}/address`, {
            headers: {
                'Accept' : 'application/json',
                'Authorization' : token
            }
        })
        //tarik data address for user - jika berhasil
        .then(resAddress => {
            //simpan data address user ke dalam data reducer
            dispatch({type: 'SET_ADDRESS', value: resAddress.data.data.data});

            axios.get(`${API_HOST.url}/cart`, {
                headers: {
                    'Accept' : 'application/json',
                    'Authorization' : token
                }
            })
            //tarik data cart dari user - jika berhasil
            .then(resCart => {
                //simpan data CART user ke dalam data reducer
                dispatch({type: 'SET_CART', value: resCart.data.data.data});

                 //ambil data order
                axios.get(`${API_HOST.url}/order`, {
                headers: {
                    'Accept' : 'application/json',
                    'Authorization' : token
                }
                })
                //ambil data order - jika berhasil
                .then(resOrder => {
                    //simpan data Order user ke dalam data reducer
                    dispatch({type: 'SET_ORDER', value: resOrder.data.data.data})
                    //pergi ke halaman utama aplikasi
                    navigation.reset({index: 0, routes: [{name: 'MainApp'}]})
                })
                //ambil data order - jika tidak berhasil
                .catch(errOrder => {
                    showMessage('Terjadi kesalahan pada API Order User');
                })

            })
            //tarik data cart dari user - jika tidak berhasil
            .catch((errCart) => {
                // console.log('tambah alamat berhasil : ', errAddress.response);
                showMessage('Terjadi kesalahan pada API Cart User');
            })
            
        })
        //tarik data address for user - jika tidak berhasil
        .catch((errAddress) => {
            // console.log('tambah alamat berhasil : ', errAddress.response);
            showMessage('Terjadi kesalahan pada API Address User');
        })
    })
    .catch((err) => {
        showMessage('Terjadi kesalahan pada API User');
    })

}

export const signUpAction = (dataRegister, addressRegister, navigation) => (dispatch) => {
    axios.post(`${API_HOST.url}/register`, dataRegister, {
        headers: {
            'Accept' : 'application/json'
        }
    })
    //register user - jika berhasil
    .then(res => {
        const profile = res.data.data.user;
        const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
        
        //simpan data user ke localstorage
        storeData('userProfile', profile);
        //simpan data token ke localstorage
        storeData('token', {value: token});
        addressRegister.user_id = res.data.data.user.id;
        //simpan data user kedalam data reducer
        dispatch({type: 'SET_USER', value: res.data.data.user});
        //simpan data user kedalam data reducer
        dispatch({type: 'SET_TOKEN', value: token});

        console.log('address data - user id: ', addressRegister);
        dispatch(setLoading(false));
        //add address for user
        axios.post(`${API_HOST.url}/address/add`, addressRegister, {
            headers: {
                'Accept' : 'application/json',
                'Authorization' : token
            }
        })
        //add address for user - jika berhasil
        .then(resAddAddress => {
            //tarik data address(update)
            axios.get(`${API_HOST.url}/address`, {
                headers: {
                    'Accept' : 'application/json',
                    'Authorization' : token
                }
            })
            //tarik data address(update) - jika berhasil
            .then(resAddress => {
                dispatch(setLoading(false));
                //simpan data address user ke dalam data reducer
                dispatch({type: 'SET_ADDRESS', value: resAddress.data.data.data});
                //tarik data cart dari user
                axios.get(`${API_HOST.url}/cart`, {
                    headers: {
                        'Accept' : 'application/json',
                        'Authorization' : token
                    }
                })
                //tarik data cart dari user - jika berhasil
                .then(resCart => {
                    dispatch(setLoading(false));
                    //simpan data CART user ke dalam data reducer
                    dispatch({type: 'SET_CART', value: resCart.data.data.data});
                    
                        //ambil data order
                        axios.get(`${API_HOST.url}/order`, {
                        headers: {
                            'Accept' : 'application/json',
                            'Authorization' : token
                        }
                        })
                        //ambil data order - jika berhasil
                        .then(resOrder => {
                            //simpan data Order user ke dalam data reducer
                            dispatch({type: 'SET_ORDER', value: resOrder.data.data.data})
                            //pergi ke halaman utama aplikasi
                            showMessage('Register Success', 'success');
                            setTimeout(() => dispatch(setLoading(true)), 1000);
                            setTimeout(() => navigation.reset({index: 0, routes: [{name: 'MainApp'}]}), 4000);
                            setTimeout(() => dispatch(setLoading(false)), 4000);
                        })
                        //ambil data order - jika tidak berhasil
                        .catch(errOrder => {
                            dispatch(setLoading(false));
                            showMessage('Terjadi kesalahan pada API Order User');
                        })
                    
                })
                //tarik data cart dari user - jika tidak berhasil
                .catch((errCart) => {
                    dispatch(setLoading(false));
                    // console.log('tambah alamat berhasil : ', errAddress.response);
                    showMessage('Terjadi kesalahan pada API Cart User');
                })
            })
            //tarik data address(update) - jika tidak berhasil
            .catch(errAddress => {
                console.log('Terjadi kesalahan : Harap dicoba beberapa saat lagi');
            })
        })
        //add address for user - jika tidak berhasil
        .catch((errAddAddress) => {
            dispatch(setLoading(false));
            // console.log('tambah alamat berhasil : ', errAddress.response);
            showMessage('Terjadi kesalahan : Harap dicoba beberapa saat lagi');
        })
        
    })
    //register user - jika tidak berhasil
    .catch(err => {
        dispatch(setLoading(false));
        console.log('error : ', err.response);
        showMessage(err?.response?.data?.errors?.email);
    })
}

export const signInAction = (form, navigation) => (dispatch) => {
    dispatch(setLoading(true));
    axios.post(`${API_HOST.url}/login`, form)
    .then(res => {
        const profile = res.data.data.user;
        const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
        
        //simpan data user ke localstorage
        storeData('userProfile', profile);
        //simpan data token ke localstorage
        storeData('token', {value: token});
        //simpan data user kedalam data reducer
        dispatch({type: 'SET_USER', value: res.data.data.user});
        //simpan data user kedalam data reducer
        dispatch({type: 'SET_TOKEN', value: token});

        axios.get(`${API_HOST.url}/address`, {
            headers: {
                'Accept' : 'application/json',
                'Authorization' : token
            }
        })
        //tarik data address for user - jika berhasil
        .then(resAddress => {
            //simpan data address user ke dalam data reducer
            dispatch({type: 'SET_ADDRESS', value: resAddress.data.data.data});

            axios.get(`${API_HOST.url}/cart`, {
                headers: {
                    'Accept' : 'application/json',
                    'Authorization' : token
                }
            })
            //tarik data cart dari user - jika berhasil
            .then(resCart => {
                dispatch(setLoading(false));
                //simpan data CART user ke dalam data reducer
                dispatch({type: 'SET_CART', value: resCart.data.data.data});
                
                 //ambil data order
                    axios.get(`${API_HOST.url}/order`, {
                    headers: {
                        'Accept' : 'application/json',
                        'Authorization' : token
                    }
                    })
                    //ambil data order - jika berhasil
                    .then(resOrder => {
                        //simpan data Order user ke dalam data reducer
                        dispatch({type: 'SET_ORDER', value: resOrder.data.data.data})
                        //pergi ke halaman utama aplikasi
                        showMessage('Login Success', 'success');
                        setTimeout(() => dispatch(setLoading(true)), 1000);
                        setTimeout(() => navigation.reset({index: 0, routes: [{name: 'MainApp'}]}), 4000);
                        setTimeout(() => dispatch(setLoading(false)), 4000);
                    })
                    //ambil data order - jika tidak berhasil
                    .catch(errOrder => {
                        dispatch(setLoading(false));
                        showMessage('Terjadi kesalahan pada API Order User');
                    })  

                
            })
            //tarik data cart dari user - jika tidak berhasil
            .catch((errCart) => {
                dispatch(setLoading(false));
                // console.log('tambah alamat berhasil : ', errAddress.response);
                showMessage('Terjadi kesalahan pada API Cart User');
            })
            
        })
        //tarik data address for user - jika tidak berhasil
        .catch((errAddress) => {
            dispatch(setLoading(false));
            // console.log('tambah alamat berhasil : ', errAddress.response);
            showMessage('Terjadi kesalahan pada API Address User');
        })
    })
    .catch(err => {
        console.log('error : ', err.response)
        dispatch(setLoading(false));
        showMessage(err?.response?.data?.meta?.message + ': Check your email and password again');
    })
}

export const addCartAction = (user, token, cart, toCart) => (dispatch) => {
    dispatch(setLoading(true));
    const addCartData = {
        user_id: user.id,
        product_id: toCart.id
    }

    const updateCartData = {
        user_id: user.id,
        product_id: toCart.id,
        quantity: '',
        total: '',
    }

    let checkCart = false;

    {cart.map(item => {
    //jika product ada dalam cart user
    if(item.product_id == toCart.id){
        checkCart = true;
        updateCartData.quantity = item.quantity + 1;
        updateCartData.total = toCart.price_after_discount * updateCartData.quantity;
        //update data product dalam database (cart)
        axios.post(`${API_HOST.url}/cart/${item.id}`, updateCartData, {
        headers: {
            'Accept' : 'application/json',
            'Authorization' : token,
        }
        })
        //update data product dalam database (cart) - jika berhasil
        .then(resCart => {
        //ambil data cart terbaru dari database
        axios.get(`${API_HOST.url}/cart`, {
            headers: {
            'Accept' : 'application/json',
            'Authorization' : token,
            }
        })
        //ambil data cart terbaru dari database - jika berhasil
        .then(resUpdateCart => {
            dispatch(setLoading(false));
            //simpan data CART user ke dalam data reducer
            dispatch({type: 'SET_CART', value: resUpdateCart.data.data.data});
            showMessage('Jumlah produk ini telah diperbaharui dalam keranjang anda', 'success');
        })
        //ambil data cart terbaru dari database - jika tidak berhasil
        .catch(errUpdateCart => {
            dispatch(setLoading(false));
            showMessage('Terjadi kesalahan pada penambahan data');
        })
        })
        //update data product ke database (cart) - jika tidak berhasil
        .catch((errCart) => {
            dispatch(setLoading(false));
            showMessage('Terjadi kesalahan pada penyimpanan data ke API Cart User');
        })
    }
    else{
        // console.log('kok tidak ada siii');
    }
    // console.log(' hallloooo jugaa ifff sudah di cek ? ', checkCart)
    })}    

    //jika product tidak ada dalam cart user
    if (checkCart == false) {
    //tambah data product ke database (cart)
    axios.post(`${API_HOST.url}/cart/add`, addCartData, {
        headers: {
            'Accept' : 'application/json',
            'Authorization' : token,
        }
    })
    //tambah data product ke database (cart) - jika berhasil
    .then(resCart => {
    //ambil data cart terbaru dari database
    axios.get(`${API_HOST.url}/cart`, {
        headers: {
        'Accept' : 'application/json',
        'Authorization' : token,
        }
    })
    //ambil data cart terbaru dari database - jika berhasil
    .then(resUpdateCart => {
        dispatch(setLoading(false));
        //simpan data CART user ke dalam data reducer
        dispatch({type: 'SET_CART', value: resUpdateCart.data.data.data});
        showMessage('Produk berhasil ditambahkan ke keranjang', 'success');
    })
    //ambil data cart terbaru dari database - jika tidak berhasil
    .catch(errUpdateCart => {
        dispatch(setLoading(false));
        showMessage('Terjadi kesalahan pada penambahan data');
    })
    })
    //tambah data product ke database (cart) - jika tidak berhasil
    .catch((errCart) => {
        dispatch(setLoading(false));
        showMessage('Terjadi kesalahan pada penyimpanan data ke API Cart User');
    })
    }
}

export const updateCartAction = (user, token, updateCount, itemId, productId, itemPrice, itemCount) => (dispatch) => {
    const updateCartData = {
        user_id: user.id,
        product_id: productId,
        quantity: '',
        total: '',
    }

        updateCartData.quantity = itemCount + updateCount;
        updateCartData.total = itemPrice * updateCartData.quantity;
        //update data product dalam database (cart)
        axios.post(`${API_HOST.url}/cart/${itemId}`, updateCartData, {
        headers: {
            'Accept' : 'application/json',
            'Authorization' : token,
        }
        })
        //update data product dalam database (cart) - jika berhasil
        .then(resCart => {
        //ambil data cart terbaru dari database
        axios.get(`${API_HOST.url}/cart`, {
            headers: {
            'Accept' : 'application/json',
            'Authorization' : token,
            }
        })
        //ambil data cart terbaru dari database - jika berhasil
        .then(resUpdateCart => {
            dispatch(setLoading(false));
            //simpan data CART user ke dalam data reducer
            dispatch({type: 'SET_CART', value: resUpdateCart.data.data.data});
            showMessage('Jumlah produk ini telah diperbaharui dalam keranjang anda', 'success');
        })
        //ambil data cart terbaru dari database - jika tidak berhasil
        .catch(errUpdateCart => {
            dispatch(setLoading(false));
            showMessage('Terjadi kesalahan pada penambahan data');
        })
        })
        //update data product ke database (cart) - jika tidak berhasil
        .catch((errCart) => {
            dispatch(setLoading(false));
            showMessage('Terjadi kesalahan pada penyimpanan data ke API Cart User');
        })
}