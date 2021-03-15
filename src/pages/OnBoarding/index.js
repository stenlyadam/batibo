import React from 'react';
import {useEffect} from 'react';
import {Dimensions, Image, StyleSheet, View, Text} from 'react-native';
import {IMGOnBoarding1} from '../../assets';
import {colors} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';

const OnBoarding = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#D0F5B2', '#24AD65']}
        style={styles.linearGradient}>
        <View style={styles.lewatiContainer}>
          <TouchableOpacity>
            <Text style={styles.textLewati}>Lewati</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={IMGOnBoarding1} style={styles.image} />
        </View>
      </LinearGradient>
      <View style={styles.bottomContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Bantu Petani dan Permudah Belanja-mu</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Bantu petani dengan membeli langsung hasil panen dari mereka,
            sehingga kamu dapat belanja dengan mudah, petani bahagia.
          </Text>
        </View>
        <View style={styles.actionContainer}>
          <View style={styles.dotsContainer}>
            <View style={styles.longDots} />
            <View style={styles.dots} />
            <View style={styles.dots} />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Lanjut</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    height: 485,
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
    alignItems: 'center',
  },
  titleContainer: {
    width: 327,
    marginTop: 32,
  },
  title: {
    color: colors.text.primary,
    fontWeight: 'bold',
    fontSize: 24,
    letterSpacing: 1,
  },
  textContainer: {
    width: 327,
    marginTop: 16,
  },
  text: {
    fontSize: 13,
    letterSpacing: 1,
    color: colors.text.secondary,
  },
  actionContainer: {
    width: 327,
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dotsContainer: {
    flexDirection: 'row',
    width: 79,
    justifyContent: 'space-between',
  },
  longDots: {
    height: 12,
    width: 25,
    borderRadius: 12,
    backgroundColor: colors.button.primary.backgroundColor,
  },
  dots: {
    height: 12,
    width: 12,
    borderRadius: 12,
    backgroundColor: colors.grey,
  },
  buttonContainer: {
    backgroundColor: colors.button.primary.backgroundColor,
    borderRadius: 10,
  },
  button: {
    height: 50,
    width: 104,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.button.primary.text,
  },
});
