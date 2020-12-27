import React from 'react';
import {StyleSheet, Text, View, TextInput as Input} from 'react-native';
import {fonts} from '../../../utils';

const TextInput = (props) => {
  const {label, placeholder, ...rest} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Input placeholder={placeholder} style={styles.input} {...rest} />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  label: {
    color: '#303030',
    fontSize: 14,
    fontFamily: fonts.primary[700],
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D6CDCD',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  container: {width: '100%'},
});
