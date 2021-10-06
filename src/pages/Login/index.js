import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {IMGBackground} from '../../assets';
import {Button, CheckBox, Gap, Link, TextInput} from '../../components';
import {colors, fonts, useForm, storeData, showMessage, getData} from '../../utils';
import {firebase} from '../../config';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import { API_HOST } from '../../config';
import { setLoading, signInAction } from '../../redux/action';

const Login = ({navigation}) => {

  const [form, setForm] = useForm({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const onContinue = () => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    //jika data belum diisi - email & password
    if(form.email == '' && form.password == ''){
      showMessage('Anda belum mengisi email dan password');
    }
    //jika data belum diisi - email
    else if(form.email == ''){
        showMessage('Anda belum mengisi email');
    }
    //jika data belum diisi - password
    else if(form.password == ''){
      showMessage('Anda belum mengisi password');
    }
    //jika data telah diisi
    else{
      //bila email sesuai
      if(form.email.match(mailformat)){
        dispatch(signInAction(form, navigation));
      }
      //bila email tidak sesuai
      else{
        showMessage('Email Anda tidak sesuai');
      }
    }  
  }

  return (
    <SafeAreaView style={styles.page}>
      <ImageBackground source={IMGBackground} style={styles.headerContainer}>
        <Text style={styles.headerText}>Selamat Datang!</Text>
      </ImageBackground>
      <View style={styles.formContainer}>
        <View>
          <TextInput 
          label="Email" 
          placeholder="Masukan Email-mu" 
          value={form.email}
          onChangeText={(value) => setForm('email', value)}
          />
          <Gap height={24} />
          <TextInput
            label="Password"
            placeholder="Masukan Password-mu"
            value={form.password}
            onChangeText={(value) => setForm('password', value)}
            secureTextEntry={true}
          />
          <View style={styles.forgotPasswordWrapper}>
            <CheckBox label="Ingat Saya" />
            <Link label="Lupa Password?" />
          </View>
          <Gap height={50} />
          <Button
            title="Sign In"
            onPress={onContinue}
            borderRadius={10}
          />
        </View>
        <View style={styles.bottomContainer}>
          <Text>Belum punya Akun?</Text>
          <Gap width={8} />
          <Link
            label="Sign Up"
            color={colors.primary}
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    height: 166,
    backgroundColor: colors.button.green,
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: fonts.primary[700],
    fontSize: 24,
    marginLeft: 24,
    color: colors.white,
    textShadowOffset: {width: 2, height: 5},
    textShadowRadius: 15,
  },
  formContainer: {
    marginTop: 40,
    marginHorizontal: 24,
    justifyContent: 'space-between',
    flex: 1,
  },
  forgotPasswordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
  },
});
