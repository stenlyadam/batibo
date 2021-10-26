import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../utils';
import IconOnly from './IconOnly';
import Third from './Third';

const Button = ({
  title,
  type,
  onPress,
  icon,
  width,
  height,
  space,
  size,
  buttonColor,
  textColor,
  borderRadius,
  borderColor,
  borderWidth,
  marginTop,
  onSelected
}) => {
  if (type === 'icon-only') {
    return (
      <IconOnly icon={icon} onPress={onPress} width={width} height={height} />
    );
  }
  else if(type === 'Third'){
    return (
      <Third title={title} onSelected={onSelected} onPress={onPress}/>
    );
  }
  else{
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container(space, height, borderColor, borderWidth, borderRadius, marginTop, buttonColor)}>
          <Text style={styles.text(size, textColor)}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

};

export default Button;

const styles = StyleSheet.create({
  container: (space, height, borderColor, borderWidth, borderRadius, marginTop, buttonColor) => ({
    backgroundColor: buttonColor ? buttonColor : colors.button.primary.backgroundColor,
    width: space,
    paddingVertical: height ? height : 14,
    borderRadius: borderRadius,
    borderColor: borderColor ? borderColor : colors.button.primary.backgroundColor,
    borderWidth: borderWidth ? borderWidth : 0,
    marginTop: marginTop,
    maxWidth: '100%'
  }),
  text: (size, textColor) => ({
    color: textColor ? textColor : colors.button.primary.text,
    textAlign: 'center',
    fontSize: size,
    fontWeight: '700',
  }),
});
