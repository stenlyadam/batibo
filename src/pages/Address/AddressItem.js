import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from '../../components';
import {colors, fonts} from '../../utils';

const AddressItem = ({title, content}) => {
  return (
    <View style={styles.addressContainer}>
      <View style={styles.iconRemoveContainer}>
        <Button type="icon-only" icon="icon-remove" style={styles.iconRemove} />
      </View>
      <Text style={styles.subTitle}>{title}</Text>
      <Text style={styles.text}>{content}</Text>
      <Button title="Ubah Alamat" />
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
    right: 14,
    top: 14,
  },
  text: {
    fontFamily: fonts.nunito.normal,
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 5,
  },
  subTitle: {
    fontFamily: fonts.nunito.semibold,
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: 5,
  },
});
