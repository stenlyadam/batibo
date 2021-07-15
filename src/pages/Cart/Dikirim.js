import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import SentItem from './SentItem';
import {firebase} from '../../config';
import { useDispatch, useSelector } from "react-redux";

const Dikirim = () => {
  const user = useSelector(state => state.user);

  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {
    setListOrder([])

    firebase
      .database()
      .ref(`users/${user.uid}/order/`)
      .once(`value`)
      .then(response => {
        console.log("order: ", response.val())
        if(response.val()){
          const obj = response.val()
          let arr = Object.keys(obj).map((k) => obj[k])
          console.log('order: ', arr)
          setListOrder(arr)
        }
        })

  }, [])

  return (
    <View style={styles.dikirimContainer}>
      {console.log(listOrder)}
      <FlatList style={styles.deliveryListContainer}
            keyExtractor={(item) => item.id}
            data={listOrder} 
            renderItem={({item}) => (
                <SentItem
                  id={item.id}
                  image={{uri: item.image}}
                  title={item.title}
                  price={(item.totalPrice + item.deliveryCost)}
                  status={item.status}
                />
              )}
          />
      {/* <View style={styles.deliveryListContainer}>
        {
          listOrder.map((item) => {
            return(
            <SentItem
                  id={item.id}
                  image={{uri: item.image}}
                  title={item.title}
                  price={item.totalPrice + item.deliveryCost}
                  status={item.status}
                />
            )
          })
        }
        <SentItem
          title="Brokoli Hijau"
          price="Rp 70.000"
          status="Dalam Pengiriman"
        />
        <SentItem title="Brokoli Hijau" price="Rp 120.000" status="Selesai" />
      </View> */}
    </View>
  );
};

export default Dikirim;

const styles = StyleSheet.create({
  dikirimContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  deliveryListContainer: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 15,
  },
});
