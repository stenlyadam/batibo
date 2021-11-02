import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from "react-redux";
import { CartItem, CartSummary, PageTitle } from '../../components';
import { setSelectedAddress } from '../../redux/action';
import { colors } from '../../utils';

const Cart = ({navigation}) => {

  const dispatch = useDispatch();
  const [listCart, setListCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const {cart} = useSelector(state => state.loginReducer);

  useEffect(() => { 
    setListCart([]);
    let tempPrice = 0;

    cart.map(item => {
      if(item){
        const data = item;
        setListCart(listCart => [...listCart, data])
      }
      tempPrice += (item.total);
    })
    setTotalPrice(tempPrice);

    
  },[cart])

  const chooseCheckOut = () => {
    if(cart.length >= 1){
      const checkoutFromDetail = false;

      dispatch({type: 'SET_CHECKOUT', value: listCart});
      dispatch({type: 'SET_ORDER_FROM_DETAIL', value: checkoutFromDetail});
      dispatch(setSelectedAddress(null));
      navigation.navigate('Checkout');
    }
    else{
      showMessage({
        message: 'Anda tidak memiliki produk untuk dipesan',
        type: 'default',
        backgroundColor: colors.error,
        color: colors.white,
    });
    }
  }
  
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.pageTitle}>
        <PageTitle title={"Keranjang"} />
      </View>
      <ScrollView>
      <View style={styles.pesananContainer}>
      {listCart.map(item => {
            return (
              <CartItem
              key={item.id}
              id={item.id}
              productId={item.product_id}
              image={{uri: item.product.picturePath}}
              name={item.product.name}
              weight={item.product.product_unit}
              originalPrice={item.product.price}
              currentPrice={item.product.price_after_discount}
              count={item.quantity}
            />
            )
          })}
      </View>
      </ScrollView>
      <View style={styles.cartSummaryContainer}>
        <CartSummary
          totalPrice={`Rp. ${totalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
          onPress={chooseCheckOut}
        />
      </View>
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
  checkBoxTitle:{
    paddingHorizontal: 24,
  },
  contentWrapper: {
    width: windowWidth,
    flex: 1,
    alignSelf: 'center',
    marginTop: 32,
  },
  pageTitle: {
    marginVertical: 28,
    marginTop: 18
  },
  pesananContainer: {
    paddingHorizontal: 24,
    flex: 1,
  },
  cartSummaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
