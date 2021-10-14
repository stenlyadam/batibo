import React, { useEffect, useState } from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import {IconSearch} from '../../../assets';
import {colors} from '../../../utils';
import {useDispatch , useSelector} from 'react-redux';
import {getProductDataSearch } from '../../../redux/action';

const SearchBox = ({label, navigation}) => {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState();
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.text}
        placeholder={label}
        placeholderTextColor={styles.text.color}
        onChangeText={e => setSearchValue(e)}
        onSubmitEditing={() => dispatch(getProductDataSearch(searchValue, navigation))}
      />
      <TouchableOpacity onPress={() => dispatch(getProductDataSearch(searchValue, navigation))}>
        <IconSearch />
      </TouchableOpacity>
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
