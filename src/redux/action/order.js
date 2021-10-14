import axios from "axios"
import { API_HOST } from "../../config"
import { getData } from "../../utils"

export const getOrders = (token) => (dispatch) => {

        axios.get(`${API_HOST.url}/order`, {
            headers: {
                'Authorization' : token
            }
        })
        .then(res => {
            console.log('get orders: ', res.data.data.data);
            dispatch({type: 'SET_ORDER', value: res.data.data.data})
        })
        .catch(err => {
            console.log('err get orders: ', err.response);
        })
    
}

//70012
//37597477064

export const getOnProcess = (token) => (dispatch) => {
        axios.all([
            axios.get(`${API_HOST.url}/transaction?status=PENDING`, {
                headers: {
                    'Authorization' : token
                },
            }),
            axios.get(`${API_HOST.url}/transaction?status=SUCCESS`, {
                headers: {
                    'Authorization' : token
                },
            }),
            axios.get(`${API_HOST.url}/transaction?status=ON_DELIVERY`, {
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
            axios.get(`${API_HOST.url}/transaction?status=CANCELLED`, {
                headers: {
                    'Authorization' : token
                },
            }),
            axios.get(`${API_HOST.url}/transaction?status=DELIVERED`, {
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