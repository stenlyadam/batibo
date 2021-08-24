import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Carousel, Gap, Product, SearchBox, Button, CartItem } from '../../components';
import Category from '../../components/molecules/Category';
import { firebase } from '../../config';
import { colors, fonts, getData, storeData } from '../../utils';
import {useDispatch , useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

const HomeScreen = ({navigation}) => {
  
  const dispatch = useDispatch()

  const user = useSelector(state => state.user);
  console.log('user cart: ', user.cart);
  const [listProduct, setListProduct] = useState([]);
  const [listCartCheck, setListCartCheck] = useState([]);
  

  useEffect(() => {
    firebase
      .database()
      .ref('products/')
      .limitToFirst(4)
      .once('value')
      .then(response => {
        if (response.val()) {
          setListProduct(response.val());
        }
      })
      .catch(error => {
        showError(error.message);
      });
      setListCartCheck(user.cart)
  },[user.cart]);

  const pushCart = (toCart) => {
    const data = {
      category: toCart.category,
      detail: toCart.detail,
      discount: toCart.discount,
      id: user.cart.length,
      image: toCart.image,
      name: toCart.name,
      price: toCart.price,
      priceAfterDiscount:toCart.priceAfterDiscount,
      productUnit: toCart.productUnit,
      count: user.cart.length,
      
    } 
    console.log('data id sebelum : ', data.id );

    let checkCart = false;

    console.log('----------------------------');
    // console.log('cart length : ', form.cart.length)
    {listCartCheck.map(item => {
      if(item.name == toCart.name){
        checkCart = true;
        data.count = item.count
        data.count++
        data.id = item.id
        // console.log('data id sesudah dicek : ', data.count );
      }
      else{
        // console.log('kok tidak ada siii');
      }
      // console.log(' hallloooo jugaa ifff sudah di cek ? ', checkCart)
    })}    

    if (checkCart == false) {
      console.log('tidak ada data');
      data.count = 1;
    }

    console.log('data count untuk database: ', data.count);

    firebase.database()
        .ref(`users/${user.uid}/cart/`)
        .child(data.id)
        .set(data)
        .then(() => {
              dispatch({type: 'SET_LOADING', value: true});
              //tambah data ke redux - code marshal
              // const toCartPrice = toCart.price - (toCart.price * (toCart.discount/100));
              // let item = {id: `${toCart.id}`, count: data.count, price: toCartPrice}
              // dispatch({type: 'PUSH_CART', value:item})

                firebase
                .database()
                .ref(`users/${user.uid}/`)
                .once('value')
                .then(snapshot => {
                  storeData('user', snapshot.val());
                  dispatch({type: 'SAVE_USER', value:snapshot.val()})
                  navigation.replace('MainApp');
                  dispatch({type: 'SET_LOADING', value: false});
                  showMessage({
                    message: "Data Cart Anda berhasil ditambahkan",
                    type: 'default',
                    backgroundColor: colors.primary,
                    color: colors.white,
                })
                })
        })
        .catch(error => {
            dispatch({type: 'SET_LOADING', value: false});
            showMessage({
                message: error.message,
                type: 'default',
                backgroundColor: colors.error,
                color: colors.white,
            });
        });
  }

  const chooseSayuran = () => {
    dispatch({type: 'SET_LOADING', value: true});
    navigation.navigate('InCategory', "Sayuran")
  }

  const chooseBuah = () => {
    dispatch({type: 'SET_LOADING', value: true});
    navigation.navigate('InCategory', "Buah")
  }

  const chooseRempah = () => {
    dispatch({type: 'SET_LOADING', value: true});
    navigation.navigate('InCategory', "Rempah")
  }

  const chooseLainnya = () => {
    dispatch({type: 'SET_LOADING', value: true});
    navigation.navigate('InCategory', "Lainnya")
  }

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Halo {user.username}</Text>
        <Text style={styles.welcomeText}>Pilih Sayuran-mu disini</Text>
        <Gap height={5} />
        <SearchBox label="Cari yang kamu butuhkan" />
        {/* <Gap height={32} /> */}
        <Carousel />
      </View>
      <View style={styles.categoryContainer}>
        <Category title="sayuran" onPress={chooseSayuran}/>
        <Category title="buah" onPress={chooseBuah}/>
        <Category title="rempah" onPress={chooseRempah}/>
        <Category title="lainnya" onPress={chooseLainnya}/>
      </View>
      <Text style={styles.titleText}>Sedang Diskon</Text>
      
        <View style={styles.productContainer}>
          {/* {console.log('listProduct: ', listProduct)} */}
          {listProduct.map(item => {
            return (
              <Product
                key={item.id}
                name={item.name}
                image={item.image}
                category={item.category}
                Price={item.price}
                PriceAfterDiscount={item.priceAfterDiscount}
                productUnit={item.productUnit}
                discount={item.discount}
                onBuy={() => pushCart(item)}
                onDetail={() => navigation.navigate('Detail', item)}
              /> 
            )
          })}
        </View>
        <View style = {styles.buttonExpand}>
            <Button 
            title="Lihat Semua" 
            size={16} 
            height={10} 
            space={358} 
            color={"secondary"}
            borderRadius={4}
            onPress={() => navigation.navigate('OnDiscount')}
            />
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
