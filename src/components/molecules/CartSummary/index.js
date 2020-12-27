import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils';
import {Button} from '../../atoms';

const CartSummary = ({totalPrice, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <View style={styles.description}>
          <Text style={styles.totalBelanjaText}>Total Belanja </Text>
          <Text style={styles.totalPrice}>{totalPrice}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={onPress} title="Check Out" />
      </View>
    </View>
  );
};

export default CartSummary;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 17,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    borderTopColor: colors.black,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 1,
  },
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    paddingLeft: 12,
  },
  buttonContainer: {
    height: 38,
    width: 134,
    justifyContent: 'center',
  },
  totalBelanjaText: {
    color: colors.text.secondary,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.tertiary,
  },
});
