import React from 'react';
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
import {colors, fonts, useForm, storeData} from '../../utils';

const Register = ({navigation}) => {
  const [form, setForm] = useForm({
    username: '',
    email: '',
    password: '',
    handphone: '',
  });
  
  const [defaultAddress] = useForm({
    id: 0,
    kategori: ' ',
    kelurahan: ' ',
    alamat: ' ',
    kecamatan: ' ',
    kota_kabupaten: ' ',
    provinsi: ' ',
  })

  const onContinue = () => {
    console.log(form);
    firebase
      .auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((success) => {
        setForm('reset');
        const data = {
          username: form.username,
          email: form.email,
          uid: success.user.uid,
          handphone: form.handphone,
          address: [defaultAddress],
        };
        firebase
          .database()
          .ref('users/' + success.user.uid + '/')
          .set(data);
        // console.log('data: ', data);
        storeData('users', data);

        // console.log('register success', success);
        navigation.replace('Login');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log('error register: ', errorMessage);
      });
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
              value={form.username}
              onChangeText={(value) => setForm('username', value)}
            />
            <Gap height={24} />
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
            <Gap height={50} />
            <Button title="Sign Up" onPress={onContinue} borderRadius={10}/>
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
    marginTop: 40,
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
