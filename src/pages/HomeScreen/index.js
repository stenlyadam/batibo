import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Carousel, Gap, Product, SearchBox, Button } from '../../components';
import Category from '../../components/molecules/Category';
import { firebase } from '../../config';
import { colors, fonts, getData } from '../../utils';
import {useDispatch} from 'react-redux';

const HomeScreen = ({navigation}) => {
  
  const pushCart = (itemId, itemPrice) => {
    let item = {id: `${itemId}`, count: 1, price: itemPrice}
    dispatch({type: 'PUSH_CART', value:item})
  }

  const dispatch = useDispatch()

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    uid: ''
  });

  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    getData('user').then(response => {
      const data = response;
      console.log('profile data: ' + data);
      setForm(data);
    });

    firebase
      .database()
      .ref('products/')
      .limitToFirst(4)
      .once('value')
      .then(response => {
        console.log('data: ', response.val());
        if (response.val()) {
          setListProduct(response.val());
        }
      })
      .catch(error => {
        showError(error.message);
      });
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Halo {form.username}</Text>
        <Text style={styles.welcomeText}>Pilih Sayuran-mu disini</Text>
        <Gap height={5} />
        <SearchBox label="Cari yang kamu butuhkan" />
        {/* <Gap height={32} /> */}
        <Carousel />
      </View>
      <View style={styles.categoryContainer}>
        <Category title="sayuran" onPress={() => navigation.navigate('InCategory', "Sayuran")}/>
        <Category title="buah" onPress={() => navigation.navigate('InCategory', "Buah")}/>
        <Category title="rempah" onPress={() => navigation.navigate('InCategory', "Rempah")}/>
        <Category title="lainnya" onPress={() => navigation.navigate('InCategory', "Lainnya")}/>
      </View>
      <Text style={styles.titleText}>Sedang Diskon</Text>
      
        <View style={styles.productContainer}>
          {console.log('listProduct: ', listProduct)}
          {listProduct.map(item => {
            return (
              <Product
                key={item.id}
                name={item.name}
                image={item.image}
                category={item.category}
                Price={item.price}
                productUnit={item.productUnit}
                discount={item.discount}
                onBuy={() => pushCart(item.id, (item.price - (item.price * (item.discount/100))))}
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
