import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Button, Gap} from '../../../components';
import { colors } from '../../../utils';

const {width} = Dimensions.get('window');

const ProductSearch = ({
  navigation,
  disabledButton,
  name,
  image,
  category,
  discount,
  Price,
  PriceAfterDiscount,
  productUnit,
  onBuy,
  onDetail,
}) => {
  return (
    <View style={styles.productContainer}>
      <View style={styles.imageContainer}>
        <View style={styles.discountContainer}>
          <Text style={styles.discountText}>{discount}%</Text>
        </View>
        <TouchableOpacity onPress={onDetail}>
          <Image style={styles.imageStyle} source={image} />
        </TouchableOpacity>
      </View>
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.originalPriceStyle}>Rp{Price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
        <View style={styles.productPrice}>
          {/* <Text style={styles.sellPrice}>Rp{(Price - (Price*(discount/100))).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text> */}
          <Text style={styles.sellPrice}>Rp{PriceAfterDiscount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
          <Text style={styles.productUnit}>/ {productUnit}</Text>
        </View>
      </View>
      <View style={styles.buyButtonContainer}>
        <Button title="Beli" size={14} height={15} space={50} onPress={onBuy} borderRadius={4} style={styles.buyButton} disabledButton={disabledButton}/>
      </View>
    </View>
  );
};

export default ProductSearch;

const styles = StyleSheet.create({
  productContainer: {
    position: 'relative',
    width: width / 1.15,
    elevation: 3,
    backgroundColor: '#FFFFFF',
    marginBottom: 5,
    borderRadius: 4,
    marginVertical: 12,
    flexDirection: "row",
    alignContent:"center",
    justifyContent:'space-around'
  },
  imageContainer: {
    padding: 8,
    width: width / 3.5,
    height: 62.5,
  },
  imageStyle: {
    marginLeft:-8,
    width: width / 3.5,
    height: 62.5,
    resizeMode: 'cover',
    borderRadius: 4,
  },
  discountContainer: {
    marginTop:8,
    width: 32,
    height: 25,
    position: 'absolute',
    backgroundColor: 'green',
    zIndex: 2,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  productDetails: {
    width: 115,
    maxWidth: 115,
    justifyContent: "center",
  },
  buyButtonContainer: { 
    marginVertical: 5,
    justifyContent: "center",
  },
  productName: {
    fontSize: 14,
    marginTop: 4,
  },
  category: {
    fontSize: 10,
    color: '#49494959',
    marginTop: -2,
  },
  originalPriceStyle: {
    marginTop: 4,
    fontSize: 10,
    color: '#00000093',
    textDecorationLine: 'line-through',
  },
  productPrice: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  sellPrice: {
    fontSize: 12,
    color: '#FF7D1F',
  },
  productUnit: {
    color: colors.grey,
    fontSize: 12,
  },
});
