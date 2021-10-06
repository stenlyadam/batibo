import { Picker } from '@react-native-community/picker';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { Button, CartItem, PageTitle } from '../../components';
import { API_HOST } from '../../config';
import { setLoading } from '../../redux/action/global';
import { colors, fonts } from '../../utils';

const Checkout = ({navigation}) => {

  const dispatch = useDispatch();

  const {user} = useSelector(state => state.loginReducer);
  const {token} = useSelector(state => state.loginReducer);
  const {checkout} = useSelector(state => state.loginReducer);
  const {orderFromDetail} = useSelector(state => state.orderReducer);
  const [deliveryCost] = useState(15000);
  const [listCheckout, setListCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedValue, setSelectedValue] = useState('Alamat Rumah');

  useEffect(() => {
    if (orderFromDetail){
      setTotalPrice(checkout[0].price_after_discount * checkout[0].quantity);
    }
    else{
      setListCart([]);
      let tempPrice = 0;

      checkout.map(item => {  
        
        if(item){
          const data = item;
          setListCart(listCheckout => [...listCheckout, data])
        }
        tempPrice += (item.total);
      })
      setTotalPrice(tempPrice);
    }
    
  }, [checkout])

  const onCheckout = () => {
    console.log('haloo bill');
    Alert.alert(
      "Konfirmasi",
      "Apakah anda melakukan checkout? Jika lanjut produk yang ada di keranjang akan hilang.",
      [
        {
          text: "Tidak",
          onPress: () => console.log('hallo'),
          style: "cancel"
        },
        { text: "Ya", onPress: () => checkoutMidtrans() }
      ]
    );
  }

  const checkoutMidtrans = () => {
    dispatch(setLoading(true));
    const data = {
      user_id : user.id,
      total : totalPrice + deliveryCost,
      status: 'PENDING'
    };
    axios.post(`${API_HOST.url}/checkout`, data, {
      headers: {
        'Authorization': token,
      }
    })
    .then(res => {
      const orderTemp = {
        id : res.data.data.id,
        total : res.data.data.total,
        paymentURL : res.data.data.payment_url
      }
      
      dispatch({type: 'SET_ORDER_TEMP', value: orderTemp});
      dispatch(setLoading(false));
      navigation.replace('Payment');
    
    })
    .catch(err => {
      dispatch(setLoading(false));
      console.log('error checkout : ', err.response);
    })
  }

    return (
      <SafeAreaView style={styles.page}>
        <View style={styles.pageTitle}>
        <PageTitle
          title="Checkout"
          onBack={() => navigation.goBack()}
        />
        </View>
        
        <ScrollView>
          <View style={styles.pageContainer}>
            <View style={styles.deliveryContainer}>
              <Text style={styles.deliver}>Pengiriman</Text>
              <Text style={styles.subTitle}>Alamat Pengiriman</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedValue}
                  style={[styles.picker]}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }>
                  <Picker.Item label="Alamat Rumah" value="Alamat Rumah" />
                  <Picker.Item label="Kantor" value="Kantor" />
                </Picker>
                <Button type="icon-only" icon="icon-arrow-right" borderRadius={4}/>
              </View>
            </View>
            <View>
              <View style={styles.deliverContainer}>
                <Text style={styles.deliver}>Pesanan</Text>
                {
                  orderFromDetail ?
                      <CartItem
                      id={checkout[0].id}
                      productId={checkout[0].id}
                      image={{uri: checkout[0].picturePath}}
                      name={checkout[0].name}
                      weight={checkout[0].product_unit}
                      originalPrice={checkout[0].price}
                      currentPrice={checkout[0].price_after_discount}
                      count={checkout[0].quantity}
                      />
                      
                :  listCheckout.map(item => {
                  
                    return (
                    <CartItem
                    key={item.id}
                    id={item.id}
                    productId={item.product_id}
                    image={{uri: item.product.picturePath}}
                    name={item.product.name}
                    weight={item.product.product_unit}
                    originalPrice={item.product.price}
                    currentPrice={item.product.price_after_discount}
                    count={item.quantity}
                    />
                    )
                
                  })
                }

              </View>
              <View style={styles.deliverContainer}>
                <Text style={styles.deliver}>Pembayaran</Text>
                <Text style={styles.subTitle}>Ringkasan Pembayaran</Text>
                <View style={styles.paymentSummary}>
                  <Text style={styles.paymentSummaryCategory}>Total Belanja</Text>
                  <Text style={styles.priceSummary}>Rp. {totalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                </View>
                <View style={styles.paymentSummary}>
                  <Text style={styles.paymentSummaryCategory}>Ongkos Kirim</Text>
                  <Text style={styles.priceSummary}>Rp. {deliveryCost.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                </View>
                <View style={styles.totalPayment}>
                  <Text style={styles.totalPaymentText}>Total Pembayaran</Text>
                  <Text style={styles.totalPrice}>Rp. {(totalPrice + deliveryCost).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                </View>
              </View>
            </View>
          </View>
        <View style={styles.paymentButton}>
          <Button
            title="Lanjut ke Pembayaran"
            onPress={onCheckout}
            borderRadius={4}
          />
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

export default Checkout;

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
  },
  deliveryContainer: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  deliver: {
    fontFamily: fonts.nunito.semibold,
    marginTop: 16,
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.text.quartenary,
  },
  subTitle: {
    fontFamily: fonts.nunito.semibold,
    marginVertical: 12,
    fontWeight: '600',
    fontSize: 16,
    color: 'rgba(0,0,0,0.7)',
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
  paymentButton: {
    marginHorizontal: 24,
    marginTop: 8, 
    marginBottom: 16
  },
});
