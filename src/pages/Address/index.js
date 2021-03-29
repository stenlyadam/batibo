import React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import {IMGProfilePicture} from '../../assets';
import {Button} from '../../components';
import {colors, fonts} from '../../utils';

const Address = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.backButtonContainer}>
          <Button
            type="icon-only"
            icon="icon-arrow-back"
            style={styles.backButton}
            onPress={() => navigation.navigate('Profile')}
          />
        </View>
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>Alamat</Text>
        </View>
      </View>

      <View style={styles.addressListContainer}>
        <View style={styles.addressContainer}>
          <View style={styles.iconRemoveContainer}>
            <Button
              type="icon-only"
              icon="icon-remove"
              style={styles.iconRemove}
            />
          </View>
          <Text style={styles.subTitle}>Alamat Rumah</Text>
          <Text style={styles.subTitle}>Amir Mahfudi</Text>
          <Text style={styles.text}>62 811 7812 0012</Text>
          <Text style={styles.text}>
            Airmadidi Atas, Kanaan Lingkungan IX, Kec. Airmadidi, Kabupaten
            Minahasa Utara, Sulawesi Utara
          </Text>
          <Button title="Ubah Alamat" />
        </View>
      </View>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  backButtonContainer: {
    backgroundColor: colors.button.primary.backgroundColor,
    opacity: 0.5,
    height: 38,
    width: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 32,
    marginLeft: 24,
    alignSelf: 'flex-start',
    position: 'absolute',
  },
  titleTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
  },
  titleText: {
    fontFamily: fonts.nunito.semibold,
    fontSize: 22,
    opacity: 0.7,
  },

  addressListContainer: {
    flex: 1,
    marginHorizontal: 24,
    marginTop: 30,
  },

  addressContainer: {
    height: 185,
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 10,
    elevation: 5,
    padding: 14,
  },
  iconRemoveContainer: {
    position: 'absolute',
    right: 14,
    top: 14,
  },
  text: {
    fontFamily: fonts.nunito.normal,
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 5,
  },
  subTitle: {
    fontFamily: fonts.nunito.semibold,
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: 5,
  },
});
