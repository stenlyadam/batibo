import Check from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils';

const CheckBox = ({label, value, onValueChange, text}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <View style={styles.container}>
      <Check
        tintColors={{
          true: colors.button.green,
          false: colors.button.green,
        }}
        disabled={false}
        value={toggleCheckBox}
        onValueChange={(newValue) => setToggleCheckBox(newValue)}
      />
      <Text style={styles.label(text)}>{label}</Text>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: (text) => ({
    fontSize: text ? text : 13,
    color: colors.text.primary,
  }),
});
