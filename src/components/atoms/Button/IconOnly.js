import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  IconArrowBack,
  IconMinus,
  IconPlus,
  IconCart,
  IconCartGreen,
  IconDotsIcon,
  IconCross,
  IconArrowRight,
  IconCoupon,
  IconAddress,
  IconProtection,
  IconHelp,
  IconSettings,
  IconRemove,
  IconArrowBottom,
  IconAdd,
} from '../../../assets';
import {colors} from '../../../utils';

const IconOnly = ({icon, onPress, disabledButton, width, height, color = colors.grey}) => {
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
    if (icon === 'icon-cart-green') {
      return (
        <View style={styles.iconContainer(width, height, colors.button.black)}>
          <IconCartGreen color={color} />
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
    if (icon === 'icon-cross') {
      return (
        <View style={styles.iconContainer(width, height, colors.button.black)}>
          <IconCross />
        </View>
      );
    }
    if (icon === 'icon-add') {
      return (
        <View style={styles.iconContainer(width, height, colors.button.black)}>
          <IconAdd />
        </View>
      );
    }
    if (icon === 'icon-arrow-right') {
      return (
        <View style={styles.iconContainer(width, height, colors.button.black)}>
          <IconArrowRight />
        </View>
      );
    }
    if (icon === 'icon-coupon') {
      return (
        <View style={styles.iconContainer(width, height, colors.button.black)}>
          <IconCoupon />
        </View>
      );
    }
    if (icon === 'icon-address') {
      return (
        <View style={styles.iconContainer(width, height, colors.button.black)}>
          <IconAddress />
        </View>
      );
    }
    if (icon === 'icon-protection') {
      return (
        <View style={styles.iconContainer(width, height, colors.button.black)}>
          <IconProtection />
        </View>
      );
    }
    if (icon === 'icon-help') {
      return (
        <View style={styles.iconContainer(width, height, colors.button.black)}>
          <IconHelp />
        </View>
      );
    }
    if (icon === 'icon-settings') {
      return (
        <View style={styles.iconContainer(width, height, colors.button.black)}>
          <IconSettings />
        </View>
      );
    }
    if (icon === 'icon-remove') {
      return (
        <View style={styles.iconContainer(width, height, colors.button.black)}>
          <IconRemove />
        </View>
      );
    }
    if (icon === 'icon-arrow-bottom') {
      return (
        <View style={styles.iconContainer(width, height, colors.button.black)}>
          <IconArrowBottom />
        </View>
      );
    }
    return <IconArrowBack />;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={disabledButton}>
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
