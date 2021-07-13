import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {Button, Gap} from '../../components';
import {colors, fonts, getData, storeData} from '../../utils';
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
  const [totalAddress, setTotalAddress] = useState('');

  useEffect(() => {
    getData('user').then(response => {
      const data = response;
      setForm(data);
          });
        }, []);
        
  useEffect(() => {
    setListAddress(form.address);
    setTotalAddress(form.address.length);
  },[form.address])
  
  const deleteAddress = (item) => {
    firebase.database()
    .ref(`users/${form.uid}/address/${item}/`)
    .remove()
    .then(() => {
        firebase
        .database()
        .ref('users/' + form.uid)
        .once('value')
        .then(snapshot => {
            storeData('user', snapshot.val());
            // console.log('snapshot: ', snapshot);
            getData('user').then(response => {
              const data = response;
              const totalAlamat = listAddress.length - 1 ;
              console.log('total alamat setelah dikurangi: ', totalAlamat);
              setTotalAddress(totalAlamat);
              setForm(data);
              // setTotalAddress(form.address.length);
                  });
    })

    })
    .catch(error => {
        showMessage({
            message: error.message,
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
        });
    });
    // console.log('deleted data Address successfully');
    // console.log('jumlah address: ', totalAddress);
    setListAddress(form.address);
  } 


  return (

    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.backButtonContainer}>
          <Button
            type="icon-only"
            icon="icon-arrow-back"
            style={styles.backButton}
            onPress={() => navigation.goBack('Profile')}
            borderRadius={4}
          />
        </View>
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>Alamat</Text>
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.addressListContainer}>
          
        {listAddress.map(item => {
        return item && item.id != 0 ? (
          <AddressItem
          key={item.id}
          title={item.kategori}
          onDelete={() => deleteAddress(item.id)}
          address={`${item.kelurahan}, ${item.alamat}, ${item.kecamatan}, ${item.kota_kabupaten}, ${item.provinsi}`}
          onPress={() => navigation.navigate('EditAddress', item)}
        /> 
        )
        : console.log('totalAddress : ', totalAddress - 1);
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
              onPress={() => navigation.navigate('AddAddress')}
              />
        </View>
        <Gap height={32} />
      </ScrollView>
      

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
