import React from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import {IMGWortel} from '../../assets';
import {Button} from '../../components';
import {colors, fonts} from '../../utils';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const Detail = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground source={IMGWortel} style={styles.image}>
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
            <Text style={styles.title}>Wortel Oren</Text>
            <Text style={styles.category}>Sayuran</Text>
            <Text style={styles.originalPrice}>Rp 20.000</Text>
            <View style={styles.currentPriceContainer}>
              <Text style={styles.currentPrice}>Rp 10.000</Text>
              <Text style={styles.quantity}>/ 500 gr</Text>
            </View>
          </View>

          <View style={styles.discountContainer}>
            <Text style={styles.discount}>35%</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.text}>
              {`Tumbuhan biennial (siklus hidup 12 - 24 bulan) yang menyimpan karbohidrat dalam jumlah besar untuk tumbuhan tersebut berbunga pada tahun kedua. Batang bunga tumbuh setinggi sekitar 1 m, dengan bunga berwarna putih, dan rasa yang manis langu. Bagian yang dapat dimakan dari wortel adalah bagian umbi atau akarnya.

Wortel mengandung vitamin A yang baik untuk kesehatan mata. Mengkonsumsi wortel baik untuk penglihatan pada mata, terutama bisa meningkatkan pandangan jarak jauh. Selain vitamin A, wortel juga mengandung vitamin B1, B2, B3, B6, B9, dan C, kalsium, zat besi, magnesium, fosfor, kalium, dan sodium.`}
            </Text>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <View style={styles.centerContainer}>
            <View style={styles.cartButtonContainer}>
              <Button color="blue" type="icon-only" icon="icon-cart" borderRadius={4}/>
            </View>
            <TouchableOpacity style={styles.beliButtonContainer}>
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
