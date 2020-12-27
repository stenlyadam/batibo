import React from 'react';

import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../utils';

const Button = ({title, type, onPress, icon, width, height, space, size}) => {
  // if (type === 'icon-only') {
  //   return (
  //     <IconOnly icon={icon} onPress={onPress} width={width} height={height} />
  //   );
  // }
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container(space, height)}>
        <Text style={styles.text(size)}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (space, height) => ({
    backgroundColor: colors.button.primary.backgroundColor,
    paddingHorizontal: space,
    paddingVertical: height ? height : 14,
    borderRadius: 10,
  }),
  text: (size) => ({
    color: colors.button.primary.text,
    textAlign: 'center',
    fontSize: size,
    fontFamily: fonts.primary[600],
  }),
});
