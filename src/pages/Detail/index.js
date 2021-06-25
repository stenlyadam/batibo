import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import {Button} from '../../components';
import {colors, fonts, getData} from '../../utils';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {firebase} from '../../config';

const pushCart = (itemId, userId) => {
  firebase
    .database()
    .ref(`users/${userId}/cart/${itemId}`)
    .set({id: `${itemId}`, count: 1})

    .catch(error => {
      showError(error.message);
    });
}

const Detail = ({navigation, route}) => {
  const item = route.params;

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    uid: ''
  });

  useEffect(() => {
    getData('user').then(response => {
      const data = response;
      console.log('profile data: ', data);
      setForm(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground source={{uri: item.image}} style={styles.image}>
          <View style={styles.backButtonContainer}>
            <Button
              type="icon-only"
              icon="icon-arrow-back"
              style={styles.backButton}
              onPress={() => navigation.navigate('HomeScreen')}
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
            <Text style={styles.originalPrice}>Rp {item.price}</Text>
            <View style={styles.currentPriceContainer}>
              <Text style={styles.currentPrice}>Rp {item.price-(item.price*(item.discount/100))}</Text>
              <Text style={styles.quantity}>/ {item.productUnit}</Text>
            </View>
          </View>

          <View style={styles.discountContainer}>
            <Text style={styles.discount}>{item.discount}%</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.text}>
              {item.detail}
            </Text>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <View style={styles.centerContainer}>
            <View style={styles.cartButtonContainer}>
              <Button color="blue" type="icon-only" icon="icon-cart" borderRadius={4} onPress={() => navigation.navigate('Cart')}/>
            </View>
            <TouchableOpacity style={styles.beliButtonContainer} onPress={() => pushCart(item.id, form.uid)}>
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
    backgroundColor: 'red',
    height: 375,
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
  image: {
    flex: 1,
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
    marginTop: 8,
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
