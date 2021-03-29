import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../utils';
import IconOnly from './IconOnly';

const Button = ({
  title,
  type,
  onPress,
  icon,
  width,
  height,
  space,
  size,
  color,
}) => {
  if (type === 'icon-only') {
    return (
      <IconOnly icon={icon} onPress={onPress} width={width} height={height} />
    );
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container(space, height, color)}>
        <Text style={styles.text(size)}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (space, height, radius, color) => ({
    backgroundColor: color ? color : colors.button.primary.backgroundColor,
    width: space,
    paddingVertical: height ? height : 14,
    borderRadius: 10,
  }),
  text: (size) => ({
    color: colors.button.primary.text,
    textAlign: 'center',
    fontSize: size,
    fontWeight: '700',
  }),
});
