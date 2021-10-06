import React from 'react';
import {StyleSheet, Text, View, TextInput as Input} from 'react-native';
import {colors, fonts} from '../../../utils';

const TextInput = (props) => {
  const {label, placeholder, value, onChangeText, secureTextEntry, disable, keyboardType, isRequired, ...rest} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Input
        require={require}
        keyboardType={keyboardType}
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={!disable}
        {...rest}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  label: {
    color: colors.text.primary,
    fontSize: 14,
    fontFamily: fonts.primary[700],
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  container: {width: '100%'},
});
