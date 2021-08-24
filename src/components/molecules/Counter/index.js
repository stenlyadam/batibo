import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {Button} from '../../atoms';
import {useDispatch, useSelector} from 'react-redux';
import { firebase } from '../../../config';

const Counter = ({itemCount, itemId}) => {
  let item = {itemCount, itemId}
  
  const user = useSelector(state => state.user);

  dispatch = useDispatch();
  const [count, setCount] = useState(itemCount);
  const onPressMinus = () => {
    console.log('item id : ',itemId);
    if (count > 0) {
      let updateCount = -1 ;
      // dispatch({type: 'UPDATE_COUNT_DECREMENT', value:item})
      // setCount((prevCount) => prevCount + updateCount);
      updateData(updateCount);
    } else {
      let updateCount = 0 ;
      // dispatch({type: 'DELETE_CART', value:item})
      console.log('hellooasdf');
      updateData(updateCount);
    }


  };
  const onPressPlus = () => {
    let updateCount = 1 ;
    // setCount((prevCount) => prevCount + updateCount);
    // dispatch({type: 'UPDATE_COUNT_INCREMENT', value:item})
    // console.log('count : ', count);
    updateData(updateCount);
  };

  const updateData = (updateCount) => {
    console.log('updateCount : ', updateCount);
    
    //ubah count ke data object utk update data cart pada firebase
    const updateCart = {
      count : count + updateCount
    }
        // save count cart to firebase
        firebase
        .database()
        .ref(`users/${user.uid}/cart/${itemId}/`)
        .update(updateCart)
        .then(() => {
                //load data firebase to save in redux
                firebase
                .database()
                .ref(`users/${user.uid}/`)
                .once('value')
                .then(snapshot => {
                  
                  itemCount = itemCount + updateCount;
                  console.log('count : ', itemCount)
                  //kondisi jika jumlah 1 produk sama dengan nol
                  if (itemCount == 0){
                    //tampilan jumlah produk tidak berubah, tapi muncul tampilan untuk konfirmasi penghapusan produk
                    setCount(1);
                    console.log('asdfasdfasdf ');
                    deleteProductConfirmation(itemId);
                  }
                  else {
                    setCount((prevCount) => prevCount + updateCount);
                    console.log('hahhahahha ');
                  }
                  dispatch({type: 'SAVE_USER', value:snapshot.val()})
                })
        })
        //if error
        .catch(error => {
            showMessage({
                message: error.message,
                type: 'default',
                backgroundColor: colors.error,
                color: colors.white,
            });
        });
  }

  const deleteProductConfirmation = (data) => {
    console.log('Hellooo : ', data);
    Alert.alert(
      "Konfirmasi",
      "Apakah anda ingin menghapus produk ini dari keranjang?",
      [
        {
          text: "Tidak",
          onPress: () => cancelDelete(data),
          style: "cancel"
        },
        { text: "Ya", onPress: () => deleteProduct(data) }
      ]
    );
  }

  const cancelDelete = (product) => {
    console.log('helloooo');
    let updateCount = 0 ;
    itemCount = 1;
    updateData(updateCount);
  }

  const deleteProduct = (product) => {
      console.log('producasdgasdg : ', product);
      firebase.database()
      .ref(`users/${user.uid}/cart/${product}/`)
      .remove()
      .then(() => {
          firebase
          .database()
          .ref('users/' + user.uid)
          .once('value')
          .then(snapshot => {
              dispatch({type: 'SAVE_USER', value:snapshot.val()})
      })
      })
      .catch(error => {
          showMessage({
              message: error.message,
              type: 'default',
              backgroundColor: colors.error,
              color: colors.white,
          });
      });
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
  },
  number: {
    paddingHorizontal: 16,
  },
});
