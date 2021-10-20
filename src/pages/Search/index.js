import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Carousel, Gap, ProductSearch, SearchBox, Button, CartItem } from '../../components';
import { colors, fonts, getData, storeData } from '../../utils';
import {useDispatch , useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {  addCartAction } from '../../redux/action';

const Search = ({navigation}) => {

  const {onSearch} = useSelector(state => state.homeReducer);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.loginReducer);
  const {token} = useSelector(state => state.loginReducer);
  const {cart} = useSelector(state => state.loginReducer);

  const pushCart = (toCart) => {
    dispatch(addCartAction(user, token, cart, toCart));
  }
  
  return (
    <SafeAreaView style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}> </Text>
            <Text style={styles.welcomeText}>Cari yang kamu butuhkan</Text>
            <Gap height={5} />
            <SearchBox label="Search" onChange={(e) => handleSearch(e)}/>
        </View>
            <View style={styles.productContainer}>
              {onSearch.map(item => {
                if(item){
                  return (
                    <ProductSearch
                      key={item.id}
                      name={item.name}
                      image={{ uri: item.picturePath }}
                      category={item.category}
                      Price={item.price}
                      PriceAfterDiscount={item.price_after_discount}
                      productUnit={item.product_unit}
                      discount={item.discount}
                      onBuy={() => pushCart(item)}
                      onDetail={() => navigation.navigate('Detail', item)}
                    /> 
                    )
                } else {
                  <Text>Test</Text>
                }
              })}
            </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    width: '100%',
    backgroundColor: colors.button.green,
    paddingHorizontal: 24,
    paddingBottom: 25,
    
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
  welcomeText: {
    fontSize: 14,
    fontFamily: fonts.primary[700],
    color: colors.white,
  },
  noDataText: {
    fontSize: 18,
    fontFamily: fonts.primary[400],
    color: colors.black,
    textAlign: "center",
  },
  titleText: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
    marginTop: 12,
    marginLeft: 24,
    color: colors.button.green,
  },
  productContainer: {
    marginVertical: 10,
    paddingBottom: 28,
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 20,
  },
  buttonExpand: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 38,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});
