import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DummyBrokoliHijau} from '../../assets';
import {CartItem, CartSummary} from '../../components';
import {colors} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';

const Pesanan = ({navigation}) => {
  return (
    <View style={styles.pesananContainer}>
      <ScrollView style={styles.cartContainer}>
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

export default Pesanan;

const styles = StyleSheet.create({
  cartItemContainer: {
    paddingHorizontal: 24,
  },
  cartContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  cartSummaryContainer: {
    backgroundColor: colors.white,
  },
  pesananContainer: {
    flex: 1,
  },
});
