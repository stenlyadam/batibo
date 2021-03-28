import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, CheckBox, Gap, Link, TextInput} from '../../components';
import {colors, fonts} from '../../utils';

const Login = ({navigation}) => {
  return (
    <SafeAreaView style={styles.page}>
      <ImageBackground style={styles.headerContainer}>
        <Text style={styles.headerText}>Selamat Datang</Text>
      </ImageBackground>
      <View style={styles.formContainer}>
        <View>
          <TextInput label="Email" placeholder="Masukan Email-mu" />
          <Gap height={24} />
          <TextInput
            label="Password"
            placeholder="Masukan Password-mu"
            secureTextEntry={true}
          />
          <View style={styles.forgotPasswordWrapper}>
            <CheckBox label="Ingat Saya" />
            <Link label="Lupa Password?" />
          </View>
          <Gap height={50} />
          <Button
            title="Sign In"
            onPress={() => navigation.replace('HomeScreen')}
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
