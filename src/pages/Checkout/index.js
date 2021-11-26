import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { Button, CartItem, Gap, PageTitle } from '../../components';
import { API_HOST } from '../../config';
import { getOnProcess, getOrders } from '../../redux/action';
import { setLoading } from '../../redux/action/global';
import { colors, fonts, showMessage } from '../../utils';

const Checkout = ({navigation}) => {

  const dispatch = useDispatch();

  const {user} = useSelector(state => state.loginReducer);
  const {token} = useSelector(state => state.loginReducer);
  const {checkout} = useSelector(state => state.loginReducer);
  const {orderFromDetail} = useSelector(state => state.orderReducer);
  const {selectedAddress} = useSelector(state => state.orderReducer);
  const {ongkir} = useSelector(state => state.orderReducer);
  const [deliveryCost] = useState(15000);
  const [listCheckout, setListCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [limitTransaction, setLimitTransaction] = useState(1);
  console.log('selected ', selectedAddress);
  
  useEffect(() => {
    //order berasal dari detail - jika ya
    if (orderFromDetail){
      setTotalPrice(checkout[0].total * checkout[0].quantity);
    }
    //order berasal dari detail - jika tidak
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
    if(selectedAddress){
         //jika order dari detail
    if(orderFromDetail){
      checkoutMidtrans();
    }
    //jika order bukan dari detail
    else{
      Alert.alert(
        "Perhatian",
        "Jika lanjut proses checkout, anda akan kehilangan produk dari keranjang anda.",
        [
          {
            text: "Kembali",
            onPress: () => console.log('hallo'),
            style: "cancel"
          },
          { text: "Ok", onPress: () => checkoutMidtrans() }
        ]
      );
    }
    }
    else{
      showMessage('Anda belum memilih alamat pengiriman');
    }
  }

  const checkoutMidtrans = () => {
    dispatch(setLoading(true));
    const data = {
      uid : Date.now(),
      user_id : user.id,
      address_id: selectedAddress.id,
      total : totalPrice + ongkir,
      status: 'PENDING',
      isOrder : 'true',
      nama_penerima : selectedAddress.nama_penerima,
      nomor_handphone : selectedAddress.nomor_handphone,
      email : selectedAddress.email,
      alamat_penerima : `${selectedAddress.detail_alamat}, ${selectedAddress.kelurahan}, ${selectedAddress.kecamatan}, ${selectedAddress.kota_kabupaten}`,
      latitude : selectedAddress.latitude,
      longitude : selectedAddress.longitude,
    };
    axios.post(`${API_HOST.url}/checkout`, data, {
      headers: {
        'Authorization': token,
      }
    })
    .then(res => {
      let orderSuccess = false;
      const orderTemp = {
        id : res.data.data.id,
        uid : res.data.data.uid,
        total : res.data.data.total,
        paymentURL : res.data.data.payment_url
      }
      dispatch({type: 'SET_ORDER_TEMP', value: orderTemp});
      dispatch(setLoading(false));
      if(limitTransaction == 1){
        setLimitTransaction(2);
        console.log('limit transactio update : ', limitTransaction);
          if(orderFromDetail){
            
            // console.log('saya order dari detail loh');
            const orderSubmit = {
              user_id: user.id,
              product_id: checkout[0].id,
              transaction_id: res.data.data.id,
              quantity: checkout[0].quantity,
            }
            console.log('orderSubmit : ', orderSubmit);
            Promise.all(
            axios.post(`${API_HOST.url}/order/add`, orderSubmit, {
              headers: {
                  'Accept' : 'application/json',
                  'Authorization' : token,
              }
              })
              //tambah data product dalam database (order) - jika berhasil
              .then(async (resOrder) => {
              orderSuccess = true;
              dispatch(getOnProcess(token));
              dispatch(getOrders(token, orderSuccess, navigation)); 
              await navigation.replace('Payment');
              showMessage('Checkout Success', 'success');
              })
              //tambah data product ke database (order) - jika tidak berhasil
              .catch(errOrder => {
                  console.log('Terjadi kesalahan pada penyimpanan data ke API Order : ',errOrder);
              })
            ) 
          }
          else{
            Promise.all(
              checkout.map(async (item) => {
                console.log('checkout mapping: ', item);
                const orderSubmit = {
                  user_id: user.id,
                  product_id: item.product_id,
                  transaction_id: res.data.data.id,
                  quantity: item.quantity,
                }
                  await axios.post(`${API_HOST.url}/order/add`, orderSubmit, {
                  headers: {
                      'Accept' : 'application/json',
                      'Authorization' : token,
                  }
                  })
                  //tambah data product dalam database (order) - jika berhasil
                  .then(async (resOrder) => {
                        //hapus data cart di database user
                        await axios.delete(`${API_HOST.url}/cart/${item.id}`, {
                          headers: {
                            'Accept' : 'application/json',
                            'Authorization' : token,
                          }
                        })
                        //hapus data cart di database user - jika berhasil
                        .then ((resCart) => {
                            orderSuccess = true;
                            dispatch(getOnProcess(token));
                            dispatch(getOrders(token, orderSuccess, navigation));
                            showMessage('Checkout Success', 'success');
                        })
                        //hapus data cart di database user - jika tidak berhasil
                        .catch((errCart) => {
                          console.log(`produk tidak berhasil dihapus : id ${item.id}`);
                        })
                  })
                  //tambah data product ke database (order) - jika tidak berhasil
                  .catch((errOrder) => {
                      showMessage('Terjadi kesalahan pada penyimpanan data ke API Order');
                  })
              })
            )
            setTimeout(async () => {
              await navigation.replace('Payment', orderSuccess);
            }, 1000);
          }
    }
    })
    .catch(err => {
      dispatch(setLoading(false));
      console.log('err response :', err)
      showMessage('Masalah Jaringan : Silahkan Coba Lagi Beberapa Saat');
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
              <View style={styles.deliverySubContainer}>
                <Text style={styles.subTitle}>Alamat Pengiriman</Text>
                <TouchableOpacity onPress={() => navigation.navigate('CheckoutAddress')}>
                  {selectedAddress ? <Text style={styles.selectAddress}>Pilih Alamat Lain</Text> : <Text style={styles.selectAddress}>Pilih Alamat</Text> }
                </TouchableOpacity>
              </View>
              <View style={styles.mainAddress}>
                {selectedAddress
                  ?
                    <View>
                      <Text style={styles.addressTitle(selectedAddress)}>{selectedAddress.kategori}</Text>
                      <Text style={styles.addressDetail}>{selectedAddress.nama_penerima} ({selectedAddress.nomor_handphone})</Text>
                      <Text style={styles.addressDetail}>{selectedAddress.detail_alamat}, {selectedAddress.kelurahan}, {selectedAddress.kecamatan}, {selectedAddress.kota_kabupaten}, {selectedAddress.provinsi}</Text>
                    </View>
                  :
                    <View>
                      <Text style={styles.addressTitle()}>No Selected Address</Text>
                    </View>
                  }
                <View style={styles.borderView}/>
              </View>
            </View>
            <View>
              <Gap height={15}/>
              <View style={styles.deliverContainer}>
                <Text style={styles.deliver}>Pesanan</Text>
                {
                  orderFromDetail ?
                      <CartItem
                      id={checkout[0].id}
                      productId={checkout[0].product_id}
                      image={{uri: checkout[0].product.picturePath}}
                      name={checkout[0].product.name}
                      weight={checkout[0].product.product_unit}
                      originalPrice={checkout[0].product.price}
                      currentPrice={checkout[0].product.price_after_discount}
                      count={checkout[0].quantity}
                      checkout
                      orderFromDetail
                      detail={checkout[0]}
                      />
                      
                :  
                listCheckout.map(item => {

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
                    checkout
                    />
                    )
                
                  })
                }

              </View>
              <Gap height={15}/>
              <View style={styles.deliverContainer}>
                <Text style={styles.deliver}>Pembayaran</Text>
                <Text style={styles.subTitle}>Ringkasan Pembayaran</Text>
                <View style={styles.paymentSummary}>
                  <Text style={styles.paymentSummaryCategory}>Total Belanja</Text>
                  <Text style={styles.priceSummary}>Rp. {totalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                </View>
                <View style={styles.paymentSummary}>
                  <Text style={styles.paymentSummaryCategory}>Ongkos Kirim</Text>
                  <Text style={styles.priceSummary}>Rp. {ongkir.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                </View>
                <View style={styles.totalPayment}>
                  <Text style={styles.totalPaymentText}>Total Pembayaran</Text>
                  <Text style={styles.totalPrice}>Rp. {(totalPrice + ongkir).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
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
  addressTitle: (selectedAddress) => ({
    fontFamily: fonts.nunito.bold,
    fontSize: 16,
    opacity: 1,
    color: selectedAddress ? colors.black : colors.error,
    marginBottom : 4,
  }),
  addressDetail: {
    fontFamily: fonts.nunito.normal,
    fontSize: 14,
    opacity: 0.6,
    marginBottom : 2,
  },
  paymentButton: {
    marginHorizontal: 24,
    marginTop: 8, 
    marginBottom: 16
  },
});
