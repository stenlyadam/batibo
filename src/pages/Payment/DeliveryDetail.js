import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {colors, fonts} from '../../utils';

const DeliveryDetail = () => {
  return (
    <View style={styles.tabContainer}>
      <View style={styles.deliveryDetailContainer}>
        <View style={styles.deliveryLeftContainer}>
          <Text style={styles.deliveryTitle}>Nama</Text>
          <Text style={styles.deliveryText}>Amir Mahfudi</Text>
          <Text style={styles.deliveryTitle}>Nomor Handphone</Text>
          <Text style={styles.deliveryText}>+628889999123</Text>
          <Text style={styles.deliveryTitle}>Email</Text>
          <Text style={styles.deliveryText}>amir@gmail.com</Text>
        </View>
        <View style={styles.deliveryRightContainer}>
          <Text style={styles.deliveryTitle}>Alamat</Text>
          <Text style={styles.deliveryText}>
            Jl. Cilandak Town Square No.2, RT.2/RW.1, Cilandak Bar., Kec.
            Cilandak, Jakarta Selatan
          </Text>
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
    color: colors.text.grey,
    opacity: 0.5,
    marginBottom: 8,
  },
  deliveryText: {
    fontFamily: fonts.nunito.normal,
    fontSize: 14,
    color: colors.text.grey,
    marginBottom: 8,
  },
});
