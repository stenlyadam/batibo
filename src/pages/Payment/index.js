import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, Dimensions} from 'react-native';
import {Button, Gap, PageTitle} from '../../components';
import {colors, fonts} from '../../utils';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OrderDetail from './OrderDetail';
import DeliveryDetail from './DeliveryDetail';

const Tab = createMaterialTopTabNavigator();

const Payment = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <PageTitle title="Ringkasan Pesanan" onBack={() => navigation.goBack()} />
      <View style={styles.summaryContainer}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>amount</Text>
          <View style={styles.rpTextContainer}>
            <Text style={styles.rpText}>Rp</Text>
          </View>
          <View style={styles.priceTextContainer}>
            <Text style={styles.priceText}>140.000</Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.orderIdContainer}>
          <Text style={styles.idPesananText}>ID Pesanan</Text>
          <View style={styles.idContainer}>
            <Text style={styles.idText}>GD-56789107899</Text>
          </View>
        </View>
      </View>

      <View style={styles.contentWrapper}>
        <Tab.Navigator
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
          <Tab.Screen
            name="OrderDetail"
            component={OrderDetail}
            options={{tabBarLabel: 'Detail Order'}}
          />
          <Tab.Screen
            name="DeliveryDetail"
            component={DeliveryDetail}
            options={{tabBarLabel: 'Detail Pengiriman'}}
          />
        </Tab.Navigator>
      </View>
      <View style={styles.bottomWrapper}>
        <View style={styles.nextContainer}>
          <View style={styles.next}>
            <Button title="Selanjutnya" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 32,
  },
  summaryContainer: {
    height: 96,
    width: 347,
    borderRadius: 8,
    backgroundColor: 'white',
    marginTop: 40,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.grey,
    paddingBottom: 80,
    shadowColor: colors.text.grey,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 15,
  },
  amountContainer: {
    flexDirection: 'row',
    width: 310,
    height: 27,
    marginTop: 16,
    marginHorizontal: 16,
  },
  amountText: {
    color: colors.text.quartenary,
    fontSize: 16,
    fontFamily: fonts.nunito.semibold,
  },
  priceTextContainer: {
    justifyContent: 'center',
    paddingBottom: 8,
  },
  priceText: {
    color: colors.text.quartenary,
    fontSize: 24,
    fontFamily: fonts.nunito.semibold,
  },
  rpTextContainer: {
    alignItems: 'flex-end',
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  rpText: {
    color: colors.text.quartenary,
    fontSize: 16,
    fontFamily: fonts.nunito.semibold,
  },
  line: {
    backgroundColor: colors.text.quartenary,
    width: 347,
    height: 1,
    marginTop: 5,
  },
  orderIdContainer: {
    height: 16,
    width: 310,
    flexDirection: 'row',
    marginVertical: 13,
    marginHorizontal: 16,
  },
  idContainer: {
    alignItems: 'flex-end',
    flex: 1,
  },
  idPesananText: {
    fontSize: 12,
    color: colors.text.secondary,
    fontFamily: fonts.nunito.semibold,
  },
  idText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontFamily: fonts.nunito.semibold,
  },
  contentWrapper: {
    backgroundColor: colors.white,
    width: 347,
    height: 260,
    alignSelf: 'center',
    marginTop: 17,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grey,
    paddingHorizontal: 15,
    shadowColor: colors.text.grey,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 15,
  },
  bottomWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  nextContainer: {
    borderColor: colors.grey,
    borderWidth: 1,
    height: 76,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
  },
  next: {
    marginHorizontal: 24,
  },
});
