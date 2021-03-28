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
import {colors, fonts} from '../../utils';

const Register = ({navigation}) => {
  return (
    <SafeAreaView style={styles.page}>
      <ImageBackground style={styles.headerContainer}>
        <Text style={styles.headerText}>Buat Akun Batibo</Text>
      </ImageBackground>
      <View style={styles.formContainer}>
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TextInput label="Username" placeholder="Masukan Username" />
            <Gap height={24} />
            <TextInput label="Email" placeholder="Masukan Email-mu" />
            <Gap height={24} />
            <TextInput
              label="Password"
              placeholder="Masukan Password-mu"
              secureTextEntry={true}
            />
            <Gap height={50} />
            <Button
              title="Sign Up"
              onPress={() => navigation.navigate('Login')}
            />
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
