import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button, ProfileMenu} from '../../components';
import {colors, fonts} from '../../utils';
import {IconArrowRight} from '../../assets/icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getData} from '../../utils';
import { DummyUserPhoto } from '../../assets';
import {firebase} from '../../config';

const Profile = ({navigation}) => {

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    handphone: '',
    photo: DummyUserPhoto,
  });

  const [photo, setPhoto] = useState(DummyUserPhoto);

  useEffect(() => {
    getData('user').then(response => {
      const data = response;
      if(response.photo != undefined){
        setPhoto({uri:response.photo})
      }
      console.log('profile data: ' + JSON.stringify(photo));
      setForm(data);
    });
  }, []);

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('success sign out');
        navigation.replace('Login');
      })
      .catch(error => {
        showMessage({
          message: error.message,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
  };


  return (
    <View style={styles.container}>
      <View style={styles.profileHeaderContainer}>
        <View style={styles.profilePictureContainer}>
          <Image source={photo} style={styles.profilePicture} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{form.username}</Text>
          <Text style={styles.emailText}>{form.email}</Text>
          <Text style={styles.handphoneText}>Phone : {form.handphone}</Text>
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
          onClick={() => navigation.push('Address')}
        />
        <ProfileMenu title="Privasi dan Kebijakan" icon="icon-protection" />
        <ProfileMenu title="Bantuan" icon="icon-help" />
        <View>
          <TouchableOpacity style={styles.voucherButtonContainer} onPress={signOut}>
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
    borderRadius: 92/2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.grey,
    marginLeft: 24,
    marginTop: 33,
  },
  profilePicture: {
    width: 78,
    height: 78,
    borderRadius: 78/2,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 5,
  },
  handphoneText: {
    fontFamily: fonts.nunito.light,
    fontSize: 12,
    color: colors.text.primary,
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
