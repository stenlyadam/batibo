import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from '../../components';
import {colors, fonts, getData} from '../../utils';
import AddressItem from './AddressItem';
import { firebase } from '../../config';

const Address = ({navigation}) => {

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    uid: '',
    address: [],
  },[]);

  const [listAddress, setListAddress] = useState([]);

  useEffect(() => {
    getData('user').then(response => {
      const data = response;
      setForm(data);
      console.log('form: ', form);
      // setListAddress(form.address);
      
      
      // firebase
      // .database()
      // .ref('users/' + form.uid + '/address')
      // .once('value')
      // .then(response => {
        //   // console.log('data: ', form.uid);
        //   if (response.val()) {
          //     setListAddress(response.val());
          //     // console.log('data: ', listAddress);
          
          //   }
          // })
          // .catch(error => {
            //   showError(error.message);
            // });
          });
        }, []);
        
  useEffect(() => {
    console.log('data user:  ', form.address)
    setListAddress(form.address);
  },[form])
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.backButtonContainer}>
          <Button
            type="icon-only"
            icon="icon-arrow-back"
            style={styles.backButton}
            onPress={() => navigation.navigate('Profile')}
            borderRadius={4}
          />
        </View>
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>Alamat</Text>
        </View>
      </View>

      <View style={styles.addressListContainer}>

        {listAddress.map(item => {
        return (
          <AddressItem
          key={item.id}
          title={item.kategori}
          address={`${item.kelurahan}, ${item.alamat}, ${item.kecamatan}, ${item.kota_kabupaten}, ${item.provinsi}`}
          onPress={() => navigation.navigate('EditAddress', item)}
        /> 
        )
      })}

      </View>
      <View style = {styles.buttonExpand}>
            <Button 
            title="Tambah Alamat" 
            size={16} 
            height={10} 
            space={358} 
            color={"secondary"}
            borderRadius={4}
            // onPress={() => navigation.navigate('AddAddress')}
            />
        </View>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  backButtonContainer: {
    backgroundColor: colors.button.primary.backgroundColor,
    opacity: 0.5,
    height: 38,
    width: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 32,
    marginLeft: 24,
    alignSelf: 'flex-start',
    position: 'absolute',
  },
  titleTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
  },
  titleText: {
    fontFamily: fonts.nunito.semibold,
    fontSize: 22,
    opacity: 0.7,
  },
  addressListContainer: {
    marginHorizontal: 24,
    marginTop: 30,
  },
  buttonExpand: {
    paddingTop: 10,
    alignItems: 'center',
  }
});
