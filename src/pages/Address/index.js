import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView, Alert} from 'react-native';
import {Button, Gap} from '../../components';
import {colors, fonts, getData, storeData} from '../../utils';
import AddressItem from './AddressItem';
import { API_HOST, firebase } from '../../config';
import {useDispatch , useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import axios from 'axios';

const Address = ({navigation}) => {

  const dispatch = useDispatch();
  const {address} = useSelector(state => state.loginReducer);
  const {token} = useSelector(state => state.loginReducer);
  const [listAddress, setListAddress] = useState([]);

  useEffect(() => {
    setListAddress([]);
    address.map(item => {
      if(item){
        const data = item;
        setListAddress(listAddress => [...listAddress, data])
      }
    })
  }, [address])

  const onDelete = (addressId) => {
    Alert.alert(
      "Konfirmasi",
      "Apakah anda menghapus alamat ini?.",
      [
        {
          text: "Tidak",
          onPress: () => console.log('hallo'),
          style: "cancel"
        },
        { text: "Ya", onPress: () => deleteAddress(addressId) }
      ]
    );
  }

  const deleteAddress = (addressId) => {
    //delete address dalam database (addresses)
    axios.delete(`${API_HOST.url}/address/${addressId}`, {
      headers: {
      'Accept' : 'application/json',
      'Authorization' : token,
      }
    })
    //delete data address dalam database (addresses) - jika berhasil
    .then(resAddress => {
    //ambil data address terbaru dari database
    axios.get(`${API_HOST.url}/address`, {
        headers: {
        'Accept' : 'application/json',
        'Authorization' : token,
        }
    })
    //ambil data address terbaru dari database - jika berhasil
    .then(resUpdateAddress => {
        //simpan data ADDRESS user ke dalam data reducer
        dispatch({type: 'SET_ADDRESS', value: resUpdateAddress.data.data.data});
        
    })
    //ambil data address terbaru dari database - jika tidak berhasil
    .catch(errUpdateAddress => {
        showMessage('Terjadi kesalahan pada penambahan data');
    })
    })
    //delete data address ke database (addresses) - jika tidak berhasil
    .catch((errAddress) => {
        showMessage('Terjadi kesalahan pada penghapusan data product pada API Address User');
    })
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
        return (
          <AddressItem
            key={item.id}
            title={item.kategori}
            nama_penerima={item.nama_penerima}
            nomor_handphone={item.nomor_handphone}
            onDelete={() => onDelete(item.id)}
            detail={`${item.kelurahan}, ${item.detail_alamat}, ${item.kecamatan}, ${item.kota_kabupaten}, ${item.provinsi}`}
            onPress={() => navigation.navigate('EditAddress', {
              id : item.id,
              detail_alamat : item.detail_alamat,
              kategori : item.kategori,
              kecamatan : item.kecamatan,
              kelurahan : item.kelurahan,
              kota_kabupaten : item.kota_kabupaten,
              provinsi : item.provinsi,
            })}
          /> 
        )
        })} 
        </View>
        <View style = {styles.buttonExpand}>
          <Button 
            title="Tambah Alamat" 
            size={14} 
            height={11} 
            space={358}
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
    marginTop: 18,
    marginBottom: 32,
    alignItems: 'center'
  }
});
