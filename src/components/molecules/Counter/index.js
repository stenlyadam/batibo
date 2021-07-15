import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '../../atoms';
import {useDispatch} from 'react-redux';

const Counter = ({itemCount, itemId}) => {
  let item = {itemCount, itemId}
  dispatch = useDispatch();
  const [count, setCount] = useState(itemCount);
  const onPressMinus = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1)
      dispatch({type: 'UPDATE_COUNT_DECREMENT', value:item})
    } else {
      dispatch({type: 'DELETE_CART', value:item})
    }
  };
  const onPressPlus = () => {
    setCount((prevCount) => prevCount + 1)
    dispatch({type: 'UPDATE_COUNT_INCREMENT', value:item})
  };

  return (
    <View style={styles.container}>
      <Button
        type="icon-only"
        icon="icon-minus"
        width={24}
        height={24}
        onPress={onPressMinus}
        borderRadius={4}
      />
      <Text style={styles.number}>{count}</Text>
      <Button
        type="icon-only"
        icon="icon-plus"
        width={24}
        height={24}
        onPress={onPressPlus}
        borderRadius={4}
      />
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 18,
  },
  number: {
    paddingHorizontal: 16,
  },
});
