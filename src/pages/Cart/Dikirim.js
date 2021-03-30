import React from 'react';
import {StyleSheet, View} from 'react-native';
import SentItem from './SentItem';

const Dikirim = () => {
  return (
    <View style={styles.dikirimContainer}>
      <View style={styles.deliveryListContainer}>
        <SentItem
          title="Brokoli Hijau"
          price="Rp 70.000"
          status="Dalam Pengiriman"
        />
        <SentItem title="Brokoli Hijau" price="Rp 120.000" status="Selesai" />
      </View>
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
