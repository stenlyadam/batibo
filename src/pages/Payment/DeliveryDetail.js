import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { useSelector } from "react-redux";

import {colors, fonts} from '../../utils';

const DeliveryDetail = () => {
  const {user} = useSelector(state => state.loginReducer);
  const {selectedAddress} = useSelector(state => state.orderReducer);

  return (
    <View style={styles.tabContainer}>
      <View style={styles.deliveryDetailContainer}>
        <View style={styles.deliveryLeftContainer}>
          <Text style={styles.deliveryTitle}>Nama</Text>
          <Text style={styles.deliveryText}>{selectedAddress.nama_penerima}</Text>
          <Text style={styles.deliveryTitle}>Nomor Handphone</Text>
          <Text style={styles.deliveryText}>{selectedAddress.nomor_handphone}</Text>
          <Text style={styles.deliveryTitle}>Email</Text>
          <Text style={styles.deliveryText}>{selectedAddress.email}</Text>
        </View>
        <View style={styles.deliveryRightContainer}>
          <Text style={styles.deliveryTitle}>Alamat</Text>
          <Text style={styles.deliveryText}>{selectedAddress.detail_alamat}, {selectedAddress.kecamatan}, {selectedAddress.kelurahan}, {selectedAddress.kota_kabupaten}, {selectedAddress.provinsi}</Text>
        </View>
      </View>
    </View>
  );
};

export default DeliveryDetail;

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 22,
  },
  deliveryDetailContainer: {
    flexDirection: 'row',
  },
  deliveryLeftContainer: {
    flex: 1,
  },
  deliveryRightContainer: {
    flex: 1,
  },
  deliveryTitle: {
    fontFamily: fonts.nunito.normal,
    fontSize: 12,
    color: colors.text.primary,
    opacity: 0.5,
    marginBottom: 8,
  },
  deliveryText: {
    fontFamily: fonts.nunito.normal,
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: 8,
  },
});
