import React, {useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from "react-redux";
import { Button, Gap } from '../../components';
import { colors, fonts } from '../../utils';

const OrderItem = ({navigation, status, deliveryDate, press, id, image, price, firstItemPrice, firstItemUnit, title, uid}) => {

  const {order} = useSelector(state => state.orderReducer);
  const [listOrder, setListOrder] = useState([]);
  const [onPressMore, setOnPressMore] = useState(false);
  const [statusOrder, setStatusOrder] = useState(status);
  const [colorStatus, setColorStatus] = useState('#FFEEDE');

  const formatedDate = new Date(deliveryDate).toDateString();

  useEffect(() => {
    if(status == 'PENDING'){
      setStatusOrder('Menunggu Pembayaran');
      setColorStatus(colors.status.pending);
    }
    else if(status == 'SUCCESS'){
      setStatusOrder('Menunggu Konfirmasi Penjual');
    }
    else if(status == 'ON_DELIVERY'){
      setStatusOrder('Pesanan Dalam Perjalanan');
      setColorStatus(colors.status.on_delivery);
    }
    else if(status == 'CANCELLED'){
      setStatusOrder('Pesanan Dibatalkan');
      setColorStatus(colors.status.cancelled);
    }
    else if(status == 'DELIVERED'){
      setStatusOrder('Pesanan Diterima');
      setColorStatus(colors.status.delivered);
    }

    setListOrder([]);
    order.map(item => {
      if(id == item.transaction_id){
        const data = item;
        setListOrder(listOrder => [...listOrder, data])
      }
    })
    // setTimeout(() => console.log('list order : ', listOrder), 2000);
    // console.log(`data transaksi dgn id : ${id}`, listOrder);
  }, [order])

  const pressMore = () => {
      if(onPressMore == false){
        setOnPressMore(true);
        // console.log('mau lihat lagi');
      }
      else{
        setOnPressMore(false);
        // console.log('mau lihat lagi saya');
      }
  }
  
  return (
      <View style={styles.orderContainer}>
        <View style={styles.orderStatusContainer(colorStatus)}>
          <Text style={styles.orderStatusText}>{statusOrder}</Text>
        </View>
        <View style={styles.orderDescriptionContainer}>
          <View>
            <Text style={styles.subTitleText}>Tanggal Pesanan</Text>
            <Text style={styles.date}>{formatedDate}</Text>
          </View>
          <View>
            <Text style={styles.subTitleText}>ID Pesanan</Text>
            <Text style={styles.orderNumber}>{uid}</Text>
          </View>
        </View>
        <TouchableOpacity onPress = {press}>  
        {onPressMore == true 
        ? 
        // console.log('saya hanya ingin satu')
        listOrder.map((item) => {
          //jika id(params) sama dengan id transaksi akan mereturn product dalam transaksi tersebut
          if(id == item.transaction.id){
            return (
              
              <View key={item.id} style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.product.picturePath }} style={styles.image} />
                </View>
                <View style={styles.itemTitleContainer}>
                  <Text style={styles.titleText}>{item.product.name}</Text>
                  <View style={styles.itemQuantityContainer}>
                    <Text style={styles.itemWeight}>{item.product.product_unit}</Text>
                    <View style={styles.dot}/>
                    <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                  </View>
                </View>
                <Text style={styles.itemPrice}>Rp {item.product.price_after_discount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
              </View>
            )
          }
        })
        : 
        listOrder.filter(((item) => id == item.transaction.id)).map((item, limit) => {
          // setLimit(2)
          //jika id(params) sama dengan id transaksi akan mereturn product dalam transaksi tersebut
          return limit < 1 && (
            <View key={item.id} style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.product.picturePath }} style={styles.image} />
              </View>
              <View style={styles.itemTitleContainer}>
                <Text style={styles.titleText}>{item.product.name}</Text>
                <View style={styles.itemQuantityContainer}>
                  <Text style={styles.itemWeight}>{item.product.product_unit}</Text>
                  <View style={styles.dot}/>
                  <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                </View>
              </View>
              <Text style={styles.itemPrice}>Rp {item.product.price_after_discount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
            </View>
          )
        })
        }
        </TouchableOpacity>
        {listOrder.length > 1 &&
          <TouchableOpacity style={styles.moreItemContainer} onPress={pressMore}>
            <Text style={styles.moreItemText}>Lihat Pesanan Lainnya</Text>
            <Button type="icon-only" icon="icon-arrow-bottom" />
          </TouchableOpacity>
        }
        <View style={styles.orderAmountContainer}>
          <Text style={styles.subTitleText}>Total Pembayaran</Text>
          <Text style={styles.orderAmount}>Rp. {price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
        </View>
      </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginVertical: 24,
  },
  orderContainer: {
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: colors.white,
    marginVertical: 10,
  },
  orderStatusContainer: (colorStatus) => ({
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: colorStatus,
    padding: 5,
  }),
  orderStatusText: {
    textAlign: 'center',
    fontFamily: fonts.primary[600],
    fontSize: 12,
    height:20,
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
    alignItems:'center',
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
    paddingHorizontal: 16,
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
  },
  itemTitleContainer: {
    width: 100,
    maxWidth: 100,
    height: 50,
    marginRight: 28,
    justifyContent: 'center'
  },
  titleText: {
    fontFamily: fonts.nunito.bold,
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 5
  },
  itemQuantityContainer: {
    alignItems: 'center',
    flexDirection:'row'
  },
  itemWeight: {
    fontFamily: fonts.nunito.normal,
    fontSize: 12,
    color: colors.text.grey,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: colors.text.grey,
    marginHorizontal: 10
  },
  itemQuantity: {
    fontFamily: fonts.nunito.normal,
    color: colors.text.primary,
  },
  itemPrice: {
    fontFamily: fonts.nunito.bold,
    fontSize: 14,
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
