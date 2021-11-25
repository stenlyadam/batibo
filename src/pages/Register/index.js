import React, { useEffect } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, Gap, Link, TextInput} from '../../components';
import {firebase} from '../../config';
import {colors, fonts, useForm, storeData, showMessage} from '../../utils';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { API_HOST } from '../../config';
import { setLoading } from '../../redux/action';

const Register = ({navigation}) => {


  const registerReducer = useSelector((state) => state.registerReducer);

  const [form, setForm] = useForm({
    name: '',
    email: '',
    password: '',
    phone_number: '',
  },[]);

  const dispatch = useDispatch();
  
  const onContinue = () => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //jika data belum lengkap
    if(form.name == '' || form.email == '' || form.password == '' || form.phone_number == ''){
        showMessage('Data Anda belum lengkap');
    }
    else{
      //bila email sesuai
      if(form.email.match(mailformat)){
        //bila nomor sesuai
        if(form.phone_number.length >= 10){
          //bila password sesuai
          if(form.password.length >= 8){
            //set nilai default koordinat(reducer)
            dispatch({
              type: 'SET_COORDINATES', 
              value: {latitude : 0, longitude : 0, distance: 0}
            })
            dispatch({type: 'SET_REGISTER', value: form});
            navigation.navigate('RegisterAddress', form);
          }
          //bila password tidak sesuai
          else{
            showMessage('Password harus 8 karakter atau lebih');
          }
        }
        //bila nomor tidak sesuai
        else{
          showMessage('Nomor Telpon Anda tidak sesuai');
        }
      }
      //bila email tidak sesuai
      else{
        showMessage('Email Anda tidak sesuai');
      }
      
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <ImageBackground style={styles.headerContainer}>
        <Text style={styles.headerText}>Buat Akun Batibo</Text>
      </ImageBackground>
      <View style={styles.formContainer}>
        <View>
        <ScrollView showsVerticalScrollIndicator={false}>
            <TextInput
              label="Username"
              placeholder="Masukan Username"
              value={form.name}
              onChangeText={(value) => setForm('name', value)}
              require
            />
            <Gap height={18} />
            <TextInput
              label="Email"
              placeholder="Masukan Email-mu"
              value={form.email}
              onChangeText={(value) => setForm('email', value)}
            />
            <Gap height={18} />
            <TextInput
              label="Phone Number"
              placeholder="Masukan Nomor Telpon-mu"
              keyboardType="numeric"
              value={form.phone_number}
              onChangeText={(value) => setForm('phone_number', value)}
            />
            <Gap height={18} />
            <TextInput
              label="Password"
              placeholder="Masukan Password-mu"
              value={form.password}
              onChangeText={(value) => setForm('password', value)}
              secureTextEntry={true}
            />
            <Gap height={32} />
            <Button title="Next" onPress={onContinue} borderRadius={10}/>
            <Gap height={4} />
            </ScrollView>
        </View>
        <View style={styles.bottomContainer}>
          <Text>Sudah punya Akun?</Text>
          <Gap width={8} />
          <Link
            label="Sign In"
            color={colors.primary}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      
      </View>
      
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    height: 166,
    backgroundColor: colors.primary,
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: fonts.primary[700],
    fontSize: 24,
    marginLeft: 24,
    color: colors.white,
  },
  formContainer: {
    marginTop: 24,
    marginHorizontal: 24,
    justifyContent: 'space-between',
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
  },
});
