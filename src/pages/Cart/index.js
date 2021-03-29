import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import {DummyBrokoliHijau} from '../../assets';
import {CartItem, CartSummary, PageTitle, CheckBox} from '../../components';
import {colors, fonts} from '../../utils';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const Dikirim = () => {
  return (
    <View style={styles.dikirimContainer}>
      <View style={styles.deliveryListContainer}>
        <View style={styles.cardWrapper}>
          <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
              <Image source={DummyBrokoliHijau} style={styles.picture} />
            </View>
            <View style={styles.deliveryTextContainer}>
              <Text style={styles.deliveryTitle}>Brokoli Hijau</Text>
              <View style={styles.line} />
              <View style={styles.deliveryCardBottomContainer}>
                <View>
                  <Text style={styles.deliverySubText}>Total Belanja</Text>
                  <Text style={styles.deliveryTotalText}>Rp 70.000</Text>
                </View>
                <TouchableOpacity style={styles.deliveryButton}>
                  <Text style={styles.buttonTitle}>Dalam Pengiriman</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const Dibatalkan = () => {
  return (
    <View>
      <Text>Dibatalkan</Text>
    </View>
  );
};
const Pesanan = ({navigation}) => {
  return (
    <View style={styles.pesananContainer}>
      <ScrollView style={styles.cartContainer}>
        <View style={styles.cartItemContainer}>
          <View style={styles.checkBoxContainer}>
            <CheckBox />
            <Text style={styles.checkBoxText}>Pilih Semua</Text>
          </View>
          <CartItem
            image={DummyBrokoliHijau}
            name="Brokoli Hijau"
            weight="500 gr"
            originalPrice="Rp. 20.000"
            currentPrice="Rp. 10.000"
          />
          <CartItem
            image={DummyBrokoliHijau}
            name="Brokoli Hijau"
            weight="500 gr"
            originalPrice="Rp. 20.000"
            currentPrice="Rp. 10.000"
          />
          <CartItem
            image={DummyBrokoliHijau}
            name="Brokoli Hijau"
            weight="500 gr"
            originalPrice="Rp. 20.000"
            currentPrice="Rp. 10.000"
          />
          <CartItem
            image={DummyBrokoliHijau}
            name="Brokoli Hijau"
            weight="500 gr"
            originalPrice="Rp. 20.000"
            currentPrice="Rp. 10.000"
          />
        </View>
      </ScrollView>
      <View style={styles.cartSummaryContainer}>
        <CartSummary
          totalPrice="Rp. 145.000"
          onPress={() => navigation.navigate('Checkout')}
        />
      </View>
    </View>
  );
};

const CartTab = createMaterialTopTabNavigator();

const Cart = ({navigation}) => {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.pageTitle}>
        <PageTitle title="Keranjang" />
      </View>

      <View style={styles.contentWrapper}>
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
          <CartTab.Screen
            name="Dibatalkan"
            component={Dibatalkan}
            options={{tabBarLabel: 'Dibatalkan'}}
          />
        </CartTab.Navigator>
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
  cartItemContainer: {
    paddingHorizontal: 24,
  },
  cartContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentWrapper: {
    width: windowWidth,
    flex: 1,
    alignSelf: 'center',
    marginTop: 32,
  },
  pageTitle: {
    marginTop: 32,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkBoxText: {
    marginLeft: 14,
    fontFamily: fonts.nunito.semibold,
    fontSize: 14,
  },

  cartSummaryContainer: {
    backgroundColor: colors.white,
  },
  pesananContainer: {flex: 1},
  dikirimContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  deliveryListContainer: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 12,
  },

  picture: {
    width: 107,
    height: 67,
  },
  cardWrapper: {
    backgroundColor: colors.white,
    padding: 10,
    elevation: 10,
    borderRadius: 10,
    height: 110,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
  },
  deliveryTextContainer: {
    // flexDirection: 'row',
  },
  deliveryCardBottomContainer: {
    flexDirection: 'row',
    width: 250,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  deliveryButton: {
    backgroundColor: colors.button.green,
    paddingVertical: 7,
    width: 130,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: colors.white,
    fontFamily: fonts.nunito.semibold,
  },
  deliveryTitle: {
    fontFamily: fonts.nunito.bold,
    fontSize: 18,
    color: colors.text.primary,
  },
  deliverySubText: {
    fontSize: 12,
    fontFamily: fonts.nunito.normal,
    color: colors.text.grey,
  },
  deliveryTotalText: {
    fontFamily: fonts.nunito.bold,
    fontSize: 18,
    color: colors.text.tertiary,
  },
  line: {
    marginTop: 10,
    width: 250,
    backgroundColor: colors.grey,
    height: 1,
  },
});
