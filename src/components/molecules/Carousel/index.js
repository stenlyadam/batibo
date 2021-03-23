import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils';
import Swiper from 'react-native-swiper';
import {IMGCarousel} from '../../../assets';

const Carousel = () => {
  return (
    <Swiper
      style={styles.carouselWrapper}
      height={132}
      dotStyle={{backgroundColor: colors.white, opacity: 0.5}}
      activeDotStyle={{backgroundColor: colors.white}}>
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
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselPicture: {
    height: 132,
    width: 360,
    borderRadius: 8,
  },
});
