import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {DummyBrokoliHijau} from '../../assets';
import {Gap, Product, SearchBox, Carousel} from '../../components';
import Category from '../../components/molecules/Category';
import {colors, fonts, getData} from '../../utils';
import {firebase} from '../../config';

const HomeScreen = ({navigation}) => {

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    getData('user').then(response => {
      const data = response;
      console.log('profile data: ' + data);
      setForm(data);

      firebase
      .database()
      .ref('products/')
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
    });
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Halo {form.username}</Text>
        <Text style={styles.welcomeText}>Pilih Sayuran-mu disini</Text>
        <Gap height={5} />
        <SearchBox label="Cari yang kamu butuhkan" />
        {/* <Gap height={32} /> */}
        <Carousel />
      </View>
      <View style={styles.categoryContainer}>
        <Category title="sayuran" />
        <Category title="buah" />
        <Category title="rempah" />
        <Category title="lainnya" />
      </View>
      <Text style={styles.titleText}>Sedang Diskon</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.productContainer}>
          {listProduct.map(item => {
            console.log(item.image);
            return (
              
              <Product
              name={item.name}
              image={item.image}
              category={item.category}
              Price={item.price}
              productUnit={item.productUnit}
              discount={item.discount}
              onBuy={() => navigation.navigate('Cart')}
              onDetail={() => navigation.navigate('Detail')}
            /> 
            
            )
          })}
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
});
