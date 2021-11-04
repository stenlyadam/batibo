import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {Button} from '../../atoms';
import {useDispatch, useSelector} from 'react-redux';
import { API_HOST, firebase } from '../../../config';
import {colors, showMessage} from '../../../utils';
import { updateCartAction } from '../../../redux/action';
import axios from 'axios';

const Counter = ({itemCount, itemId, productId, itemPrice, checkout, orderFromDetail, detail}) => {

  const dispatch = useDispatch();
  const {user} = useSelector(state => state.loginReducer);
  const {token} = useSelector(state => state.loginReducer);
  const [count, setCount] = useState(itemCount);


  const onPressMinus = () => {
    console.log('item id : ', itemId);
    if (count > 1) {
      let updateCount = -1;
      updateCartAction(updateCount);
    } 
    else {
      if(checkout){
        showMessage('Anda Tidak Bisa Menghapus Produk Ketika Checkout');
      }
      else{
        Alert.alert(
          "Konfirmasi",
          "Apakah anda menghapus produk ini dari keranjang?",
          [
            {
              text: "Tidak",
              onPress: () => console.log('tidak jadi'),
              style: "cancel"
            },
            { text: "Ya", onPress: () => deleteCartAction()}
          ]
        );
      }
    }


  };
  const onPressPlus = () => {
    let updateCount = 1;
    updateCartAction(updateCount);
  };
  

  const updateCartAction = (updateCount) => {
        const updateCartData = {
          user_id: user.id,
          product_id: productId,
          quantity: '',
          total: '',
        }

        if(orderFromDetail){
          const productCheckout = {
            created_at : detail.created_at,
            id : detail.id,
            product: {
              category: detail.product.category,
              created_at : detail.product.created_at,
              detail: detail.product.detail,
              discount: detail.product.discount,
              id: detail.product.id,
              name: detail.product.name,
              picturePath: detail.product.picturePath,
              price: detail.product.price,
              price_after_discount: detail.product.price_after_discount,
              product_unit: detail.product.product_unit,
              updated_at: detail.product.updated_at
            },
            product_id: detail.id,
            quantity: '',
            total: detail.product.price_after_discount,
            updated_at: detail.updated_at,
            user_id: user.id
          }

          let checkout = [productCheckout]; 
          console.log(' checkout from count : ', checkout);
          productCheckout.quantity = count + updateCount;
          dispatch({type: 'SET_CHECKOUT', value: checkout});
          setCount((prevCount) => prevCount + updateCount);
        }
        else{
          updateCartData.quantity = count + updateCount;
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
              if(checkout){
                dispatch({type: 'SET_CHECKOUT', value: resUpdateCart.data.data.data});
              }
              //simpan data CART user ke dalam data reducer
              dispatch({type: 'SET_CART', value: resUpdateCart.data.data.data});
              setCount((prevCount) => prevCount + updateCount);
          })
          //ambil data cart terbaru dari database - jika tidak berhasil
          .catch(errUpdateCart => {
            showMessage('Terjadi kesalahan pada penambahan data');
          })
          })
          //update data product ke database (cart) - jika tidak berhasil
          .catch((errCart) => {
              showMessage('Terjadi kesalahan pada penyimpanan data ke API Cart User');
          })
        }
  }

  const deleteCartAction = () => {
    //delete data product dalam database (cart)
    axios.delete(`${API_HOST.url}/cart/${itemId}`, {
      headers: {
      'Accept' : 'application/json',
      'Authorization' : token,
      }
    })
    //delete data product dalam database (cart) - jika berhasil
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
        if(checkout){
          dispatch({type: 'SET_CHECKOUT', value: resUpdateCart.data.data.data});
        }
        //simpan data CART user ke dalam data reducer
        dispatch({type: 'SET_CART', value: resUpdateCart.data.data.data});
    })
    //ambil data cart terbaru dari database - jika tidak berhasil
    .catch(errUpdateCart => {
        showMessage('Terjadi kesalahan pada penambahan data');
    })
    })
    //delete data product ke database (cart) - jika tidak berhasil
    .catch((errCart) => {
        showMessage('Terjadi kesalahan pada penghapusan data product pada API Cart User');
    })
}

  return (
    <View style={styles.container}>
      <Button
        type="icon-only"
        icon="icon-minus"
        width={24}
        height={24}
        onPress={onPressMinus}
        borderRadius={4}
      />
      <Text style={styles.number}>{count}</Text>
      <Button
        type="icon-only"
        icon="icon-plus"
        width={24}
        height={24}
        onPress={onPressPlus}
        borderRadius={4}
      />
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 18,
    width: 100,
    maxWidth: 100,
    
  },
  number: {
    width:22,
    paddingHorizontal: 3,
    marginHorizontal: 5,
  },
});
