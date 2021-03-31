import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import OrderItem from './OrderItem';

const OnProcess = ({navigation}) => {
  return (
    <ScrollView style={styles.tabContainer}>
      <OrderItem
        status="Pesanan Dikirim"
        deliveryDate="18 Oktober 2020"
        press={() => navigation.navigate('Payment')}
      />
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
});
