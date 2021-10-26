import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils';
import Swiper from 'react-native-swiper';
import {IMGCarousel} from '../../../assets';

const Carousel = () => {
  return (
    <Swiper
      style={styles.carouselWrapper}
      // showsPagination={false}
      dotStyle={{
        backgroundColor: colors.button.green,
        opacity: 0.5,
      }}
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
  slide1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '98%',
  },
  carouselPicture: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 132,
    width: '100%',
    borderRadius: 8,
    maxWidth:'100%'
  },
});
