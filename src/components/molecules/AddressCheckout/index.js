import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { colors, fonts } from '../../../utils';

const AddressCheckout = ({
  id,
  kategori,
  nama_penerima,
  nomor_handphone,
  detail,
  onPress
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>{kategori}</Text>
        <Text style={styles.addressNamaPenerima}>{nama_penerima}</Text>
        <Text style={styles.addressSubTitle}>{nomor_handphone}</Text>
        <Text style={styles.addressSubTitle}>{detail}</Text>
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
    marginBottom: 4,
    fontFamily: fonts.nunito.semibold,
    fontSize: 14,
    color: 'rgba(0,0,0,0.7)',
  },
  addressNamaPenerima: {
    fontFamily: fonts.nunito.bold,
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 5,
  },
  addressSubTitle: {
    fontFamily: fonts.nunito.normal,
    fontSize: 12,
    color: colors.text.primary,
    marginBottom: 5,
    maxWidth: 320,
  }
});
