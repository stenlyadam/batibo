import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import {Button} from '../../components';
import {colors, fonts} from '../../utils';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import OrderItem from './OrderItem';
import {firebase} from '../../config';
import { useDispatch, useSelector } from "react-redux";
import { getHistory, getOrders, setLoading } from '../../redux/action';

const OnProcess = ({navigation, status}) => {

  const dispatch = useDispatch();
  const {token} = useSelector(state => state.loginReducer);
  const {history} = useSelector(state => state.orderReducer);

  let i = 0;

  useEffect(() => {
    // dispatch(getOrders(token));
    dispatch(getHistory(token));
    history.map(item => {
      if(item.isOrder == 'false') {
        dispatch(setLoading(true));
        axios.delete(`${API_HOST.url}/transaction/${item.id}`, {
          headers: {
            'Accept' : 'application/json',
            'Authorization' : token,
          },
        })
        .then(res => {
          console.log('berhasil dihapus');
          // dispatch(getOrders(token));
          dispatch(getHistory(token));
        })
        .catch(err => {
          console.log('terjadi error :', err.response);
        })
      }
    })
    setTimeout(() => dispatch(setLoading(false)), 2000);
  }, [history])

  return (
    <ScrollView showsVerticalScrollIndicator={false} >
    <View styles={styles.tabContainer}>
      {history.map(item => {
        //jika i tidak sama dengan id transaksi akan mereturn komponen OrderItem
        if(i != item.id){
          console.log('transaction id :', item.id);
          i = item.id;
          console.log('i saat dicek dengan transaction id : ', i);
          return(
            <OrderItem
            uid={item.uid}
            key={item.id}
            id={item.id}
            price={item.total}
            status={item.status}
            deliveryDate={item.updated_at}
            press={() => navigation.navigate('OrderSummary', {
              transaction : item,
              status : 'History',
            })}
            />
          )
        }
      })}
    </View> 
  </ScrollView>
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
