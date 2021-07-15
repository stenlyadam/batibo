import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Button} from '../../components';
import {colors, fonts} from '../../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DummyBrokoliHijau} from '../../assets';

const OrderItem = ({navigation, status, deliveryDate = '-', press, id, image, price, firstItemPrice, firstItemUnit, title}) => {
  return (
    <TouchableOpacity style={styles.orderContainer} onPress={press}>
      <View style={styles.orderStatusContainer}>
        <Text style={styles.orderStatusText}>{status}</Text>
      </View>
      <View style={styles.orderDescriptionContainer}>
        <View>
          <Text style={styles.subTitleText}>Tanggal Pengiriman</Text>
          <Text style={styles.date}>{deliveryDate}</Text>
        </View>
        <View>
          <Text style={styles.subTitleText}>ID Pesanan</Text>
          <Text style={styles.orderNumber}>{id}</Text>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <View style={styles.itemTitleContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <View style={styles.itemPriceContainer}>
            <Text style={styles.itemWeight}>{firstItemUnit}</Text>
          </View>
        </View>
        <Text style={styles.itemPrice}>Rp {firstItemPrice}</Text>
      </View>
      <View style={styles.moreItemContainer}>
        <Text style={styles.moreItemText}>Lihat Pesanan Lainnya</Text>
        <Button type="icon-only" icon="icon-arrow-bottom" />
      </View>
      <View style={styles.orderAmountContainer}>
        <Text style={styles.subTitleText}>Total Pembayaran</Text>
        <Text style={styles.orderAmount}>Rp. {price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderItem;

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
    marginBottom: 20,
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
    paddingHorizontal: 16,
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
    marginRight: 70,
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
