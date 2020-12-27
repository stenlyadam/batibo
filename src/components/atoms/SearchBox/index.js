import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {IconSearch} from '../../../assets';
import {colors} from '../../../utils';

const SearchBox = ({label}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.text}
        placeholder={label}
        placeholderTextColor={styles.text.color}
      />
      <IconSearch />
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: 'rgba(211,211,211,0.35)',
    width: '100%',
  },
  text: {
    color: colors.white,
  },
});
