import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import {Button} from '../../components';
import {colors, fonts, getData, storeData} from '../../utils';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {firebase} from '../../config';
import {useDispatch , useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import { addCartAction, setSelectedAddress } from '../../redux/action';

const Detail = ({navigation, route}) => {

  const item = route.params;
  const dispatch = useDispatch() ; 
  const {user} = useSelector(state => state.loginReducer);
  const {token} = useSelector(state => state.loginReducer);
  const {cart} = useSelector(state => state.loginReducer);

  const pushCart = (toCart) => {
    dispatch(addCartAction(user, token, cart, toCart));
  }
  
  const onBuy = () => {
    const productCheckout = {
      created_at : item.created_at,
      deleted_at : item.deleted_at,
      id : item.id,
      product: {
        category: item.category,
        created_at : item.created_at,
        deleted_at : item.deleted_at,
        detail: item.detail,
        discount: item.discount,
        id: item.id,
        name: item.name,
        picturePath: item.picturePath,
        price: item.price,
        price_after_discount: item.price_after_discount,
        product_unit: item.product_unit,
        updated_at: item.updated_at
      },
      product_id: item.id,
      quantity: 1,
      total: item.price_after_discount,
      updated_at: item.updated_at,
      user_id: user.id
    }

    let checkout = [productCheckout]; 
    console.log('product : ', checkout);
    dispatch({type: 'SET_SELECTED_ADDRESS', value: null});
    dispatch({type: 'SET_CHECKOUT', value: checkout});
    dispatch({type: 'SET_ORDER_FROM_DETAIL', value: true});
    navigation.navigate('Checkout');
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground source={{uri: item.picturePath}} style={styles.image}>
          <View style={styles.backButtonContainer}>
            <Button
              type="icon-only"
              icon="icon-arrow-back"
              style={styles.backButton}
              onPress={() => navigation.navigate('MainApp')}
              borderRadius={4}
            />
          </View>
        </ImageBackground>
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.titleTopContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.originalPrice}>Rp.{item.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
            <View style={styles.currentPriceContainer}>
              <Text style={styles.currentPrice}>Rp.{item.price_after_discount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
              <Text style={styles.quantity}>/ {item.product_unit}</Text>
            </View>
          </View>
          <View style={styles.discountContainer}>
            <Text style={styles.discount}>{item.discount}%</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <Text style={styles.text}>
              {item.detail}
            </Text>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <View style={styles.centerContainer}>
            <View style={styles.cartButtonContainer}>
              <Button type="icon-only" icon="icon-cart" borderRadius={4} onPress={() => pushCart(item)}/>
            </View>
            <TouchableOpacity style={styles.beliButtonContainer} onPress={onBuy}>
              <Text style={styles.textButton}>Beli Sekarang</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: 375,
  },
  image: {
    flex: 1,
  },
  backButtonContainer: {
    backgroundColor: colors.button.primary.backgroundColor,
    opacity: 0.5,
    height: 38,
    width: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 32,
    marginLeft: 24,
  },

  detailContainer: {
    backgroundColor: colors.white,
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: -85,
  },
  titleTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 170,
  },
  titleContainer: {
    width: 138,
    height: 33,
    marginTop: 32,
    marginLeft: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.nunito.normal,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 16,
    fontFamily: fonts.nunito.normal,
    marginTop: 8,
    color: colors.grey,
  },
  originalPrice: {
    fontSize: 14,
    fontFamily: fonts.nunito.normal,
    marginTop: 24,
    color: colors.black,
    opacity: 0.58,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  currentPriceContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  currentPrice: {
    color: colors.text.tertiary,
    fontSize: 18,
    fontFamily: fonts.nunito.normal,
    marginRight: 4,
  },
  quantity: {
    fontSize: 16,
    fontFamily: fonts.nunito.normal,
    color: colors.black,
    opacity: 0.5,
  },
  discountContainer: {
    backgroundColor: colors.text.quartenary,
    width: 87,
    height: 69,
    borderTopRightRadius: 35,
    borderBottomLeftRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discount: {
    color: colors.white,
    fontSize: 24,
    fontFamily: fonts.nunito.normal,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 24,
    marginTop: 24,
    height: 200,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: fonts.nunito.normal,
    color: colors.text.secondary,
  },

  footer: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    width: 327,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartButtonContainer: {
    height: 38,
    width: 38,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.grey,
  },
  beliButtonContainer: {
    height: 38,
    width: 273,
    backgroundColor: colors.button.primary.backgroundColor,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
});
