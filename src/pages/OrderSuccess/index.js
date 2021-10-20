import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import {IMGOrderSuccess} from '../../assets';
import {Button, Gap, PageTitle} from '../../components';
import {colors, fonts} from '../../utils';

const {width} = Dimensions.get('window');

const OrderSuccess = ({navigation, route}) => {
  const {orderTemp} = useSelector(state => state.orderReducer);
  console.log('order tempo: ', orderTemp);
  // console.log(route.params)
  // const totalPrice = route.params.price;
  // const orderKey = route.params.key;
  return (
    <SafeAreaView style={styles.page}>
      <Gap height={8} />
      <PageTitle title="Order Sukses" onBack={() => navigation.goBack()} />
      <View style={styles.contentWrapper}>
        <View>
          <View style={styles.imageContainer}>
            <Image source={IMGOrderSuccess} style={styles.image} />
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.totalAmountText}>Total Tagihan</Text>
            <Text style={styles.totalAmount}>Rp. {orderTemp.total}</Text>
            <Gap height={12} />
            <Text style={styles.orderNumber}>
              No. Order : {orderTemp.uid}
            </Text>
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Lihat Orderan Saya"
            onPress={() => navigation.navigate('Order')}
            borderRadius={4}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageContainer: {
    marginTop: 80,
    alignItems: 'center',
  },
  image: {
    width: width / 2,
    height: width / 2,
  },
  amountContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    marginHorizontal: 24,
    marginTop: 40,
    padding: 24,
  },
  totalAmountText: {
    fontFamily: fonts.primary.normal,
    fontSize: 16,
    color: colors.text.secondary,
  },
  totalAmount: {
    fontFamily: fonts.primary[700],
    fontSize: 22,
  },
  orderNumber: {
    fontFamily: fonts.primary.normal,
  },
  buttonWrapper: {
    margin: 24,
  },
});
