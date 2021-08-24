import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import {Button, CartItem, PageTitle, CheckBox, Gap} from '../../components';
import {colors, fonts} from '../../utils';
import {Picker} from '@react-native-community/picker';
import {firebase} from '../../config';
import { useDispatch, useSelector } from "react-redux";

const Checkout = ({navigation}) => {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.user);
  const [selectedValue, setSelectedValue] = useState('Alamat Rumah');

  const userCart = user.cart;
  console.log("CartPesanan: ", cart)
  
  const [listCart, setListCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(15000);

  const submitOrder = () => {
    // let submitCart = [];
    // submitCart[]

    console.log('hello')

    // code marshal
    // let submitCart = [];
    // submitCart['Cart'] = listCart;
    // console.log("submitCartBefore: ", submitCart)
    // submitCart['totalPrice'] = totalPrice;
    // submitCart['deliveryCost'] = deliveryCost;
    // submitCart['status'] = "Dalam Pengiriman";
    // submitCart['title'] = listCart[0].name;
    // submitCart['image'] = listCart[0].image;
    // submitCart['firstItemPrice'] = (listCart[0].price - (listCart[0].price * (listCart[0].discount/100)));
    // submitCart['firstItemUnit'] = listCart[0].productUnit;
    // console.log("submitCartAfter: ", submitCart)

    // console.log(submitCart)
    // let orderKey = firebase.database().ref(`users/${user.uid}/order`).push().getKey()
    // submitCart['id'] = orderKey;

    // firebase.database().ref(`users/${user.uid}/order/${orderKey}`).set(submitCart)

    // let sendItem = {key: orderKey, price: (totalPrice + deliveryCost)}

    // dispatch({type: 'CLEAR_CART'})
    // navigation.navigate('OrderSuccess', (sendItem))
    
  }

  useEffect(() => {
    setListCart([]);
    
    let tempPrice = 0;

    userCart.map(item => {
      //taru proses untuk mapping cart dari user(redux) untuk ditampilkan pada flat list menggantikan cart map dibawah  
      if(item && item.id != 0){
        console.log('user cart mapping : ', item);
        const data = item;
        data["count"] = item.count;
        setListCart(listCart => [...listCart, data])
      }
      console.log('temp price : ', tempPrice);
      tempPrice += (item.priceAfterDiscount * item.count);
    })
    setTotalPrice(tempPrice);

    //code marshal
    // cart.map(item => {
    //   firebase
    //   .database()
    //   .ref(`products/${item.id}`)
    //   .once('value')
    //   .then(response => {
    //     const data = response.val()
    //     console.log('data :', data);
    //     data["count"] = item.count;
    //     setListCart(listCart => [...listCart, data])
    //   })
    //   tempPrice += (item.price * item.count);
    // })
    // setTotalPrice(tempPrice);
  }, [userCart])

  useEffect(() => {
    console.log("listCart: ", listCart)
    console.log('total price : ', totalPrice);
  }, [listCart])


  return (
    <SafeAreaView style={styles.page}>
      <PageTitle
        title="Checkout"
        backButton
        onBack={() => navigation.goBack()}
      />
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
            <Gap height={12}/>
            <Text style={styles.subTitle}>Tanggal Kirim</Text>
            <View style={styles.description}>
              <CheckBox label="Senin, 1 Mei 2020"/>
              <CheckBox label="Selasa, 2 Mei 2020"/>
              <CheckBox label="Rabu, 3 Mei 2020"/>
            </View>
            <Text style={styles.subTitle}>Pilih Jam Antar</Text>
            <Gap height={4}/>    
            <View style={styles.timeContainer}>
              <Button
              onSelected
              type = 'Third'
              title = '07.00 - 08.00'
              />
              <Button 
              type = 'Third'
              title = '08.00 - 09.00'
              />
            </View>
          </View>
          <View>
            <View style={styles.deliverContainer}>
              <Text style={styles.deliver}>Pesanan</Text>
              <FlatList style={styles.cartContainer}
                keyExtractor={(item) => item.id}
                data={listCart} 
                renderItem={({item}) => (
                    <CartItem
                      id={item.id}
                      image={{uri: item.image}}
                      name={item.name}
                      weight={item.productUnit}
                      originalPrice={item.price}
                      currentPrice={item.price - (item.price * (item.discount/100))}
                      count={item.count}
                    />
                  )}
              />
            </View>
            <View style={styles.deliverContainer}>
              <Text style={styles.deliver}>Pembayaran</Text>
              <Text style={styles.subTitle}>Metode Pembayaran</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedValue}
                  style={[styles.picker]}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }>
                  <Picker.Item label="ATM Mandiri" value="ATM Mandiri" />
                  <Picker.Item label="ATM BCA" value="ATM BCA" />
                  <Picker.Item label="ATM BRI" value="ATM BRI" />
                </Picker>
                <Button type="icon-only" icon="icon-arrow-right" borderRadius={4}/>
              </View>
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
      </ScrollView>

      <View style={styles.paymentButton}>
        <Button
          title="Pesan Sekarang"
          onPress={() => submitOrder()}
          borderRadius={4}
        />
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  deliveryContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  dropdownContainer: {
    backgroundColor: colors.lightGrey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 220,
  },

  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  deliverContainer: {marginHorizontal: 24},
  deliver: {
    fontFamily: fonts.nunito.semibold,
    marginTop: 16,
    // marginBottom: 16,
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
  description:{
    marginBottom: 12,
    fontFamily: fonts.nunito.normal,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.5)',
  },
  buttonContainer: {flexDirection: 'row', justifyContent: 'flex-start'},
  paymentSummary: {flexDirection: 'row', justifyContent: 'space-between'},
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
  totalPrice: {
    fontFamily: fonts.nunito.semibold,
    color: colors.text.tertiary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  paymentButton: {marginHorizontal: 24, marginBottom: 16},
  picker: {
    height: 30,
    width: 320,
    backgroundColor: colors.lightGrey,
  },
  pickerContainer: {
    backgroundColor: colors.lightGrey,
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
  },
});
