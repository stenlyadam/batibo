import React from 'react';
import {useEffect} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {IMGLogoBatibo} from '../../assets';
import {colors} from '../../utils';

const {width} = Dimensions.get('window');

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('OnBoarding');
    }, 2000);
  });

  return (
    <View style={styles.container}>
      <Image source={IMGLogoBatibo} style={styles.logo} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width / 2,
    height: width / 2,
  },
});
