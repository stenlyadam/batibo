import React from 'react';
import {useEffect} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import {IMGWortel, IMGProfilePicture, IconCross} from '../../assets';
import {Button} from '../../components';
import {colors, fonts} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const EditProfile = ({navigation}) => {
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
          <Text style={styles.titleText}>Edit Profile</Text>
        </View>
      </View>

      <View style={styles.profilePictureWrapper}>
        <View style={styles.profilePictureContainer}>
          <Image source={IMGProfilePicture} style={styles.profilePicture} />
        </View>
        <View style={styles.crossContainer}>
          <Button
            type="icon-only"
            icon="icon-cross"
            style={styles.backButton}
          />
        </View>
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.contentContainer}>
          <View style={styles.contentTitleContainer}>
            <Text style={styles.contentTitle}>Nama</Text>
          </View>
          <View style={styles.contentValueContainer}>
            <Text style={styles.contentValueName}>Amir Mahfudi</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.contentTitleContainer}>
            <Text style={styles.contentTitle}>Email</Text>
          </View>
          <View style={styles.contentValueContainer}>
            <Text style={styles.contentValue}>amir@gmail.com</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.contentTitleContainer}>
            <Text style={styles.contentTitle}>No.Handphone</Text>
          </View>
          <View style={styles.contentValueContainer}>
            <Text style={styles.contentValue}>+62 811 7812 0012</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditProfile;

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

  profilePictureWrapper: {
    marginTop: 38,
    marginLeft: 25,
  },
  profilePictureContainer: {
    backgroundColor: colors.white,
    // paddingHorizontal: 5,
    // paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 85,
    height: 85,
    borderRadius: 50,
    borderColor: colors.grey,
    borderWidth: 1,
  },
  crossContainer: {
    backgroundColor: 'red',
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.grey,
    position: 'absolute',
    marginTop: 60,
    marginLeft: 60,
  },

  contentWrapper: {
    marginTop: 38,
  },
  contentContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    paddingBottom: 14,
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contentTitleContainer: {
    width: 150,
  },
  contentTitle: {
    fontFamily: fonts.nunito.normal,
    fontSize: 14,
  },
  contentValueContainer: {},
  contentValue: {
    fontFamily: fonts.nunito.semibold,
    fontSize: 14,
  },
  contentValueName: {
    fontFamily: fonts.nunito.bold,
  },
});
