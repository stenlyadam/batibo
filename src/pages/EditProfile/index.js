import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View, Text, SafeAreaView, ScrollView} from 'react-native';
import {DummyUserPhoto} from '../../assets';
import {Button, TextInput, Gap} from '../../components';
import {colors, fonts, getData, storeData, showMessage} from '../../utils';
import {launchImageLibrary} from 'react-native-image-picker';
import {API_HOST, firebase} from '../../config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

const EditProfile = ({navigation}) => {

  const dispatch = useDispatch();
  const {user} = useSelector(state => state.loginReducer);
  const {token} = useSelector(state => state.loginReducer);
  const {photoReducer} = useSelector((state) => state);
  // const user = useSelector(state => state.user);
  // console.log("User Select(Profile): ", user.photo);

  //form buat isi data sementara sebelum di update
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
  });

  const [photo, setPhoto] = useState(DummyUserPhoto);
  const [photoForDB, setPhotoForDB] = useState('');
  // const [nullPhotoData] = useState({
  //   uri : 'data:image/png;base64,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',
  //   type : 'image/png',
  //   name : 'userPhoto.png'
  // })
  // const [nullPhoto, setNullPhoto] = useState(false);

  console.log('dummy ', DummyUserPhoto);
  useEffect(() => {
    if(user.profile_photo_url != undefined){
      setPhoto({uri : user.profile_photo_url})
    }
}, [user]);

  const getImage = () => {
    launchImageLibrary(
      {quality: 0.2, maxWidth: 200, maxHeight: 200, includeBase64: true},
      response => {
        console.log('response: ', response);
        if (response.didCancel || response.error) {
          console.log('photo for DB from cancel : ', photoForDB);
        } else {
          // console.log('response getImage type: ', response.assets[0].base64);
          const source = {uri : response.assets[0].uri};
          const dataImage = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName
          };
          
          setPhoto(source);
          dispatch({type: 'SET_PHOTO', value: dataImage});
          dispatch({type: 'SET_UPLOAD_STATUS', value: true});
        }
      },
    );
  };

  const updateProfileData = () => {
    // dispatch({type: 'SET_LOADING', value: true});
    const dataUpdate = form;
    console.log('form  : ', dataUpdate);
    //bila nama sesuai
    if(form.name.length >= 5){
      //bila nomor sesuai
      if(form.phone_number.length >= 10){
        
        if(photoReducer.isUploadPhoto){
          const photoForUpload = new FormData();
          photoForUpload.append('file', photoReducer);
          
          axios.post(`${API_HOST.url}/user/photo`, photoForUpload, {
            headers: {
              Authorization: token,
              'Content-Type': 'multipart/form-data',
            },
          })
            .then((resUpload) => {
              
              console.log('upload berhasil : ', resUpload.data);
              //simpan data user terbaru
              axios.post(`${API_HOST.url}/user`, dataUpdate, {
                headers: {
                    'Accept' : 'application/json',
                    'Authorization' : token
                }
              })
              //simpan data user terbaru - jika berhasil
              .then(res => {
                user.profile_photo_url = `${API_HOST.storage}/${resUpload.data.data[0]}`
                dispatch({type: 'SET_USER', value: res.data.data});
                showMessage('Update profile berhasil', 'success');               
                navigation.goBack();
              })
              //simpan data user terbaru - jika tidak berhasil
              .catch((err) => {
                showMessage('Update belum berhasil. Silahkan coba lagi beberapa saat');
              })

            })
            .catch((errUpload) => {
              console.log('upload berhasil : ', errUpload.response);
            });
        }
        else {
          console.log('asdgasgdas');
          //simpan data user terbaru
          axios.post(`${API_HOST.url}/user`, dataUpdate, {
            headers: {
                'Accept' : 'application/json',
                'Authorization' : token
            }
          })
          //simpan data user terbaru - jika berhasil
          .then(res => {
            dispatch({type: 'SET_USER', value: res.data.data});
            showMessage('Update profile berhasil', 'success');               
            navigation.goBack();
          })
          //simpan data user terbaru - jika tidak berhasil
          .catch((err) => {
            showMessage('Update belum berhasil. Silahkan coba lagi beberapa saat');
          })
        }
      }
      //bila nomor tidak sesuai
      else{
        showMessage('Nomor Telpon Anda tidak sesuai');
      }
    }
    //bila nama tidak sesuai
    else{
      showMessage('nama harus minimal 5 karakter');
    }
      
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
              
                {
                  photo == DummyUserPhoto && 
                  <View style={styles.crossContainer}>
                  <Button
                    type="icon-only"
                    icon="icon-add"
                    style={styles.backButton}
                    borderRadius={4}
                    onPress={getImage}
                    />
                  </View>
                }
            </View>

            <View style={styles.contentWrapper}>
                <TextInput
                    label="Nama"
                    value={form.name}
                    onChangeText={value => changeText('name', value)}
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
                    keyboardType="numeric"
                    value={form.phone_number}
                    onChangeText={value => changeText('phone_number', value)}
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
