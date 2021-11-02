import { Picker } from '@react-native-community/picker';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { color } from 'react-native-reanimated';
import { useDispatch, useSelector } from "react-redux";
import { Button, CartItem, PageTitle, Gap } from '../../components';
import { API_HOST } from '../../config';
import { setLoading } from '../../redux/action/global';
import { colors, fonts, showMessage } from '../../utils';
import { AddressCheckout } from '../../components';
import { setSelectedAddress } from '../../redux/action';

const {width} = Dimensions.get('window');

const CheckoutAddress = ({navigation}) => {

  const dispatch = useDispatch();

  

  const {user} = useSelector(state => state.loginReducer);
  const {token} = useSelector(state => state.loginReducer);
  const {checkout} = useSelector(state => state.loginReducer);
  const {address} = useSelector(state => state.loginReducer);
  const {orderFromDetail} = useSelector(state => state.orderReducer);

    return (
      <SafeAreaView style={styles.page}>
        <View style={styles.pageTitle}>
        <PageTitle
          title="Select Address"
          onBack={() => navigation.goBack()}
        />
        </View>
        
        <ScrollView>
          <View style={styles.pageContainer}>
            {
              address.map(item => {
                return(
                  <AddressCheckout
                    key={item.id}
                    id={item.id}
                    kategori={item.kategori}
                    nama_penerima={item.nama_penerima}
                    nomor_handphone={item.nomor_handphone}
                    detail={`${item.detail_alamat}, ${item.kelurahan}, ${item.kecamatan}, ${item.kota_kabupaten}, ${item.provinsi}`}
                    navigation={navigation}
                    onPress={() => (dispatch(setSelectedAddress(item, navigation)), navigation.navigate('Checkout'))}
                  />
                )
              })
            }
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

export default CheckoutAddress;

const styles = StyleSheet.create({
  
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  pageTitle: {
    marginVertical: 28,
    marginTop: 18
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: "5%",
  },
  deliveryContainer: {
    padding: 16,
    position: 'relative',
    elevation: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    marginVertical: 8,
    flexDirection: "column",
  },
  deliverySubContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  borderView: {
    borderBottomColor: colors.border,
    borderBottomWidth: 2,
    marginTop: 10,
  },
  deliver: {
    fontFamily: fonts.nunito.semibold,
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.text.quartenary,
  },
  addressTitle: {
    fontFamily: fonts.nunito.semibold,
    marginVertical: 12,
    fontWeight: '600',
    fontSize: 16,
    color: 'rgba(0,0,0,0.7)',
  },
  subTitle: {
    fontFamily: fonts.nunito.semibold,
    marginVertical: 12,
    fontWeight: '600',
    fontSize: 16,
    color: 'rgba(0,0,0,0.7)',
  },
  selectAddress: {
    fontFamily: fonts.nunito.bold,
    marginVertical: 12,
    fontWeight: '600',
    fontSize: 16,
    color: colors.button.green,
  },
  mainAddress: {
  },
  pickerContainer: {
    backgroundColor: colors.lightGrey,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    width: 310,
  },
  picker: {
    height: 30,
    width: 290,
    backgroundColor: colors.lightGrey,
  },
  deliverContainer: {
    marginHorizontal: 24
  },
  paymentSummary: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  paymentSummaryCategory: {
    fontFamily: fonts.nunito.semibold,
    fontSize: 16,
    opacity: 0.5,
  },
  priceSummary: {
    color: '#202020',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: fonts.nunito.semibold,
  },
  totalPayment: {
    marginTop: 32,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
  totalPaymentText: {
    fontFamily: fonts.nunito.semibold,
    fontSize: 16,
    opacity: 0.5,
  },
  addressTitle: {
    fontFamily: fonts.nunito.bold,
    fontSize: 16,
    opacity: 1,
  },
  addressDetail: {
    fontFamily: fonts.nunito.normal,
    fontSize: 14,
    opacity: 0.6,
  },
  paymentButton: {
    marginHorizontal: 24,
    marginTop: 8, 
    marginBottom: 16
  },
});
