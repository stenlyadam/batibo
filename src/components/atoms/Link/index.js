import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Link = ({label, color = '#1C2024', onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.label(color)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Link;

const styles = StyleSheet.create({
  label: (color) => ({
    color: color,
    fontSize: 13,
  }),
});
