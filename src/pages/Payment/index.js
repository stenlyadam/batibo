import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {IMGOrderSuccess} from '../../assets';
import {Button, Gap, PageTitle} from '../../components';
import {colors, fonts} from '../../utils';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
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

const Tab = createMaterialTopTabNavigator();

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

const DeliveryDetail = () => {
  return (
    <View style={styles.tabContainer}>
      <View style={styles.deliveryDetailContainer}>
        <View style={styles.deliveryLeftContainer}>
          <Text style={styles.deliveryTitle}>Nama</Text>
          <Text style={styles.deliveryText}>Amir Mahfudi</Text>
          <Text style={styles.deliveryTitle}>Nomor Handphone</Text>
          <Text style={styles.deliveryText}>+628889999123</Text>
          <Text style={styles.deliveryTitle}>Email</Text>
          <Text style={styles.deliveryText}>amir@gmail.com</Text>
        </View>
        <View style={styles.deliveryRightContainer}>
          <Text style={styles.deliveryTitle}>Alamat</Text>
          <Text style={styles.deliveryText}>
            Jl. Cilandak Town Square No.2, RT.2/RW.1, Cilandak Bar., Kec.
            Cilandak, Jakarta Selatan
          </Text>
        </View>
      </View>
    </View>
  );
};

const Payment = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <PageTitle title="Ringkasan Pesanan" onBack={() => navigation.goBack()} />
      <View style={styles.summaryContainer}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>amount</Text>
          <View style={styles.rpTextContainer}>
            <Text style={styles.rpText}>Rp</Text>
          </View>
          <View style={styles.priceTextContainer}>
            <Text style={styles.priceText}>140.000</Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.orderIdContainer}>
          <Text style={styles.idPesananText}>ID Pesanan</Text>
          <View style={styles.idContainer}>
            <Text style={styles.idText}>GD-56789107899</Text>
          </View>
        </View>
      </View>

      <View style={styles.contentWrapper}>
        <Tab.Navigator
          tabBarOptions={{
            labelStyle: {
              fontFamily: fonts.primary.normal,
              textTransform: 'capitalize',
              fontSize: 14,
              fontWeight: '600',
            },
            indicatorStyle: {
              backgroundColor: colors.button.green,
            },
          }}>
          <Tab.Screen
            name="OrderDetail"
            component={OrderDetail}
            options={{tabBarLabel: 'Detail Order'}}
          />
          <Tab.Screen
            name="DeliveryDetail"
            component={DeliveryDetail}
            options={{tabBarLabel: 'Detail Pengiriman'}}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 32,
  },
  summaryContainer: {
    height: 96,
    width: 347,
    borderRadius: 8,
    backgroundColor: 'white',
    marginTop: 40,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.grey,
    paddingBottom: 80,

    shadowColor: colors.text.grey,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 15,
  },
  amountContainer: {
    flexDirection: 'row',
    width: 310,
    height: 27,
    marginTop: 16,
    marginHorizontal: 16,
  },
  amountText: {
    color: colors.text.quartenary,
    fontSize: 16,

    fontFamily: fonts.nunito.semibold,
  },
  priceTextContainer: {
    justifyContent: 'center',
    paddingBottom: 8,
  },
  priceText: {
    color: colors.text.quartenary,
    fontSize: 24,
    fontFamily: fonts.nunito.semibold,
  },
  rpTextContainer: {
    alignItems: 'flex-end',
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  rpText: {
    color: colors.text.quartenary,
    fontSize: 16,
    fontFamily: fonts.nunito.semibold,
  },
  line: {
    backgroundColor: colors.text.quartenary,
    width: 347,
    height: 1,
    marginTop: 5,
  },
  orderIdContainer: {
    height: 16,
    width: 310,
    flexDirection: 'row',
    marginVertical: 13,
    marginHorizontal: 16,
  },
  idContainer: {
    alignItems: 'flex-end',
    flex: 1,
  },
  idPesananText: {
    fontSize: 12,
    color: colors.text.secondary,
    fontFamily: fonts.nunito.semibold,
  },
  idText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontFamily: fonts.nunito.semibold,
  },

  contentWrapper: {
    backgroundColor: colors.white,
    width: 347,
    height: 260,
    alignSelf: 'center',
    marginTop: 17,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grey,
    paddingHorizontal: 15,

    shadowColor: colors.text.grey,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 15,
  },
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

  deliveryDetailContainer: {
    flexDirection: 'row',
  },
  deliveryLeftContainer: {
    flex: 1,
  },
  deliveryRightContainer: {
    flex: 1,
  },
  deliveryTitle: {
    fontFamily: fonts.nunito.normal,
    fontSize: 12,
    color: colors.text.grey,
    opacity: 0.5,
    marginBottom: 8,
  },
  deliveryText: {
    fontFamily: fonts.nunito.normal,
    fontSize: 14,
    color: colors.text.grey,
    marginBottom: 8,
  },
});
