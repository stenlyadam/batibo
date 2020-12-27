import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {DummyBrokoliHijau} from '../../assets';
import {CartItem, CartSummary, PageTitle} from '../../components';
import {colors} from '../../utils';

const Cart = ({navigation}) => {
  return (
    <SafeAreaView style={styles.page}>
      <PageTitle
        title="Keranjang"
        backButton
        onBack={() => navigation.goBack()}
      />
      <View style={styles.cartContainer}>
        <View style={styles.cartItemContainer}>
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
        <CartSummary
          totalPrice="Rp. 145.000"
          onPress={() => navigation.navigate('Checkout')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  cartItemContainer: {
    paddingHorizontal: 24,
  },
  cartContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
});
