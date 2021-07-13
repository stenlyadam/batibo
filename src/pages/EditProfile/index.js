import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View, Text, SafeAreaView, ScrollView} from 'react-native';
import {DummyUserPhoto} from '../../assets';
import {Button, TextInput, Gap} from '../../components';
import {colors, fonts, getData, storeData} from '../../utils';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {firebase} from '../../config';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EditProfile = ({navigation}) => {

  const [form, setForm] = useState({
    username: '',
    email: '',
    uid: '',
    password: '',
    handphone: '',
    photo: DummyUserPhoto,
  });

  const [photo, setPhoto] = useState(DummyUserPhoto);
  const [photoForDB, setPhotoForDB] = useState('');
  const [getImageCheck, setGetImageCheck] = useState(false);

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

  const getImage = () => {
    launchImageLibrary(
      {quality: 0.2, maxWidth: 200, maxHeight: 200, includeBase64: true},
      response => {
        console.log('response: ', response);
        if (response.didCancel || response.error) {
          console.log('response getImage type: ', form);
          setPhotoForDB(form.photo);
          setGetImageCheck(true);
        } else {
          console.log('response getImage type: ', response.assets[0].type);
          setPhotoForDB(`data:${response.assets[0].type};base64, ${response.assets[0].base64}`);
          const source = {uri: response.assets[0].uri};
          setPhoto(source);
          setGetImageCheck(true);
        }
      },
    );
  };

  const updateProfileData = () => {
    const dataUpdate = form;

    if (getImageCheck) {
      dataUpdate.photo = photoForDB;
      console.log('data from get Image: ', dataUpdate.photo);
    }
    if (!getImageCheck) {
      dataUpdate.photo = form.photo;
      console.log('data from useEffect: ', dataUpdate.photo);
    }
    
    firebase
      .database()
      .ref('users/' + form.uid + '/')
      .update(dataUpdate)
      .then(() => {
        firebase
          .database()
          .ref(`users/${form.uid}/`)
          .once('value')
          .then(snapshot => {
            console.log('snapshot success:' + JSON.stringify(snapshot.val()));
            storeData('user', snapshot.val());
            navigation.replace('HomeScreen');
            showMessage({
              message: "Data Profil Anda berhasil disimpan",
              type: 'default',
              backgroundColor: colors.primary,
              color: colors.white,
            })
          })
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

  const changeText = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View style={styles.backButtonContainer}>
                <Button
                  type="icon-only"
                  icon="icon-arrow-back"
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                  borderRadius={4}
                />
              </View>
              <View style={styles.titleTextContainer}>
                <Text style={styles.titleText}>Edit Profile</Text>
              </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.profilePictureWrapper}>
              <TouchableOpacity style={styles.profilePictureContainer} onPress={getImage}>
                <Image source={photo} style={styles.profilePicture} />
              </TouchableOpacity>
              <View style={styles.crossContainer}>
                <Button
                  type="icon-only"
                  icon="icon-cross"
                  style={styles.backButton}
                  borderRadius={4}
                />
              </View>
            </View>

            <View style={styles.contentWrapper}>
              {/* <View style={styles.contentContainer}>
                <View style={styles.contentTitleContainer}>
                  <Text style={styles.contentTitle}>Nama</Text>
                </View>
                <View style={styles.contentValueContainer}>
                  <Text style={styles.contentValueName}>{form.username}</Text>
                </View>
              </View>

              <View style={styles.contentContainer}>
                <View style={styles.contentTitleContainer}>
                  <Text style={styles.contentTitle}>Email</Text>
                </View>
                <View style={styles.contentValueContainer}>
                  <Text style={styles.contentValue}>{form.email}</Text>
                </View>
              </View>

              <View style={styles.contentContainer}>
                <View style={styles.contentTitleContainer}>
                  <Text style={styles.contentTitle}>No.Handphone</Text>
                </View>
                <View style={styles.contentValueContainer}>
                  <Text style={styles.contentValue}>+62 811 7812 0012</Text>
                </View>
              </View> */}

                <TextInput
                    label="Nama"
                    value={form.username}
                    onChangeText={value => changeText('username', value)}
                  />
                <Gap height={14} />
                <TextInput
                    label="Email"
                    value={form.email}
                    onChangeText={value => changeText('email', value)}
                    disable
                  />
                <Gap height={14} />
                <TextInput
                    label="No.Handphone"
                    value={form.handphone}
                    onChangeText={value => changeText('handphone', value)}
                  />
                <Gap height={22} />
                <Button title="Save Profile" borderRadius={8} onPress={updateProfileData} />
            </View>
            </ScrollView>
          </View>
    </SafeAreaView>
    
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 105,
    paddingBottom: 105/2,
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
    marginTop: 10,
    marginLeft: 25,
    width: 95,
    height: 95,
  },
  profilePictureContainer: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: 95,
    height: 95,
    borderRadius: 95/2,
    borderColor: colors.grey,
    borderWidth: 1,
  },
  profilePicture: {
    width: 84,
    height: 84,
    borderRadius: 84/2,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 65,
    marginLeft: 65,
  },
  contentWrapper: {
    marginVertical: 38,
    marginHorizontal: 24,
  },
  contentContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    paddingBottom: 14,
    marginBottom: 14,
    borderBottomWidth: 0,
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
