import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Check from '@react-native-community/checkbox';
import {fonts} from '../../../utils';

const CheckBox = ({label, value, onValueChange}) => {
  return (
    <View style={styles.container}>
      <Check disabled={false} value={value} onValueChange={onValueChange} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    color: '#1C2024',
    fontFamily: fonts.primary.normal,
  },
});
