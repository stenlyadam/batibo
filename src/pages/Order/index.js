import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {PageTitle} from '../../components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colors, fonts} from '../../utils';

const Tab = createMaterialTopTabNavigator();

const OnProcess = () => {
  return (
    <View style={styles.tabContainer}>
      <View style={styles.orderContainer}>
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
        <View style={styles.orderAmountContainer}>
          <Text style={styles.subTitleText}>Total Pembayaran</Text>
          <Text style={styles.orderAmount}>Rp. 140.000</Text>
        </View>
      </View>
    </View>
  );
};

const History = () => {
  return (
    <View style={styles.tabContainer}>
      <Text>History</Text>
    </View>
  );
};

const Order = ({navigation}) => {
  return (
    <SafeAreaView style={styles.page}>
      <PageTitle title="Order Saya" onBack={() => navigation.goBack()} />
      <View style={styles.contentWrapper}>
        <Tab.Navigator
          tabBarOptions={{
            labelStyle: {
              fontFamily: fonts.primary.normal,
              textTransform: 'capitalize',
            },
            indicatorStyle: {
              backgroundColor: colors.primary,
            },
          }}>
          <Tab.Screen
            name="OnProcess"
            component={OnProcess}
            options={{tabBarLabel: 'Dalam Proses'}}
          />
          <Tab.Screen
            name="History"
            component={History}
            options={{tabBarLabel: 'Riwayat Selesai'}}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentWrapper: {
    flex: 1,
    marginHorizontal: 24,
  },
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
});
