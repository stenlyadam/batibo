import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils';
import Counter from '../Counter';
import {CheckBox} from '../../atoms';

const CartItem = ({image, name, weight, originalPrice, currentPrice, id, productId, count, checkout, orderFromDetail, detail}) => {
  return (
    <View style={styles.container}>
      <View style={styles.productImageContainer}>
        <Image source={image} style={styles.productImage} />
      </View>
      <View style={styles.productDescriptionContainer}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productWeight}>{weight}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>Rp.{originalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
          <Text style={styles.currentPrice}>Rp.{currentPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
        </View>
      </View>
      <View style={styles.counterContainer}>
        <Counter itemCount={count} itemId={id} productId={productId} itemPrice={currentPrice} checkout={checkout} orderFromDetail={orderFromDetail} detail={detail}/>
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
    paddingRight: 10,
  },
  productImage: {
    height: 67,
    width: 97,
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
    maxWidth: 115,
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
    alignItems:'center',
    justifyContent: 'flex-end',
  },
});
