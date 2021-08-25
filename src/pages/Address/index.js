import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {Button, Gap} from '../../components';
import {colors, fonts, getData, storeData} from '../../utils';
import AddressItem from './AddressItem';
import { firebase } from '../../config';
import {useDispatch , useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

const Address = ({navigation}) => {

  const user = useSelector(state => state.user);
  console.log('user selector address: ', user.address);
  const dispatch = useDispatch();

  // const [form, setForm] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  //   uid: '',
  //   address: [],
  // },[]);

  const [listAddress, setListAddress] = useState([]);
  const [totalAddress, setTotalAddress] = useState('');

  // useEffect(() => {
  //   getData('user').then(response => {
  //     const data = response;
  //     setForm(data);
  //         });
  //       }, []);
        
  useEffect(() => {
    setListAddress(user.address);
    let tempAddress = 0;

    listAddress.map(item => {
      if(item != null && item.id != 0 ){
        tempAddress = tempAddress + 1;
      }
      console.log('temp address length :', tempAddress);
    })

    // userCart.map(item => {
    //   //taru proses untuk mapping cart dari user(redux) untuk ditampilkan pada flat list menggantikan cart map dibawah  
    //   if(item && item.id != 0){
    //     console.log('user cart mapping : ', item);
    //     const data = item;
    //     data["count"] = item.count;
    //     setListCart(listCart => [...listCart, data])
    //   }
    //   console.log('temp price : ', tempPrice);
    //   tempPrice += (item.price * item.count);
    // })

    setTotalAddress(user.address.length);
    console.log('total address ', totalAddress);


  },[user.address])
  
  const deleteAddress = (address) => {
    // firebase.database()
    // .ref(`users/${user.uid}/address/${item}/`)
    // .remove()
    // .then(() => {
    //     firebase
    //     .database()
    //     .ref('users/' + user.uid)
    //     .once('value')
    //     .then(snapshot => {
    //         dispatch({type: 'SAVE_USER', value:snapshot.val()})
    //         const totalAlamat = listAddress.length - 1 ;
    //         setTotalAddress(totalAlamat);
    // })
    // })
    // .catch(error => {
    //     showMessage({
    //         message: error.message,
    //         type: 'default',
    //         backgroundColor: colors.error,
    //         color: colors.white,
    //     });
    // });
    // console.log('deleted data Address successfully');
    // console.log('jumlah address: ', totalAddress);
    

    dispatch({type: 'SET_LOADING', value: true});
    firebase.database()
      .ref(`users/${user.uid}/address/${address}/`)
      .remove()
      .then(() => {
      const updateAddress = user.address;

      updateAddress.map(item => {
        if(address < item.id){
          const data = {
            alamat: item.alamat,
            id: item.id - 1,
            kategori: item.kategori,
            kecamatan: item.kecamatan,
            kelurahan: item.kelurahan,
            kota_kabupaten:item.kota_kabupaten,
            provinsi: item.provinsi,
          }
          // console.log('helooooooouuu');
          firebase.database()
          .ref(`users/${user.uid}/address/`)
          .child(data.id)
          .update(data)
        }
          // .then(() => {
                const deleteAddressAfterUpdate = user.address.length - 1;
                console.log('product to delete after update : ', deleteAddressAfterUpdate)
                
                firebase.database()
                .ref(`users/${user.uid}/address/${deleteAddressAfterUpdate}/`)
                .remove()
                .then(() => {

                  firebase
                  .database()
                  .ref(`users/${user.uid}/`)
                  .once('value')
                  .then(snapshot => {
                    dispatch({type: 'SET_LOADING', value: false});
                    dispatch({type: 'SAVE_USER', value:snapshot.val()})
                    const totalAlamat = listAddress.length - 1 ;
                    setTotalAddress(totalAlamat);
                    showMessage({
                      message: "Alamat yang dipilih berhasil dihapus",
                      type: 'default',
                      backgroundColor: colors.primary,
                      color: colors.white,
                })
              })
            })
            .catch(error => {
              dispatch({type: 'SET_LOADING', value: false});
              showMessage({
                  message: error.message,
                  type: 'default',
                  backgroundColor: colors.error,
                  color: colors.white,
              });
          });
          setListAddress(user.address);
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
        return item != null && item.id != 0 ? (
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
              onPress={() => navigation.navigate('AddAddress', totalAddress)}
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
