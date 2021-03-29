import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {colors, fonts} from '../../utils';

const History = () => {
  return (
    <View style={styles.tabContainer}>
      <Text>History</Text>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 22,
  },
});
