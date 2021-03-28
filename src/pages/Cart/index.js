import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Dimensions} from 'react-native';
import {DummyBrokoliHijau} from '../../assets';
import {CartItem, CartSummary, PageTitle} from '../../components';
import {colors, fonts} from '../../utils';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CheckBox from '@react-native-community/checkbox';
import {ScrollView} from 'react-native-gesture-handler';

const Dikirim = () => {
  return (
    <View>
      <Text>Dikirim</Text>
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
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <View style={styles.pesananContainer}>
      <ScrollView style={styles.cartContainer}>
        <View style={styles.cartItemContainer}>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              tintColors={{
                true: colors.button.green,
                false: colors.button.green,
              }}
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
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
const windowHeight = Dimensions.get('window').height;

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
});
