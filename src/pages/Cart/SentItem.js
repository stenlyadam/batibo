import React from 'react';
import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import {DummyBrokoliHijau} from '../../assets';
import {colors, fonts} from '../../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SentItem = ({id, title, price, status, image}) => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.picture} />
        </View>
        <View style={styles.deliveryTextContainer}>
          <Text style={styles.deliveryTitle}>{title}</Text>
          <View style={styles.line} />
          <View style={styles.deliveryCardBottomContainer}>
            <View>
              <Text style={styles.deliverySubText}>Total Belanja</Text>
              <Text style={styles.deliveryTotalText}>{price}</Text>
            </View>
            <View style={styles.deliveryButton}>
              <Text style={styles.buttonTitle}>{status}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SentItem;

const styles = StyleSheet.create({
  picture: {
    width: 87,
    height: 67,
    resizeMode: 'cover',
  },
  cardWrapper: {
    backgroundColor: colors.white,
    padding: 10,
    elevation: 10,
    borderRadius: 10,
    height: 110,
    marginBottom: 15,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
    width: 107,
    
  },
  deliveryTextContainer: {
    flex: 1,
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
    marginHorizontal: 15,
    width: 120,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: colors.white,
    fontSize: 13,
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
