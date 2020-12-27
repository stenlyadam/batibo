import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {IconCartWhite, IconMinus, IconPlus} from '../../../assets';

const IconOnly = ({icon, onPress, width, height}) => {
  const Icon = () => {
    if (icon === 'icon-minus') {
      return <IconMinus />;
    }
    if (icon === 'icon-plus') {
      return <IconPlus />;
    }
    if (icon === 'cart') {
      return <IconCartWhite />;
    }
    return <IconMinus />;
  };

  return (
    <TouchableOpacity
      style={styles.container(icon, width, height)}
      onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
};

export default IconOnly;

const styles = StyleSheet.create({
  container: (icon, width, height) => ({
    backgroundColor: icon === 'icon-minus' ? '#FF3C21' : '#24AD65',
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  }),
});
