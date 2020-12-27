import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '../../atoms';

const Counter = ({onChange}) => {
  return (
    <View style={styles.container}>
      <Button type="icon-only" icon="icon-minus" width={24} height={24} />
      <Text style={styles.number}>2</Text>
      <Button type="icon-only" icon="icon-plus" width={24} height={24} />
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
