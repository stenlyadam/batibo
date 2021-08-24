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
  color,
  borderRadius,
  borderColor,
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
        <View style={styles.container(space, height, color, borderRadius, borderColor, marginTop)}>
          <Text style={styles.text(size, color)}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

};

export default Button;

const styles = StyleSheet.create({
  container: (space, height, color, borderRadius, marginTop) => ({
    backgroundColor: color === "secondary" ? colors.button.secondary.backgroundColor : colors.button.primary.backgroundColor,
    width: space,
    paddingVertical: height ? height : 14,
    borderRadius: borderRadius,
    borderColor: color === "secondary" ? colors.button.primary.backgroundColor: colors.button.primary.backgroundColor,
    borderWidth: color === 'secondary' ? 2 : 0,
    marginTop: marginTop
  }),
  text: (size, color) => ({
    color: color === "secondary" ? colors.button.secondary.text : colors.button.primary.text,
    textAlign: 'center',
    fontSize: size,
    fontWeight: '700',
  }),
});
