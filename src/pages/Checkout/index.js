import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView} from 'react-native';
import {DummyBrokoliHijau, DummyJerukBali} from '../../assets';
import {Button, CartItem, PageTitle} from '../../components';
import {colors} from '../../utils';

const Checkout = ({navigation}) => {
  return (
    <SafeAreaView style={styles.page}>
      <PageTitle title="Checkout" onBack={() => navigation.goBack()} />
      <View style={styles.pageContainer}>
        <ScrollView>
          <View>
            <View style={styles.deliverContainer}>
              <Text style={styles.deliver}>Pesanan</Text>
              <CartItem
                image={DummyBrokoliHijau}
                name="Brokoli Hijau"
                weight="500 gram"
                originalPrice="Rp. 20.000"
                currentPrice="Rp. 10.000"
              />
              <CartItem
                image={DummyJerukBali}
                name="Jeruk Bali"
                weight="500 gram"
                originalPrice="Rp. 40.000"
                currentPrice="Rp. 35.000"
              />
            </View>
            <View style={styles.deliverContainer}>
              <Text style={styles.deliver}>Pembayaran</Text>
              {/* <Text style={styles.subTitle}>Metode Pembayaran</Text> */}
              <Text style={styles.subTitle}>Ringkasan Pembayaran</Text>
              <View style={styles.paymentSummary}>
                <Text style={styles.paymentSummaryCategory}>Total Belanja</Text>
                <Text style={styles.priceSummary}>Rp 125.000</Text>
              </View>
              <View style={styles.paymentSummary}>
                <Text style={styles.paymentSummaryCategory}>Ongkos Kirim</Text>
                <Text style={styles.priceSummary}>Rp 15.000</Text>
              </View>
              <View style={styles.totalPayment}>
                <Text style={styles.totalPaymentText}>Total Pembayaran</Text>
                <Text style={styles.totalPrice}>Rp 140.000</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.paymentButton}>
          <Button title="Pesan Sekarang" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  deliverContainer: {marginHorizontal: 24},
  deliver: {
    marginTop: 16,
    marginBottom: 16,
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.text.quartenary,
  },
  subTitle: {
    marginVertical: 12,
    fontWeight: '600',
    fontSize: 16,
    color: 'rgba(0,0,0,0.7)',
  },
  buttonContainer: {flexDirection: 'row', justifyContent: 'flex-start'},
  paymentSummary: {flexDirection: 'row', justifyContent: 'space-between'},
  paymentSummaryCategory: {fontSize: 16, opacity: 0.5},
  priceSummary: {color: '#202020', fontWeight: 'bold', fontSize: 16},
  totalPayment: {
    marginTop: 32,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
  totalPaymentText: {fontSize: 16, opacity: 0.5},
  totalPrice: {color: colors.text.tertiary, fontWeight: 'bold', fontSize: 16},
  paymentButton: {marginHorizontal: 24, marginBottom: 16},
});
