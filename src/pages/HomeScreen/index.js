import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity , RefreshControl, TouchableWithoutFeedbackComponent} from 'react-native';
import { Carousel, Gap, Product, SearchBox, Button, CartItem } from '../../components';
import Category from '../../components/molecules/Category';
import { API_HOST, firebase } from '../../config';
import { colors, fonts, getData, showMessage, storeData } from '../../utils';
import {useDispatch , useSelector} from 'react-redux';
import axios from 'axios';
import { getProductData, getProductDataByCategory, addCartAction, getOnProcess, getOrders, getHistory, setLoading } from '../../redux/action';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const HomeScreen = ({navigation}) => {

  const [refreshing, setRefreshing] = React.useState(false);
  const [userProfile, setUserProfile] = useState({});
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.loginReducer);
  const {token} = useSelector(state => state.loginReducer);
  const {cart} = useSelector(state => state.loginReducer);
  const {product} = useSelector(state => state.homeReducer);
  const [disableButton, setdisableButton] = useState(false);
  
  useEffect(() => {
    getData('userProfile').then((res) => {
      setUserProfile(res);
    });
    dispatch(getProductData(4));
    wait(1000).then(() => dispatch(setLoading(false)));
  },[]);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getOnProcess(token));
    dispatch(getHistory(token));
    dispatch(getOrders(token));
    dispatch(getProductData(4)); 
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const pushCart = (toCart) => {
    setdisableButton(true);
    dispatch(addCartAction(user, token, cart, toCart));
    wait(1000).then(() => setdisableButton(false));
  }

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView 
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      >
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Halo {user.name}</Text>
        <Text style={styles.welcomeText}>Pilih Sayuran-mu disini</Text>
        <Gap height={5} />
        <SearchBox label="Cari yang kamu butuhkan" navigation={navigation} homescreen/>
        {/* <Gap height={32} /> */}
        <Carousel />
      </View>
      <View style={styles.categoryContainer}>
        <Category title="sayuran" onPress={() => dispatch(getProductDataByCategory('Sayuran', navigation))}/>
        <Category title="buah" onPress={() => dispatch(getProductDataByCategory('Buah', navigation))}/>
        <Category title="rempah" onPress={() => dispatch(getProductDataByCategory('Rempah', navigation))}/>
        <Category title="lainnya" onPress={() => dispatch(getProductDataByCategory('Lainnya', navigation))}/>
      </View>
      <Text style={styles.titleText}>Sedang Diskon</Text>
      <View style={styles.container}>
      <View style={styles.productContainer}>
          {product.map(item => {
            return (
              <Product
                key={item.id}
                name={item.name}
                image={{ uri: item.picturePath }}
                category={item.category}
                Price={item.price}
                PriceAfterDiscount={item.price_after_discount}
                productUnit={item.product_unit}
                discount={item.discount}
                disabledButton={disableButton}
                onBuy={() => pushCart(item)}
                onDetail={() => navigation.navigate('Detail', item)}
              /> 
            )
          })}
        </View>
        <View style = {styles.buttonExpand}>
            <Button 
            title="Lihat Semua" 
            size={14} 
            height={10} 
            space={358}
            buttonColor={colors.button.secondary.backgroundColor}
            borderColor={colors.button.secondary.borderColor}
            borderWidth={2}
            borderRadius={4}
            textColor={colors.button.secondary.text}
            onPress={() => dispatch(getProductData(50, 'onDiscount', navigation))}
            />
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    marginHorizontal: 24,
  },
  headerContainer: {
    width: '100%',
    height: 305,
    backgroundColor: colors.button.green,
    paddingHorizontal: 24,
    paddingTop: 25,
  },
  welcomeText: {
    fontSize: 14,
    fontFamily: fonts.primary[700],
    color: colors.white,
  },
  titleText: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
    marginTop: 12,
    marginLeft: 24,
  },
  productContainer: {
    // paddingHorizontal: 24,
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
    width:'100%',
    marginTop: 18,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
