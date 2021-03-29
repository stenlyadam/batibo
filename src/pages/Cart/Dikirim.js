import React from 'react';
import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import {DummyBrokoliHijau} from '../../assets';
import {colors, fonts} from '../../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Dikirim = () => {
  return (
    <View style={styles.dikirimContainer}>
      <View style={styles.deliveryListContainer}>
        <View style={styles.cardWrapper}>
          <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
              <Image source={DummyBrokoliHijau} style={styles.picture} />
            </View>
            <View style={styles.deliveryTextContainer}>
              <Text style={styles.deliveryTitle}>Brokoli Hijau</Text>
              <View style={styles.line} />
              <View style={styles.deliveryCardBottomContainer}>
                <View>
                  <Text style={styles.deliverySubText}>Total Belanja</Text>
                  <Text style={styles.deliveryTotalText}>Rp 70.000</Text>
                </View>
                <TouchableOpacity style={styles.deliveryButton}>
                  <Text style={styles.buttonTitle}>Dalam Pengiriman</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
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
    marginTop: 12,
  },
  picture: {
    width: 107,
    height: 67,
  },
  cardWrapper: {
    backgroundColor: colors.white,
    padding: 10,
    elevation: 10,
    borderRadius: 10,
    height: 110,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
  },
  deliveryCardBottomContainer: {
    flexDirection: 'row',
    width: 250,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  deliveryButton: {
    backgroundColor: colors.button.green,
    paddingVertical: 7,
    width: 130,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: colors.white,
    fontFamily: fonts.nunito.semibold,
  },
  deliveryTitle: {
    fontFamily: fonts.nunito.bold,
    fontSize: 18,
    color: colors.text.primary,
  },
  deliverySubText: {
    fontSize: 12,
    fontFamily: fonts.nunito.normal,
    color: colors.text.grey,
  },
  deliveryTotalText: {
    fontFamily: fonts.nunito.bold,
    fontSize: 18,
    color: colors.text.tertiary,
  },
  line: {
    marginTop: 10,
    width: 250,
    backgroundColor: colors.grey,
    height: 1,
  },
});
