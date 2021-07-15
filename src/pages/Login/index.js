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
import {colors, fonts, useForm, storeData} from '../../utils';
import {firebase} from '../../config';
import {useDispatch} from 'react-redux';

const Login = ({navigation}) => {
  dispatch = useDispatch();
  const [form, setForm] = useForm({
    username: '',
    email: '',
    password: '',
    uid: ''
  });

  const onContinue = () =>{
    firebase
      .auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(response => {
        // console.log('response: ' + response.user.uid)
        firebase
          .database()
          .ref(`users/${response.user.uid}/`)
          .once('value')
          .then(snapshot => {
            
            storeData('user', snapshot.val());
            dispatch({type: 'SAVE_USER', value:snapshot.val()})
            // console.log('snapshot success:' + JSON.stringify(snapshot.val()));
            navigation.replace('HomeScreen');
            
          })
          setForm('reset');
      })
      .catch(error => {
        console.log(error.message);
      })
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
            value={form.Registerpassword}
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
