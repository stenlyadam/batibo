import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from '../../components';
import { colors, fonts } from '../../utils';

const AddressItem = ({title, nama_penerima, nomor_handphone, detail, onPress, onDelete}) => {

  const {address} = useSelector(state => state.loginReducer);
  console.log('address : ', address);

  return (
    <View style={styles.addressContainer}>
      <View style={styles.iconRemoveContainer}>
        {address.length > 1 && <Button type="icon-only" icon="icon-remove" onPress={onDelete}/>}
      </View>  
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{nama_penerima}</Text>
      <Text style={styles.phone}>{nomor_handphone}</Text>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{detail}</Text>
      </View>
      <Button 
          title="Ubah Alamat" 
          onPress={onPress} 
          borderRadius={5}
          buttonColor={colors.button.tertiary.backgroundColor}
          borderColor={colors.button.tertiary.borderColor}
          borderWidth={1}
          textColor={colors.button.tertiary.text}
          size={14} 
          height={9} 
      />
    </View>
  );
};

export default AddressItem;

const styles = StyleSheet.create({
  addressContainer: {
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 10,
    elevation: 5,
    padding: 14,
    marginBottom: 20,
  },
  iconRemoveContainer: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 32,
    height: 32,
    justifyContent:'center'
  },
  textWrapper:{
    maxWidth: 320,
  },
  text: {
    fontFamily: fonts.nunito.normal,
    fontSize: 12,
    color: colors.text.grey,
    marginBottom: 6,
  },
  phone: {
    fontFamily: fonts.nunito.normal,
    fontSize: 12,
    color: colors.text.grey,
    marginBottom: 5,
  },
  title: {
    fontFamily: fonts.nunito.semibold,
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: 5,
    maxWidth: 280,
  },
});
