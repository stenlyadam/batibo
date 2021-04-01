import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils';
import {CheckBox} from '../../atoms';
import Counter from '../Counter';

const CartItem = ({image, name, weight, originalPrice, currentPrice, id}) => {
  return (
    <View style={styles.container}>
      <CheckBox />

      <View style={styles.productImageContainer}>
        <Image source={image} style={styles.productImage} />
      </View>
      <View style={styles.productDescriptionContainer}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productWeight}>{weight}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>{originalPrice}</Text>
          <Text style={styles.currentPrice}>{currentPrice}</Text>
        </View>
      </View>
      <View style={styles.counterContainer}>
        <Counter />
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 24,
    borderBottomColor: colors.border,
    borderBottomWidth: 2,
  },
  productImageContainer: {
    justifyContent: 'center',
  },
  productImage: {
    height: 67,
    width: 107,
  },
  productName: {
    fontWeight: '700',
    fontSize: 16,
  },
  productWeight: {
    fontWeight: '400',
    fontSize: 12,
    color: colors.text.secondary,
  },
  productDescriptionContainer: {
    flex: 1,
  },
  priceContainer: {
    marginTop: 13,
  },
  originalPrice: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.58)',
    textDecorationLine: 'line-through',
  },
  currentPrice: {
    fontSize: 16,
    color: colors.text.tertiary,
    fontWeight: 'bold',
  },
  counterContainer: {
    justifyContent: 'flex-end',
  },
});
