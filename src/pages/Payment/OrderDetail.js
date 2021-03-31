import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../utils';
import {FlatList} from 'react-native-gesture-handler';

const DATA = [
  {
    id: '1',
    name: 'Brokoli Hijau (500 gr)',
    price: 'Rp 20.000',
  },
  {
    id: '2',
    name: 'Jeruk Bali (1.500 gr)',
    price: 'Rp 105.000',
  },
];

const Item = ({item, onPress, style}) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemName}>{item.name}</Text>
    <Text style={styles.itemPrice}>{item.price}</Text>
  </View>
);

const OrderDetail = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';

    return (
      <Item
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
    paddingTop: 22,
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
