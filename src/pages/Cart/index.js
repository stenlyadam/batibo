import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Dimensions, FlatList} from 'react-native';
import {CartItem, CartSummary, PageTitle} from '../../components';
import {colors, fonts} from '../../utils';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Pesanan from './Pesanan';
import Dikirim from './Dikirim';
import {firebase} from '../../config';
import { useDispatch, useSelector } from "react-redux";

// const CartTab = createMaterialTopTabNavigator();

const Cart = ({navigation}) => {
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
    <SafeAreaView style={styles.page}>
      <View style={styles.pageTitle}>
        <PageTitle title={"Keranjang"} />
      </View>

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
      {/* <View style={styles.contentWrapper}>
        <CartTab.Navigator
          tabBarOptions={{
            labelStyle: {
              fontFamily: fonts.primary.normal,
              textTransform: 'capitalize',
              fontSize: 14,
              fontWeight: '600',
            },
            indicatorStyle: {
              backgroundColor: colors.button.green,
            },
          }}>
          <CartTab.Screen
            name="Pesanan"
            component={Pesanan}
            options={{tabBarLabel: 'Pesanan'}}
          />
          <CartTab.Screen
            name="Dikirim"
            component={Dikirim}
            options={{tabBarLabel: 'Dikirim'}}
          />
        </CartTab.Navigator>
      </View> */}
    </SafeAreaView>
  );
};

export default Cart;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentWrapper: {
    width: windowWidth,
    flex: 1,
    alignSelf: 'center',
    marginTop: 32,
  },
  pageTitle: {
    marginTop: 32,
  },
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
