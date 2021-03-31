import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Button} from '../../components';
import {colors, fonts} from '../../utils';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {DummyBrokoliHijau} from '../../assets';
import OrderItem from './OrderItem';

const OnProcess = ({navigation}) => {
  return (
    <ScrollView style={styles.tabContainer}>
      <OrderItem
        status="Pesanan Dikirim"
        deliveryDate="18 Oktober 2020"
        press={() => navigation.navigate('Payment')}
      />
      {/* <TouchableOpacity
        style={styles.orderContainer}
        onPress={() => navigation.navigate('Payment')}>
        <View style={styles.orderStatusContainer}>
          <Text style={styles.orderStatusText}>Pesanan Dikirim</Text>
        </View>
        <View style={styles.orderDescriptionContainer}>
          <View>
            <Text style={styles.subTitleText}>Tanggal Pengiriman</Text>
            <Text style={styles.date}>18 Oktober 2020</Text>
          </View>
          <View>
            <Text style={styles.subTitleText}>ID Pesanan</Text>
            <Text style={styles.orderNumber}>GD-56789107899</Text>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.imageContainer}>
            <Image source={DummyBrokoliHijau} style={styles.image} />
          </View>
          <View style={styles.itemTitleContainer}>
            <Text style={styles.titleText}>Brokoli Hijau</Text>
            <View style={styles.itemPriceContainer}>
              <Text style={styles.itemWeight}>500gram</Text>
            </View>
          </View>
          <Text style={styles.itemPrice}>Rp 20.000</Text>
        </View>
        <View style={styles.moreItemContainer}>
          <Text style={styles.moreItemText}>Lihat Pesanan Lainnya</Text>
          <Button type="icon-only" icon="icon-arrow-bottom" />
        </View>
        <View style={styles.orderAmountContainer}>
          <Text style={styles.subTitleText}>Total Pembayaran</Text>
          <Text style={styles.orderAmount}>Rp. 140.000</Text>
        </View>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default OnProcess;

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 22,
  },
  orderContainer: {
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
  },
  orderStatusContainer: {
    backgroundColor: '#FFEEDE',
    padding: 12,
  },
  orderStatusText: {
    textAlign: 'center',
    fontFamily: fonts.primary[600],
    fontSize: 14,
  },
  orderDescriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: colors.border,
    borderTopWidth: 1,
    padding: 12,
  },
  orderAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: colors.border,
    borderTopWidth: 1,
    padding: 12,
  },
  subTitleText: {
    color: colors.text.primary,
    fontSize: 12,
    fontFamily: fonts.primary.normal,
  },
  date: {
    color: colors.text.primary,
    fontSize: 14,
    fontFamily: fonts.primary[700],
  },
  orderNumber: {
    color: colors.text.primary,
    fontSize: 14,
    fontFamily: fonts.primary[700],
  },
  orderAmount: {
    color: colors.text.tertiary,
    fontSize: 14,
    fontFamily: fonts.primary[700],
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 24,
    paddingHorizontal: 15,
    borderColor: colors.border,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  imageContainer: {
    height: 56,
    width: 56,
    borderColor: colors.lightGrey,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 17,
  },
  image: {
    height: 40,
    width: 50,
    left: 2,
  },
  itemTitleContainer: {
    justifyContent: 'space-between',
    marginRight: 90,
  },
  titleText: {
    fontFamily: fonts.nunito.bold,
    fontSize: 16,
    color: colors.text.primary,
  },
  itemWeight: {
    fontFamily: fonts.nunito.normal,
    fontSize: 12,
    color: colors.text.grey,
  },
  itemPrice: {
    fontFamily: fonts.nunito.bold,
    fontSize: 16,
    color: colors.text.tertiary,
    alignSelf: 'flex-end',
  },
  moreItemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  moreItemText: {
    fontFamily: fonts.nunito.semibold,
    color: colors.text.primary,
  },
});
