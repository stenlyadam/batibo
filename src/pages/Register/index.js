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
import axios from 'axios';

const Register = ({navigation}) => {
  const [form, setForm] = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone_number: '',
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

  const [defaultCart] = useForm({
    id: 0,
    category: ' ',
    count: ' ',
    detail: ' ',
    discount: ' ',
    image: ' ',
    name: ' ',
    price: ' ',
    priceAfterDiscount: ' ',
    productUnit: ' ',
  })

  const onContinue = () => {
    console.log('form : ', form);
    form.password_confirmation = form.password;
    console.log('form update: ', form);

    axios.post('http://192.168.1.19:8081/api/register', form, {
      headers: {
        Accept : 'application/json'
      }
    })
    .then(res => {
      console.log('berhasil mendaftar', res.data);
      navigation.replace('Login');
    })
    .catch(err => {
      console.log('tidak berhasil', err);
    })

    // console.log(form);
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(form.email, form.password)
    //   .then((success) => {
    //     setForm('reset');
    //     const data = {
    //       username: form.username,
    //       email: form.email,
    //       uid: success.user.uid,
    //       handphone: form.handphone,
    //       photo: 'data:image/png;base64,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',
    //       address: [defaultAddress],
    //       cart: [defaultCart]
    //     };
    //     firebase
    //       .database()
    //       .ref('users/' + success.user.uid + '/')
    //       .set(data);
    //     // console.log('data: ', data);
    //     storeData('users', data);

    //     // console.log('register success', success);
    //     navigation.replace('Login');
    //   })
    //   .catch((error) => {
    //     const errorMessage = error.message;
    //     console.log('error register: ', errorMessage);
    //   });
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
              value={form.password}
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
