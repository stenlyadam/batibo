import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {colors} from '../../../utils';
import Swiper from 'react-native-swiper';
import {IMGCarousel} from '../../../assets';

const Carousel = () => {
  return (
    <Swiper
      style={styles.carouselWrapper}
      dotStyle={styles.dotStyle}
      activeDotStyle={{backgroundColor: colors.button.green}}>
      <View style={styles.slide1}>
        <Image source={IMGCarousel} style={styles.carouselPicture} />
      </View>
      <View style={styles.slide1}>
        <Image source={IMGCarousel} style={styles.carouselPicture} />
      </View>
      <View style={styles.slide1}>
        <Image source={IMGCarousel} style={styles.carouselPicture} />
      </View>
    </Swiper>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselWrapper: {},
  slide1: {
    paddingTop: 22,
    flex: 1,
    alignItems: 'center',
  },
  carouselPicture: {
    height: 132,
    width: 360,
    borderRadius: 8,
  },
  dotStyle: {
    backgroundColor: colors.button.green,
    opacity: 0.5,
  },
});
