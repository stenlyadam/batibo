import React, { useEffect } from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {PageTitle} from '../../components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colors, fonts} from '../../utils';
import OnProcess from './OnProcess';
import History from './History';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getOnProcess, getOrders, getHistory, setLoading } from '../../redux/action';

const Tab = createMaterialTopTabNavigator();

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
});
