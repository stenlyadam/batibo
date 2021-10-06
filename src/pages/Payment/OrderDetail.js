import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../utils';
import {FlatList} from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const Item = ({item, status}) => (
  status == true ?
  <View style={styles.itemContainer}>
    <Text style={styles.itemName}>{item.name} x {item.quantity}</Text>
    <Text style={styles.itemPrice}>{`Rp ${(item.price_after_discount*item.quantity).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</Text>
  </View>
  : 
  <View style={styles.itemContainer}>
    <Text style={styles.itemName}>{item.product.name} x {item.quantity}</Text>
    <Text style={styles.itemPrice}>{`Rp ${item.total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</Text>
  </View>
);

const OrderDetail = () => {

  const {orderFromDetail} = useSelector(state => state.orderReducer);
  const {checkout} = useSelector(state => state.loginReducer);
  const [selectedId, setSelectedId] = useState(null);

  const DATA = checkout;
  
  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    return (
      <Item
        status={orderFromDetail}
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{backgroundColor}}
      />
    );
  };

  return (
    <View style={styles.tabContainer}>
      <View>
        <View style={styles.detailTitle}>
          <Text style={styles.itemsTitle}>items</Text>
          <View style={styles.jumlahTitleContainer}>
            <Text style={styles.jumlahTitle}>Jumlah</Text>
          </View>
        </View>
        <View style={styles.lineItem} />
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
        <View style={styles.ongkirContainer}>
          <Text style={styles.itemName}>Ongkos Kirim</Text>
          <Text style={styles.itemPrice}>Rp 15.000</Text>
        </View>
      </View>
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 22,
    paddingBottom: 28
  },
  detailTitle: {
    flexDirection: 'row',
  },
  itemsTitle: {
    fontSize: 12,
    color: colors.text.primary,
    fontFamily: fonts.nunito.normal,
    opacity: 0.5,
  },
  jumlahTitleContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 47,
  },
  jumlahTitle: {
    fontSize: 12,
    color: colors.text.primary,
    fontFamily: fonts.nunito.normal,
    opacity: 0.5,
  },
  lineItem: {
    width: 315,
    height: 1,
    backgroundColor: colors.border,
    marginTop: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    flex: 1,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingBottom: 16,
    marginTop: 16,
  },
  itemName: {
    color: colors.text.primary,
    fontFamily: fonts.nunito.normal,
  },
  itemPrice: {
    flex: 1,
    textAlign: 'right',
    color: colors.text.tertiary,
    fontSize: 14,
    fontFamily: fonts.nunito.bold,
  },
  ongkirContainer: {
    flexDirection: 'row',
    marginVertical: 16,
  },
});
