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
import { color } from 'react-native-reanimated';

const {width} = Dimensions.get('window');

const ProductSearch = ({
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
      </View>
      <View style={styles.buyButtonContainer}>
        <Button title="Beli" size={16} height={8} space={60} onPress={onBuy} borderRadius={4} style={styles.buyButton}/>
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
  },
  imageContainer: {
    padding: 8,
    width: width / 3.5,
    height: 62.5,
  },
  imageStyle: {
    width: width / 3.5,
    height: 62.5,
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
    marginLeft: 25,
    marginTop: 5,
    justifyContent: "center",
  },
  buyButtonContainer: { 
    marginHorizontal: 8,
    marginLeft: 20,
    marginTop: 5,
    justifyContent: "center",
  },
  buyButton: {
    padding: 10,
    marginLeft: 20,
  },
  productName: {
    fontSize: 14,
    marginTop: 4,
  },
  category: {
    fontSize: 11,
    color: '#49494959',
    marginBottom: 0,
  },
  originalPriceStyle: {
    fontSize: 8,
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
    marginRight: 6,
  },
  productUnit: {
    fontSize: 12,
  },
});
