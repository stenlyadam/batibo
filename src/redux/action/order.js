import axios from "axios"
import { API_HOST } from "../../config"
import { getDistance } from 'geolib';

export const getOrders = (token, successOrder, navigation) => (dispatch) => {
        console.log('saya get On Process');
        axios.get(`${API_HOST.url}/order`, {
            headers: {
                'Authorization' : token
            }
        })
        .then(res => {
            console.log('get orders: ', res.data.data.data);
            dispatch({type: 'SET_ORDER', value: res.data.data.data})
            //jika order success
            if(successOrder == true){
                axios.get(`${API_HOST.url}/cart`, {
                    headers: {
                    'Accept' : 'application/json',
                    'Authorization' : token,
                    }
                })
                //ambil data cart terbaru dari database - jika berhasil
                .then(resUpdateCart => {
                    console.log('berhasil coy')
                    //simpan data CART user ke dalam data reducer
                    dispatch({type: 'SET_CART', value: resUpdateCart.data.data.data});
                })
                //ambil data cart terbaru dari database - jika tidak berhasil
                .catch(errUpdateCart => {
                    console.log('error from order to updated cart data')
                })
            }
            
        })
        .catch(err => {
            console.log('err get orders: ', err.response);
        })
    
}

export const getOnProcess = (token) => (dispatch) => {
        console.log('saya get On Process');
        axios.all([
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
        ])
        .then(axios.spread((res1, res2, res3) => {
                console.log('get in progress 1: ', res1.data);
                console.log('get in progress 2: ', res2.data);
                console.log('get in progress 3: ', res3.data);

                const pending = res1.data.data.data;
                const success = res2.data.data.data;
                const onDelivery = res3.data.data.data;

                dispatch({
                    type: 'SET_ON_PROCESS', 
                    value: [...pending, ...success, ...onDelivery]
                })
            }
        ))
        .catch(err => {
            console.log('err get in progress on orders: ', err.response);
        })
    
}

export const getHistory = (token) => (dispatch) => {
        axios.all([
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
        .then(axios.spread((res1, res2, res3) => {
                console.log('get in progress 1: ', res1.data);
                console.log('get in progress 2: ', res2.data);

                const cancelled = res1.data.data.data;
                const delivered = res2.data.data.data;

                dispatch({
                    type: 'SET_HISTORY', 
                    value: [...cancelled, ...delivered]
                })
            }
        ))
        .catch(err => {
            console.log('err history on orders: ', err.response);
        }) 
}

// export const getCheckoutAddress = (token, navigation) => (dispatch) => {
//     axios.get(`${API_HOST.url}/address`, {
//         headers: {
//             'Authorization' : token
//         }
//     })
//     .then((res) => {
//         dispatch({type: 'SET_CHECKOUT_ADDRESS', value: res.data.data.data});
//         navigation.navigate('CheckoutAddress');
//     })
//     .catch((err) => {
//         showMessage(`Error : ${err.response.data.message}`);
//         console.log('response error : ', err.response);
//     });
// };

export const setSelectedAddress = (item) => (dispatch) => {
    const sellerCoords = {
        latitude: 1.4171754552237659, 
        longitude: 124.98753217980266, 
    }

    const distance = getDistance(
        {latitude: item.latitude, longitude: item.longitude},
        {latitude: sellerCoords.latitude, longitude: sellerCoords.longitude}
    ) 
    
    let ongkir;
    //jika jarak pelanggan dibawah radius 2 km
    if(distance < 2000){
        ongkir = 8000;
    }
    //jika jarak pelanggan dibawah radius 5 km
    else if(distance < 5000){
        ongkir = 15000;
    }
    //jika jarak pelanggan dibawah radius 10 km
    else if(distance < 10000){
        ongkir = 25000;
    }
    //jika jarak pelanggan dibawah radius 20 km
    else if(distance < 20000){
        ongkir = 50000;
    }
    //jika jarak pelanggan dibawah radius 50 km
    else if(distance < 50000){
        ongkir = 100000;
    }
    //jika jarak pelanggan dibawah radius 70 km
    else if(distance < 70000){
        ongkir = 140000;
    }
    //jika jarak pelanggan diatas radius 70 km
    else {
        ongkir = 200000;
    }

    dispatch({type: 'SET_ONGKIR', value: ongkir});
    dispatch({type: 'SET_SELECTED_ADDRESS', value: item});
};