import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from '../../components';
import {colors, fonts} from '../../utils';
import AddressItem from './AddressItem';

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
        <AddressItem
          title="Alamat Rumah"
          content="Airmadidi Atas, Kanaan Lingkungan IX, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara"
        />
        <AddressItem
          title="Alamat Rumah"
          content="Airmadidi Atas, Kanaan Lingkungan IX, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara"
        />
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
});
