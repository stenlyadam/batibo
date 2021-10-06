import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {Button} from '../../atoms';
import {useDispatch, useSelector} from 'react-redux';
import { API_HOST, firebase } from '../../../config';
import {showMessage} from 'react-native-flash-message';
import {colors} from '../../../utils';
import { updateCartAction } from '../../../redux/action';
import axios from 'axios';

const Counter = ({itemCount, itemId, productId, itemPrice}) => {

  const dispatch = useDispatch();
  const {user} = useSelector(state => state.loginReducer);
  const {token} = useSelector(state => state.loginReducer);
  const [count, setCount] = useState(itemCount);


  const onPressMinus = () => {
    console.log('item id : ',itemId);
    if (count > 0) {
      let updateCount = -1;
      updateCartAction(updateCount);
    } 
    else {
      let updateCount = 0;
      updateCartAction(updateCount);
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
