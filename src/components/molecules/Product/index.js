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
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const Product = ({
  navigation,
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
          <Text style={styles.sellPrice}>Rp{PriceAfterDiscount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
          <Text style={styles.productUnit}>/ {productUnit}</Text>
        </View>
        <Button title="Beli" size={14} height={8} onPress={onBuy} borderRadius={4}/>
        <Gap height={20} />
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  productContainer: {
    position: 'relative',
    width: width / 2.5,
    elevation: 3,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    borderRadius: 4,
    marginVertical: 12,
  },
  imageContainer: {
    width: width / 2.5,
    height: 98,
  },
  imageStyle: {
    width: width / 2.5,
    height: 98,
    resizeMode: 'cover',
  },
  discountContainer: {
    width: 42,
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
    fontWeight: 'bold',
  },
  productDetails: {
    marginHorizontal: 8,
  },
  productName: {
    fontSize: 14,
    marginTop: 4,
  },
  category: {
    fontSize: 11,
    color: '#49494959',
    marginBottom: 8,
  },
  originalPriceStyle: {
    fontSize: 8,
    color: '#00000093',
    textDecorationLine: 'line-through',
  },
  productPrice: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  sellPrice: {
    fontSize: 12,
    color: '#FF7D1F',
    marginRight: 6,
  },
  productUnit: {
    fontSize: 12,
  },
});
