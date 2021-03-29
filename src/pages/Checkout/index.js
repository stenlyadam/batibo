import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView} from 'react-native';
import {DummyBrokoliHijau, DummyJerukBali} from '../../assets';
import {Button, CartItem, PageTitle, CheckBox} from '../../components';
import {colors, fonts} from '../../utils';

const Checkout = ({navigation}) => {
  return (
    <SafeAreaView style={styles.page}>
      <PageTitle
        title="Checkout"
        backButton
        onBack={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.pageContainer}>
          <View style={styles.deliveryContainer}>
            <Text style={styles.deliver}>Pengiriman</Text>
            <Text style={styles.subTitle}>Alamat Pengiriman</Text>
            <View style={styles.dropdownContainer}>
              <Text style={styles.paymentSummaryCategory}>Pilih Alamat</Text>
              <Button type="icon-only" icon="icon-arrow-right" />
            </View>
          </View>

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
        </View>
      </ScrollView>

      <View style={styles.paymentButton}>
        <Button title="Pesan Sekarang" />
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  deliveryContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  dropdownContainer: {
    backgroundColor: colors.lightGrey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 240,
  },

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
    fontFamily: fonts.nunito.semibold,
    marginTop: 16,
    marginBottom: 16,
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.text.quartenary,
  },
  subTitle: {
    fontFamily: fonts.nunito.semibold,
    marginVertical: 12,
    fontWeight: '600',
    fontSize: 16,
    color: 'rgba(0,0,0,0.7)',
  },
  buttonContainer: {flexDirection: 'row', justifyContent: 'flex-start'},
  paymentSummary: {flexDirection: 'row', justifyContent: 'space-between'},
  paymentSummaryCategory: {
    fontFamily: fonts.nunito.semibold,
    fontSize: 16,
    opacity: 0.5,
  },
  priceSummary: {
    color: '#202020',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: fonts.nunito.semibold,
  },
  totalPayment: {
    marginTop: 32,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
  totalPaymentText: {
    fontFamily: fonts.nunito.semibold,
    fontSize: 16,
    opacity: 0.5,
  },
  totalPrice: {
    fontFamily: fonts.nunito.semibold,
    color: colors.text.tertiary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  paymentButton: {marginHorizontal: 24, marginBottom: 16},
  // button: {
  //   backgroundColor: 'red',
  // },
});
