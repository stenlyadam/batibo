import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Dimensions, FlatList, ScrollView, Alert} from 'react-native';
import {CartItem, CartSummary, PageTitle, Button} from '../../components';
import {colors, fonts} from '../../utils';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Pesanan from './Pesanan';
import Dikirim from './Dikirim';
import {firebase} from '../../config';
import { useDispatch, useSelector } from "react-redux";
import {showMessage} from 'react-native-flash-message';

// const CartTab = createMaterialTopTabNavigator();

const Cart = ({navigation}) => {

  const user = useSelector(state => state.user);
  const userCart = user.cart;
  const [listCart, setListCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => { 
    setListCart([]);
    // console.log('user.cart : ',userCart);
    let tempPrice = 0;

    userCart.map(item => {
      //taru proses untuk mapping cart dari user(redux) untuk ditampilkan pada flat list menggantikan cart map dibawah  
      if(item && item.id != 0){
        // console.log('user cart mapping : ', item);
        const data = item;
        data["count"] = item.count;
        setListCart(listCart => [...listCart, data])
      }
      // console.log('temp price : ', tempPrice);
      tempPrice += (item.priceAfterDiscount * item.count);
    })
    setTotalPrice(tempPrice);

  }, [userCart])

  useEffect(() => {
    // console.log("listCart: ", listCart)
    // console.log('total price : ', totalPrice);
  }, [listCart])

  const chooseCheckOut = () => {
    console.log('hellooooo : ', user.cart.length);
    if(user.cart.length > 1){
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
      {/* <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.checkBoxTitle}>
        <CheckBox label = "Pilih Semua" text = {14}/>
      </View> */}
      <View style={styles.pesananContainer}>
        <FlatList style={styles.cartContainer}
              keyExtractor={(item) => item.id}
              data={listCart} 
              renderItem={({item}) => (
                // <View style={styles.cartWrapper}>
                //   <View style={styles.checkBoxCart}><CheckBox/></View>
                // <View>      
                  <CartItem
                    id={item.id}
                    image={{uri: item.image}}
                    name={item.name}
                    weight={item.productUnit}
                    originalPrice={item.price}
                    currentPrice={item.price - (item.price * (item.discount/100))}
                    count={item.count}
                  />
                //   {/* </View>
                // </View> */
                )}
            />
      </View>
      {/* </ScrollView> */}
      <View style={styles.cartSummaryContainer}>
        <CartSummary
          totalPrice={`Rp. ${totalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
          onPress={chooseCheckOut}
        />
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
    marginVertical: 32,
  },
  cartItemContainer: {
    paddingHorizontal: 24,
    backgroundColor: colors.white,
  },
  cartContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
  },
  // cartWrapper:{
  //   flexDirection: "row",
  //   backgroundColor: "yellow"
  // },
  // checkBoxCart:{
  //   backgroundColor:"blue"
    
  // },
  cartSummaryContainer: {
    maxWidth: 420,
    // marginHorizontal:0,
    // marginTop: 22,
    // marginBottom: 38,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  pesananContainer: {
    flex: 1,
  },
});
