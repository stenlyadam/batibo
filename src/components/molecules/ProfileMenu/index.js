import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '../../../components';
import {colors, fonts} from '../../../utils';
import {IconArrowRight} from '../../../assets';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ProfileMenu = ({title, icon, onClick}) => {
  return (
    <View style={styles.voucherContainer}>
      <TouchableOpacity style={styles.voucherButtonContainer} onPress={onClick}>
        <Button type="icon-only" icon={icon} />
        <Text style={styles.profileMenuTitleText}>{title}</Text>
        <View style={styles.arrowRightContainer}>
          <IconArrowRight />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileMenu;

const styles = StyleSheet.create({
  voucherContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    height: 52,
    marginBottom: 24,
  },
  voucherButtonContainer: {
    flexDirection: 'row',
    height: 27,
    alignItems: 'center',
  },
  arrowRightContainer: {
    flex: 1,
    height: 24,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  profileMenuTitleText: {
    fontFamily: fonts.nunito.normal,
    fontSize: 16,
    opacity: 0.7,
    marginLeft: 18,
  },
});
