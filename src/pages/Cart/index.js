import React from 'react';
import {SafeAreaView, StyleSheet, View, Dimensions} from 'react-native';
import {PageTitle} from '../../components';
import {colors, fonts} from '../../utils';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Pesanan from './Pesanan';
import Dikirim from './Dikirim';

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
        </CartTab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  page: {
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
});
