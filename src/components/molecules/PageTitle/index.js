import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconArrowBack} from '../../../assets';
import {fonts} from '../../../utils';
import {Button} from '../../atoms';

const PageTitle = ({title, backButton, onBack}) => {
  return (
    <View style={styles.container}>
      {backButton && (
        <Button type="icon-only" icon={IconArrowBack} onPress={onBack} borderRadius={4}/>
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </View>
  );
};

export default PageTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 12,
    marginHorizontal: 24,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: fonts.primary[600],
    fontSize: 22,
  },
});
