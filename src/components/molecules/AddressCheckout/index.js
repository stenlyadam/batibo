import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const AddressCheckout = ({
  id,
  kategori,
  provinsi,
  kota_kabupaten,
  kelurahan,
  kecamatan,
  detail_alamat,
  navigation,
  onPress
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>{kategori}</Text>
        <Text style={styles.addressProvinsi}>{provinsi}</Text>
        <Text style={styles.addressKotaKabupaten}>{kota_kabupaten}</Text>
        <Text style={styles.addressKelurahan}>{kelurahan}</Text>
        <Text style={styles.addressKecamatan}>{kecamatan}</Text>
        <Text style={styles.addressDetail}>{detail_alamat}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddressCheckout;

const styles = StyleSheet.create({
  addressContainer: {
    padding: 16,
    position: 'relative',
    elevation: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    marginVertical: 8,
    flexDirection: "column",
  },
  addressTitle: {
    marginBottom: 12,
    fontWeight: '600',
    fontSize: 16,
    color: 'rgba(0,0,0,0.7)',
  },
});
