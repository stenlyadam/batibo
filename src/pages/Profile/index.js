import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from "react-redux";
import { DummyUserPhoto } from '../../assets';
import { IconArrowRight } from '../../assets/icons';
import { Button, ProfileMenu } from '../../components';
import { firebase } from '../../config';
import { setLoading } from '../../redux/action/global';
import { colors, fonts, showMessage } from '../../utils';

const Profile = ({navigation}) => {

  const dispatch = useDispatch();
  const {user} = useSelector(state => state.loginReducer);
  const [photo, setPhoto] = useState(DummyUserPhoto);
  const [disableButton, setdisableButton] = useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  useEffect(() => {
    console.log('user photo ', user);
    if(user.profile_photo_url != undefined){
      setPhoto({uri : user.profile_photo_url})
    }
}, [user]);

  const signOut = () => {
    setdisableButton(true);
    dispatch(setLoading(true));
    AsyncStorage.multiRemove(['userProfile', 'token'])
    .then(() => {
      setTimeout(() =>{ 
        navigation.reset({index: 0, routes: [{name: 'Login'}]}), 
        showMessage('Logout Success', 'success')
        }, 1000);
    })
    .catch(() => {
      dispatch(setLoading(false));
      showMessage('Terjadi error pada proses logout user');
    })
    wait(1000).then(() => dispatch(setLoading(false)));
    wait(1000).then(() => setdisableButton(false));
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeaderContainer}>
        <View style={styles.profilePictureContainer}>
          <Image source={photo} style={styles.profilePicture} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{user.name}</Text>
          <Text style={styles.emailText}>{user.email}</Text>
          <Text style={styles.handphoneText}>Phone : {user.phone_number}</Text>
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
          <TouchableOpacity style={styles.voucherButtonContainer} onPress={signOut} disabled={disableButton}>
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
