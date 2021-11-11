import React, {useEffect} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {IMGLogoBatibo} from '../../assets';
import {colors, storeData, getData} from '../../utils';
import {firebase} from '../../config';
import {useDispatch , useSelector} from 'react-redux';
import { userAuthAction } from '../../redux/action';

const {width} = Dimensions.get('window');

const Splash = ({navigation}) => {

const dispatch = useDispatch();
// const user = useSelector(state => state.user);
// console.log('user in redux: ', user);

  useEffect(() => {
    setTimeout(() => {
      getData('oldApp').then((res) => {
        //jika aplikasi baru diinstal
        if(res == null){
          navigation.replace('OnBoarding');
        }
        //jika tidak
        else{
          getData('token').then((resToken) => {
            console.log('token : ', resToken);
            if (resToken) {
              dispatch(userAuthAction(resToken, navigation));
            } else {
              navigation.replace('Login');
            }
          })
        }
      })
    }, 2000);
  }, []);
  
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
