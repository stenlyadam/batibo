import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Dimensions, FlatList} from 'react-native';
import {CartItem, CartSummary, CheckBox} from '../../components';
import {colors, fonts, getData, showError} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {firebase} from '../../config';
import { useDispatch, useSelector } from "react-redux";

const Pesanan = ({navigation}) => {
  const cart = useSelector(state => state.cart);
  console.log("CartPesanan: ", cart)
  
  const [listCart, setListCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setListCart([]);
    
    let tempPrice = 0;
    cart.map(item => {
      firebase
      .database()
      .ref(`products/${item.id}`)
      .once('value')
      .then(response => {
        const data = response.val()
        data["count"] = item.count;
        setListCart(listCart => [...listCart, data])
      })
      tempPrice += (item.price * item.count);
    })
    setTotalPrice(tempPrice);
  }, [])

  useEffect(() => {
    console.log("listCart: ", listCart)
  }, [listCart])

  return (
    <View style={styles.pesananContainer}>
      <FlatList style={styles.cartContainer}
            keyExtractor={(item) => item.id}
            data={listCart} 
            renderItem={({item}) => (
                <CartItem
                  id={item.id}
                  image={{uri: item.image}}
                  name={item.name}
                  weight={item.productUnit}
                  originalPrice={item.price}
                  currentPrice={item.price - (item.price * (item.discount/100))}
                  count={item.count}
                />
              )}
          />
      <View style={styles.cartSummaryContainer}>
        <CartSummary
          totalPrice={`Rp. ${totalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
          onPress={() => navigation.navigate('Checkout')}
        />
      </View>
    </View>
  );
};

export default Pesanan;

const styles = StyleSheet.create({
  cartItemContainer: {
    paddingHorizontal: 24,
  },
  cartContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
  },
  cartSummaryContainer: {
    backgroundColor: colors.white,
  },
  pesananContainer: {
    flex: 1,
  },
});
