import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../utils';
import {FlatList} from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const Item = ({item, status}) => (
  // status == true ?
  // <View style={styles.itemContainer}>
  //   <Text style={styles.itemName}>{item.name} x {item.quantity}</Text>
  //   <Text style={styles.itemPrice}>{`Rp ${(item.price_after_discount*item.quantity).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</Text>
  // </View>
  // : 
  <View style={styles.itemContainer}>
    <Text style={styles.itemName}>{item.product.name} x {item.quantity}</Text>
    <Text style={styles.itemPrice}>{`Rp ${item.total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</Text>
  </View>
);

const OrderDetail = () => {

  const {orderFromDetail} = useSelector(state => state.orderReducer);
  const {checkout} = useSelector(state => state.loginReducer);
  const {ongkir} = useSelector(state => state.orderReducer);
  const [selectedId, setSelectedId] = useState(null);

  console.log('ongkir : ', ongkir)
  
  return (
    <View style={styles.tabContainer}>
        <View style={styles.detailTitle}>
          <Text style={styles.itemsTitle}>items</Text>
          <View style={styles.jumlahTitleContainer}>
            <Text style={styles.jumlahTitle}>Jumlah</Text>
          </View>
        </View>
        <View style={styles.lineItem} />
      
        <ScrollView showsVerticalScrollIndicator={false}>
          {checkout.map((item, idx) => {
            const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
              return(
                <Item
                key= {idx}
                status={orderFromDetail}
                item={item}
                onPress={() => setSelectedId(item.id)}
                style={{backgroundColor}}
              />
              )
          })}
          <View style={styles.ongkirContainer}>
            <Text style={styles.itemName}>Ongkos Kirim</Text>
            <Text style={styles.itemPrice}>{`Rp ${ongkir.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</Text>
          </View>
        </ScrollView>  

    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingBottom: 8,
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
