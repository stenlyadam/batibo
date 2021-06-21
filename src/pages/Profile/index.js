import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button, ProfileMenu} from '../../components';
import {colors, fonts} from '../../utils';
import {IMGProfilePicture} from '../../assets/images';
import {IconArrowRight} from '../../assets/icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getData} from '../../utils';
const Profile = ({navigation}) => {

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    getData('user').then(response => {
      const data = response;
      console.log('profile data: ' + data);
      setForm(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeaderContainer}>
        <View style={styles.profilePictureContainer}>
          <Image source={IMGProfilePicture} style={styles.profilePicture} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{form.username}</Text>
          <Text style={styles.emailText}>{form.email}</Text>
        </View>
        <View style={styles.optionContainer}>
          <Button
            type="icon-only"
            icon="icon-settings"
            onPress={() => navigation.navigate('EditProfile')}
          />
        </View>
      </View>
      <View style={styles.profileMenuContainer}>
        <ProfileMenu title="Voucher Saya" icon="icon-coupon" />
        <ProfileMenu
          title="Alamat"
          icon="icon-address"
          onClick={() => navigation.navigate('Address')}
        />
        <ProfileMenu title="Privasi dan Kebijakan" icon="icon-protection" />
        <ProfileMenu title="Bantuan" icon="icon-help" />
        <View>
          <TouchableOpacity style={styles.voucherButtonContainer}>
            <Text style={styles.keluarText}>Keluar</Text>
            <View style={styles.arrowRightContainer}>
              <IconArrowRight />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeaderContainer: {
    flexDirection: 'row',
  },
  profilePictureContainer: {
    width: 92,
    height: 92,
    borderRadius: 50,
    borderWidth: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.grey,
    marginLeft: 24,
    marginTop: 33,
  },
  nameContainer: {
    marginTop: 45,
    marginLeft: 14,
  },
  nameText: {
    fontFamily: fonts.nunito.bold,
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 4,
  },
  emailText: {
    fontFamily: fonts.nunito.semibold,
    fontSize: 14,
    color: colors.text.blue,
  },
  optionContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 24,
    marginTop: 45,
  },

  profileMenuContainer: {
    marginHorizontal: 24,
    flex: 1,
    marginTop: 38,
  },
  voucherContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    height: 52,
    marginBottom: 24,
  },
  voucherButtonContainer: {
    flexDirection: 'row',
    height: 27,
    alignItems: 'center',
  },
  arrowRightContainer: {
    flex: 1,
    height: 24,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  profileMenuTitleText: {
    fontFamily: fonts.nunito.normal,
    fontSize: 16,
    opacity: 0.7,
    marginLeft: 18,
  },
  keluarText: {
    color: colors.text.red,
    fontFamily: fonts.nunito.normal,
    fontSize: 16,
  },
});
