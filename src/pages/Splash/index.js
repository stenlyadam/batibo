import React from 'react';
import {useEffect} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {IMGLogoBatibo} from '../../assets';
import {colors, storeData} from '../../utils';
import {firebase} from '../../config';
import {useDispatch , useSelector} from 'react-redux';

const {width} = Dimensions.get('window');

const Splash = ({navigation}) => {

const dispatch = useDispatch();
const user = useSelector(state => state.user);
console.log('user in redux: ', user);

  useEffect(() => {
    setTimeout(() => {
      // check keberadaan user pada app
      firebase
      .auth()
      .onAuthStateChanged(user => {
        if(user){
          //ambil data 
          console.log('user: ', user.uid)
          firebase
          .database()
          .ref(`users/${user.uid}/`)
          .once('value')
          .then(snapshot => {
            storeData('user', snapshot.val());
            dispatch({type: 'SAVE_USER', value:snapshot.val()})
            // console.log('snapshot success:' + JSON.stringify(snapshot.val()));
            navigation.replace('MainApp');
          })
        }
          else{
          //user logout
          // console.log('user belum login')
          navigation.replace('OnBoarding');
        }
      })
      // navigation.replace('OnBoarding');
    }, 2000);
  }, [navigation]);
  
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
