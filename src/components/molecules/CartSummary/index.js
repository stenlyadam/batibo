import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils';
import {Button} from '../../atoms';

const CartSummary = ({totalPrice, onPress, disabledButton}) => {
  return (
    <View style={styles.container}>
      <View style={styles.cartIcon}>
        <Button type="icon-only" icon="icon-cart-green" borderRadius={4}/>
      </View>
      <View style={styles.summaryContainer}>
        <View style={styles.description}>
          <Text style={styles.totalBelanjaText}>Total Belanja </Text>
          <Text style={styles.totalPrice}>{totalPrice}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={onPress} title="Check Out" borderRadius={4} disabledButton={disabledButton}/>
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
    justifyContent: 'space-around',
    borderTopColor: colors.black,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 1,
    flex : 1,
  },
  cartIcon: {
    justifyContent: 'center',
  },
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10
  },
  description: {
    width: 100,
  },
  buttonContainer: {
    position: 'relative',
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
