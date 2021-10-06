const {default: axios} = require("axios");
import {showMessage} from '../../utils';


const {API_HOST} = require('../../config');

export const getProductData = (limit, types, navigation) => (dispatch) => {
  axios.get(`${API_HOST.url}/product`, {
    params: {
      limit: limit,
    },
  })
    .then((res) => {
      if(types === 'onDiscount'){
        // console.log('res on discount : ', res.data.data.data);
        dispatch({type: 'SET_ONDISCOUNT', value: res.data.data.data});
        navigation.navigate('OnDiscount');
      }
      else{
        // console.log('res : ', res.data.data.data);
        dispatch({type: 'SET_PRODUCT', value: res.data.data.data});
      }
    })
    .catch((err) => {
      console.log('err : ', err.response);
      showMessage(
        `${err?.response?.data?.message} on Product API` ||
          'Terjadi kesalahan di API Product',
      );
    });
};

export const getProductDataByCategory = (category, navigation) => (dispatch) => {
  axios.get(`${API_HOST.url}/product?category=${category}`)
    .then((res) => {

      console.log('response category : ', res.data.data.data);
      dispatch({type: 'SET_INCATEGORY', value: res.data.data.data});
      navigation.navigate('InCategory');
    })
    .catch((err) => {
      console.log('response error : ', err.response);
      showMessage(
        `${err?.response?.data?.message} on Product By Category API` ||
          'Terjadi kesalahan di API Product By Category',
      );
    });
};
