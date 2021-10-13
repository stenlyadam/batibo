import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, SafeAreaView, Dimensions} from 'react-native';
import {Button, PageTitle} from '../../components';
import {colors, fonts, showMessage} from '../../utils';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OrderDetail from './OrderDetail';
import DeliveryDetail from './DeliveryDetail';
import { useSelector, useDispatch } from 'react-redux';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { API_HOST } from '../../config';
import { setLoading } from '../../redux/action';

const Tab = createMaterialTopTabNavigator();

const Payment = ({navigation}) => {

  const dispatch = useDispatch();
  const {orderFromDetail} = useSelector(state => state.orderReducer);
  const {user} = useSelector(state => state.loginReducer);
  const {token} = useSelector(state => state.loginReducer);
  const {checkout} = useSelector(state => state.loginReducer);
  const {orderTemp} = useSelector(state => state.orderReducer);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  console.log('orderTemp : ', orderTemp );

  useEffect(() => {
    

  }, [])

  const checkoutMidtrans = () => {
    setIsPaymentOpen(true);
  }

  const onNavChange = (state) => {
    console.log('state: ', state);
    const titleWeb = 'Laravel';
    let orderSuccess = false;


    if(state.title === titleWeb){
      const data = {
        isOrder : 'true'
      };

      //update isOrder pada transaksi menjadi true 
      axios.post(`${API_HOST.url}/transaction/${orderTemp.id}`, data , {
        headers: {
          'Accept' : 'application/json',
          'Authorization' : token,
        },
        
      })
      //update isOrder pada transaksi menjadi true - jika berhasil
      .then(res => {
          if(orderFromDetail){
          // console.log('saya order dari detail loh');
          const orderSubmit = {
            user_id: user.id,
            product_id: checkout[0].id,
            transaction_id: orderTemp.id,
            quantity: checkout[0].quantity,
          }
          axios.post(`${API_HOST.url}/order/add`, orderSubmit, {
            headers: {
                'Accept' : 'application/json',
                'Authorization' : token,
            }
            })
            //tambah data product dalam database (order) - jika berhasil
            .then(resOrder => {
            //ambil data order terbaru dari database
            axios.get(`${API_HOST.url}/order`, {
                headers: {
                'Accept' : 'application/json',
                'Authorization' : token,
                }
            })
            //ambil data order terbaru dari database - jika berhasil
            .then(resUpdateOrder => {
                dispatch(setLoading(false));
                //simpan data ORDER user ke dalam data reducer
                dispatch({type: 'SET_ORDER', value: resUpdateOrder.data.data.data});
                orderSuccess = true;
            })
            //ambil data order terbaru dari database - jika tidak berhasil
            .catch(errUpdateOrder => {
                orderSuccess = false;
                dispatch(setLoading(false));
                // console.log('Terjadi pengambilan data order user');
                showMessage('Terjadi pengambilan data order user');
            })
            })
            //tambah data product ke database (order) - jika tidak berhasil
            .catch((errOrder) => {
                orderSuccess = false;
                dispatch(setLoading(false));
                // console.log('Terjadi kesalahan pada penyimpanan data ke API Order');
                showMessage('Terjadi kesalahan pada penyimpanan data ke API Order');
            }) 
        }
        else{
          checkout.map(item => {
            console.log('checkout mapping: ', item);
            const orderSubmit = {
              user_id: user.id,
              product_id: item.product_id,
              transaction_id: orderTemp.id,
              quantity: item.quantity,
            }
            axios.post(`${API_HOST.url}/order/add`, orderSubmit, {
              headers: {
                  'Accept' : 'application/json',
                  'Authorization' : token,
              }
              })
              //tambah data product dalam database (order) - jika berhasil
              .then(resOrder => {
              //ambil data order terbaru dari database
              axios.get(`${API_HOST.url}/order`, {
                  headers: {
                  'Accept' : 'application/json',
                  'Authorization' : token,
                  }
              })
              //ambil data order terbaru dari database - jika berhasil
              .then(resUpdateOrder => {
                  dispatch(setLoading(false));
                  //simpan data ORDER user ke dalam data reducer
                  dispatch({type: 'SET_ORDER', value: resUpdateOrder.data.data.data});
                  orderSuccess = true;
              })
              //ambil data order terbaru dari database - jika tidak berhasil
              .catch(errUpdateOrder => {
                  orderSuccess = false;
                  dispatch(setLoading(false));
                  // console.log('Terjadi pengambilan data order user');
                  showMessage('Terjadi pengambilan data order user');
              })
              })
              //tambah data product ke database (order) - jika tidak berhasil
              .catch((errOrder) => {
                  orderSuccess = false;
                  dispatch(setLoading(false));
                  // console.log('Terjadi kesalahan pada penyimpanan data ke API Order');
                  showMessage('Terjadi kesalahan pada penyimpanan data ke API Order');
              })
          })
        }
      })
      //update isOrder pada transaksi menjadi true - jika tidak berhasil
      .catch(err => {
        console.log('terjadi kesalahan pada proses Order : ', err.response);
      })
      
      //jika status order berhasil
      if(orderSuccess = true){
        // console.log('hallooo order success');
        navigation.replace('OrderSuccess');
      }

    }
  }

  if(isPaymentOpen){
    return(
      <WebView
      source={{ uri: orderTemp.paymentURL }}
      style={{ marginTop: 20 }}
      onNavigationStateChange={onNavChange}
    />
    );
  }
  else{
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
              <Text style={styles.priceText}>{(orderTemp.total).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.orderIdContainer}>
            <Text style={styles.idPesananText}>ID Pesanan</Text>
            <View style={styles.idContainer}>
              <Text style={styles.idText}>{orderTemp.id}</Text>
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
        <View style={styles.bottomWrapper}>
          <View style={styles.nextContainer}>
            <View style={styles.next}>
              <Button title="Selanjutnya" borderRadius={4} onPress={checkoutMidtrans}/>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 32,
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
  bottomWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  nextContainer: {
    borderColor: colors.grey,
    borderWidth: 1,
    height: 76,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
  },
  next: {
    marginHorizontal: 24,
  },
});
