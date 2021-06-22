import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '../../atoms';

const Counter = ({onChange}) => {
  const [count, setCount] = useState(0);
  const onPressMinus = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };
  const onPressPlus = () => setCount((prevCount) => prevCount + 1);

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
