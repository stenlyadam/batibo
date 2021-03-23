import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  IconArrowBack,
  IconMinus,
  IconPlus,
  IconCart,
  IconDotsIcon,
} from '../../../assets';
import {colors} from '../../../utils';

const IconOnly = ({icon, onPress, width, height, color = colors.grey}) => {
  const Icon = () => {
    if (icon === 'icon-minus') {
      return (
        <View style={styles.iconContainer(width, height, colors.button.red)}>
          <IconMinus />
        </View>
      );
    }
    if (icon === 'icon-plus') {
      return (
        <View style={styles.iconContainer(width, height, colors.button.green)}>
          <IconPlus />
        </View>
      );
    }
    if (icon === 'icon-arrow-back') {
      return (
        <View style={styles.iconContainer(width, height, colors.button.black)}>
          <IconArrowBack />
        </View>
      );
    }
    if (icon === 'icon-cart') {
      return (
        <View style={styles.iconContainer(width, height, colors.button.black)}>
          <IconCart color={color} />
        </View>
      );
    }
    if (icon === 'icon-dots-option') {
      return (
        <View style={styles.iconContainer(width, height, colors.button.black)}>
          <IconDotsIcon />
        </View>
      );
    }
    return <IconArrowBack />;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
};

export default IconOnly;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: (width, height, color) => ({
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    width: width,
    height: height,
    backgroundColor: color,
  }),
});
