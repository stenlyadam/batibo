import React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import {colors, fonts} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from '../../components';

const Page = ({
  title,
  text,
  image,
  topButton = 'Lewati',
  bottomButton = 'Lanjut',
  navigation,
  press,
  lewati,
}) => {
  return (
    <View>
      <LinearGradient
        colors={['#D0F5B2', '#24AD65']}
        style={styles.linearGradient}>
        <View style={styles.lewatiContainer}>
          <TouchableOpacity onPress={lewati}>
            <Text style={styles.textLewati}>{topButton}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={image} />
        </View>
      </LinearGradient>
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.buttonContainer}>
          <Button marginTop={10} title={bottomButton} space={110} onPress={press} borderRadius={10}/>
        </View>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  linearGradient: {
    height: 400,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lewatiContainer: {
    alignItems: 'flex-end',
    marginRight: 28,
    marginTop: 24,
  },
  textLewati: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 23,
    paddingVertical: 32,
  },
  title: {
    fontFamily: fonts.nunito.bold,
    fontSize: 30,
    color: colors.text.primary,
  },
  text: {
    fontFamily: fonts.nunito.normal,
    fontSize: 15,
    color: colors.text.grey,
    marginTop: 16,
  },
  buttonContainer: {
    position: 'absolute',
    right: 24,
    top: 255,
  },
});
