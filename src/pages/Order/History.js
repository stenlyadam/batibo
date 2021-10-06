import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import {Button} from '../../components';
import {colors, fonts} from '../../utils';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import OrderItem from './OrderItem';
import {firebase} from '../../config';
import { useDispatch, useSelector } from "react-redux";

const OnProcess = ({navigation, status}) => {

  const user = useSelector(state => state.user);

  const [listOrder, setListOrder] = useState([]);

  // useEffect(() => {
  //   setListOrder([])

  //   firebase
  //     .database()
  //     .ref(`users/${user.uid}/order/`)
  //     .once(`value`)
  //     .then(response => {
  //       if(response.val()){
  //         const obj = response.val()
  //         const status = "Selesai";
  //         let arr = Object.keys(obj).map((k) => obj[k])
  //         console.log('order: ', arr)
  //         arr = arr.filter( i => status.includes( i.status ) );
  //         console.log("orderFiltered: ", arr)
  //         setListOrder(arr)
  //       }
  //       })

  // }, [])

  return (
    <View>
      <Text>Hallo History</Text>
    </View>
    // <FlatList style={styles.tabContainer}
    //   keyExtractor={(item) => item.id}
    //   data={listOrder}
    //   renderItem={({item}) => (
    //       <OrderItem
    //         id={item.id}
    //         image={{uri: item.image}}
    //         title={item.title}
    //         price={(item.totalPrice + item.deliveryCost)}
    //         status={item.status}
    //         deliveryDate="18 Oktober 2020"
    //         firstItemPrice={item.firstItemPrice}
    //         firstItemUnit= {item.firstItemUnit}
    //         press={() => navigation.navigate('Payment')}
    //       />
    //     )}
    // />
  );
};

export default OnProcess;

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 22,
  },
  orderContainer: {
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
  },
  orderStatusContainer: {
    backgroundColor: '#FFEEDE',
    padding: 12,
  },
  orderStatusText: {
    textAlign: 'center',
    fontFamily: fonts.primary[600],
    fontSize: 14,
  },
  orderDescriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: colors.border,
    borderTopWidth: 1,
    padding: 12,
  },
  orderAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: colors.border,
    borderTopWidth: 1,
    padding: 12,
  },
  subTitleText: {
    color: colors.text.primary,
    fontSize: 12,
    fontFamily: fonts.primary.normal,
  },
  date: {
    color: colors.text.primary,
    fontSize: 14,
    fontFamily: fonts.primary[700],
  },
  orderNumber: {
    color: colors.text.primary,
    fontSize: 14,
    fontFamily: fonts.primary[700],
  },
  orderAmount: {
    color: colors.text.tertiary,
    fontSize: 14,
    fontFamily: fonts.primary[700],
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 24,
    paddingHorizontal: 15,
    borderColor: colors.border,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  imageContainer: {
    height: 56,
    width: 56,
    borderColor: colors.lightGrey,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 17,
  },
  image: {
    height: 40,
    width: 50,
    left: 2,
  },
  itemTitleContainer: {
    justifyContent: 'space-between',
    marginRight: 90,
  },
  titleText: {
    fontFamily: fonts.nunito.bold,
    fontSize: 16,
    color: colors.text.primary,
  },
  itemWeight: {
    fontFamily: fonts.nunito.normal,
    fontSize: 12,
    color: colors.text.grey,
  },
  itemPrice: {
    fontFamily: fonts.nunito.bold,
    fontSize: 16,
    color: colors.text.tertiary,
    alignSelf: 'flex-end',
  },
  moreItemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  moreItemText: {
    fontFamily: fonts.nunito.semibold,
    color: colors.text.primary,
  },
});
