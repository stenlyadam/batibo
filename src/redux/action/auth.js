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
        },
    })
    .then((res) => {
        //simpan data user kedalam data reducer
        dispatch({type: 'SET_USER', value: res.data.data});
        //simpan data token kedalam data reducer
        dispatch({type: 'SET_TOKEN', value: token});
        //request API untuk data address, cart, order dari pengguna
        axios.all([
            axios.get(`${API_HOST.url}/address`, {
                headers: {
                    'Accept' : 'application/json',
                    'Authorization' : token
                },
            }),
            axios.get(`${API_HOST.url}/cart`, {
                headers: {
                    'Accept' : 'application/json',
                    'Authorization' : token
                },
            }),
            axios.get(`${API_HOST.url}/order`, {
                headers: {
                    'Accept' : 'application/json',
                    'Authorization' : token
                },
            }),
            //get data transaction(OnProcess)
            axios.get(`${API_HOST.url}/transaction?status=PENDING&isOrder=true`, {
                headers: {
                    'Authorization' : token
                },
            }),
            axios.get(`${API_HOST.url}/transaction?status=SUCCESS&isOrder=true`, {
                headers: {
                    'Authorization' : token
                },
            }),
            axios.get(`${API_HOST.url}/transaction?status=ON_DELIVERY&isOrder=true`, {
                headers: {
                    'Authorization' : token
                },
            }),
            //get data transaction(History)
            axios.get(`${API_HOST.url}/transaction?status=CANCELLED&isOrder=true`, {
                headers: {
                    'Authorization' : token
                },
            }),
            axios.get(`${API_HOST.url}/transaction?status=DELIVERED&isOrder=true`, {
                headers: {
                    'Authorization' : token
                },
            }),
        ])
        //request API untuk data address, cart, order dari pengguna - jika berhasil
        .then(axios.spread((resAddress, resCart, resOrder, transactionPending, transactionSuccess, transactionOnDelivery, transactionCancelled, transactionDelivered) => {
                //deklarasi data transaksi dari user
                const pending = transactionPending.data.data.data;
                const success = transactionSuccess.data.data.data;
                const onDelivery = transactionOnDelivery.data.data.data;
                const cancelled = transactionCancelled.data.data.data;
                const delivered = transactionDelivered.data.data.data;

                //simpan data address user ke dalam data reducer
                dispatch({type: 'SET_ADDRESS', value: resAddress.data.data.data});
                //simpan data CART user ke dalam data reducer
                dispatch({type: 'SET_CART', value: resCart.data.data.data});
                //simpan data Order user ke dalam data reducer
                dispatch({type: 'SET_ORDER', value: resOrder.data.data.data})
                //simpan data transaksi(onProcess)
                dispatch({
                    type: 'SET_ON_PROCESS', 
                    value: [...pending, ...success, ...onDelivery]
                })
                //simpan data transaksi(history)
                dispatch({
                    type: 'SET_HISTORY', 
                    value: [...cancelled, ...delivered]
                })
            }
        ))
        //request API untuk data address, cart, order dari pengguna - jika tidak berhasil
        .catch(err => {
            console.log('err history on orders: ', err.response);
            showMessage(`Error : ${err.response.data.message}`);
        })
        //pergi ke halaman utama aplikasi
        setTimeout(() => {
            navigation.reset({index: 0, routes: [{name: 'MainApp'}]})
        }, 1000)
    })
    .catch(err => {
        // console.log('error auth : ', err.response);
        showMessage(`Error : ${err.response.data.message}`);
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
        //request API untuk data address, cart, order dari pengguna
        axios.all([
            axios.get(`${API_HOST.url}/address`, {
                headers: {
                    'Accept' : 'application/json',
                    'Authorization' : token
                },
            }),
            axios.get(`${API_HOST.url}/cart`, {
                headers: {
                    'Accept' : 'application/json',
                    'Authorization' : token
                },
            }),
            axios.get(`${API_HOST.url}/order`, {
                headers: {
                    'Accept' : 'application/json',
                    'Authorization' : token
                },
            }),
            //get data transaction(OnProcess)
            axios.get(`${API_HOST.url}/transaction?status=PENDING&isOrder=true`, {
            headers: {
                'Authorization' : token
            },
            }),
            axios.get(`${API_HOST.url}/transaction?status=SUCCESS&isOrder=true`, {
                headers: {
                    'Authorization' : token
                },
            }),
            axios.get(`${API_HOST.url}/transaction?status=ON_DELIVERY&isOrder=true`, {
                headers: {
                    'Authorization' : token
                },
            }),
            //get data transaction(History)
            axios.get(`${API_HOST.url}/transaction?status=CANCELLED&isOrder=true`, {
                headers: {
                    'Authorization' : token
                },
            }),
            axios.get(`${API_HOST.url}/transaction?status=DELIVERED&isOrder=true`, {
                headers: {
                    'Authorization' : token
                },
            }),
        ])
        //request API untuk data address, cart, order dari pengguna - jika berhasil
        .then(axios.spread((resAddress, resCart, resOrder, transactionPending, transactionSuccess, transactionOnDelivery, transactionCancelled, transactionDelivered) => {
                //deklarasi data transaksi dari user
                const pending = transactionPending.data.data.data;
                const success = transactionSuccess.data.data.data;
                const onDelivery = transactionOnDelivery.data.data.data;
                const cancelled = transactionCancelled.data.data.data;
                const delivered = transactionDelivered.data.data.data;

                //simpan data address user ke dalam data reducer
                dispatch({type: 'SET_ADDRESS', value: resAddress.data.data.data});
                //simpan data CART user ke dalam data reducer
                dispatch({type: 'SET_CART', value: resCart.data.data.data});
                //simpan data Order user ke dalam data reducer
                dispatch({type: 'SET_ORDER', value: resOrder.data.data.data});
                //simpan data transaksi(onProcess)
                dispatch({
                    type: 'SET_ON_PROCESS', 
                    value: [...pending, ...success, ...onDelivery]
                })
                //simpan data transaksi(history)
                dispatch({
                    type: 'SET_HISTORY', 
                    value: [...cancelled, ...delivered]
                })
                //simpan data transaksi(history)
                dispatch({
                    type: 'SET_COORDINATES', 
                    value: {latitude : 0, longitude : 0, distance: 0}
                })
            }
        ))
        //request API untuk data address, cart, order dari pengguna - jika tidak berhasil
        .catch(err => {
            console.log('err history on orders: ', err.response);
            showMessage(`Error : ${err.response.data.message}`);
        })
        //pergi ke halaman utama aplikasi
        setTimeout(() => {
            navigation.reset({index: 0, routes: [{name: 'MainApp'}]})
        }, 2000)
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

        //request API untuk data address, cart, order dari pengguna
        axios.all([
            axios.get(`${API_HOST.url}/address`, {
                headers: {
                    'Accept' : 'application/json',
                    'Authorization' : token
                },
            }),
            axios.get(`${API_HOST.url}/cart`, {
                headers: {
                    'Accept' : 'application/json',
                    'Authorization' : token
                },
            }),
            axios.get(`${API_HOST.url}/order`, {
                headers: {
                    'Accept' : 'application/json',
                    'Authorization' : token
                },
            }),
            //get data transaction(OnProcess)
            axios.get(`${API_HOST.url}/transaction?status=PENDING&isOrder=true`, {
                headers: {
                    'Authorization' : token
                },
            }),
            axios.get(`${API_HOST.url}/transaction?status=SUCCESS&isOrder=true`, {
                headers: {
                    'Authorization' : token
                },
            }),
            axios.get(`${API_HOST.url}/transaction?status=ON_DELIVERY&isOrder=true`, {
                headers: {
                    'Authorization' : token
                },
            }),
            //get data transaction(History)
            axios.get(`${API_HOST.url}/transaction?status=CANCELLED&isOrder=true`, {
                headers: {
                    'Authorization' : token
                },
            }),
            axios.get(`${API_HOST.url}/transaction?status=DELIVERED&isOrder=true`, {
                headers: {
                    'Authorization' : token
                },
            }),
        ])
        //request API untuk data address, cart, order dari pengguna - jika berhasil
        .then(axios.spread((resAddress, resCart, resOrder, transactionPending, transactionSuccess, transactionOnDelivery, transactionCancelled, transactionDelivered) => {
                //deklarasi data transaksi dari user
                const pending = transactionPending.data.data.data;
                const success = transactionSuccess.data.data.data;
                const onDelivery = transactionOnDelivery.data.data.data;
                const cancelled = transactionCancelled.data.data.data;
                const delivered = transactionDelivered.data.data.data;

                //simpan data address user ke dalam data reducer
                dispatch({type: 'SET_ADDRESS', value: resAddress.data.data.data});
                //simpan data CART user ke dalam data reducer
                dispatch({type: 'SET_CART', value: resCart.data.data.data});
                //simpan data Order user ke dalam data reducer
                dispatch({type: 'SET_ORDER', value: resOrder.data.data.data})
                //simpan data transaksi(onProcess)
                dispatch({
                    type: 'SET_ON_PROCESS', 
                    value: [...pending, ...success, ...onDelivery]
                })
                //simpan data transaksi(history)
                dispatch({
                    type: 'SET_HISTORY', 
                    value: [...cancelled, ...delivered]
                })
            }
        ))
        //request API untuk data address, cart, order dari pengguna - jika tidak berhasil
        .catch(err => {
            console.log('err history on orders: ', err.response);
            showMessage(`Error : ${err.response.data.message}`);
        })
        dispatch(setLoading(false));
        
        showMessage('Login Success', 'success');
        //pergi ke halaman utama aplikasi
        setTimeout(() => dispatch(setLoading(true)), 1000);
        setTimeout(() => navigation.reset({index: 0, routes: [{name: 'MainApp'}]}), 4000);
        setTimeout(() => dispatch(setLoading(false)), 4000);
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