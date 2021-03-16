import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, Gap, Link, TextInput} from '../../components';
import {colors, fonts} from '../../utils';
import {IMGProfilePicture} from '../../assets/images';
import {
  IconCoupon,
  IconAddress,
  IconProtection,
  IconHelp,
  IconArrowRight,
} from '../../assets/icons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Profile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileHeaderContainer}>
        <View style={styles.profilePictureContainer}>
          <Image source={IMGProfilePicture} style={styles.profilePicture} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>Amir Mahfudi</Text>
          <Text style={styles.emailText}>amir@gmail.com</Text>
        </View>
        <View style={styles.optionContainer}>
          <Button type="icon-only" icon="icon-dots-option" />
        </View>
      </View>
      <View style={styles.profileMenuContainer}>
        <View style={styles.voucherContainer}>
          <TouchableOpacity style={styles.voucherButtonContainer}>
            <IconCoupon />
            <Text style={styles.profileMenuTitleText}>Voucher Saya</Text>
            <View style={styles.arrowRightContainer}>
              <IconArrowRight />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.voucherContainer}>
          <TouchableOpacity style={styles.voucherButtonContainer}>
            <IconAddress />
            <Text style={styles.profileMenuTitleText}>Alamat</Text>
            <View style={styles.arrowRightContainer}>
              <IconArrowRight />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.voucherContainer}>
          <TouchableOpacity style={styles.voucherButtonContainer}>
            <IconProtection />
            <Text style={styles.profileMenuTitleText}>
              Privasi dan Kebijakan
            </Text>
            <View style={styles.arrowRightContainer}>
              <IconArrowRight />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.voucherContainer}>
          <TouchableOpacity style={styles.voucherButtonContainer}>
            <IconHelp />
            <Text style={styles.profileMenuTitleText}>Bantuan</Text>
            <View style={styles.arrowRightContainer}>
              <IconArrowRight />
            </View>
          </TouchableOpacity>
        </View>
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
