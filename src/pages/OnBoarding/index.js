import React, {useRef} from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import {IMGOnBoarding1, IMGOnBoarding2, IMGOnBoarding3} from '../../assets';
import {colors, fonts} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import {Button} from '../../components';
import {NavigationContainer} from '@react-navigation/native';

const OnBoarding = ({navigation}) => {
  const swiper = React.useRef(null);
  const handleNext = () => {
    if (swiper && swiper.current) {
      swiper.current.scrollBy(1);
    }
  };
  return (
    <Swiper
      ref={swiper}
      loop={false}
      paginationStyle={{
        marginLeft: 24,
        marginBottom: 20,
        width: 80,
        justifyContent: 'space-between',
      }}
      dotStyle={{
        width: 12,
        height: 12,
        backgroundColor: colors.grey,
        borderRadius: 15,
      }}
      activeDotStyle={{
        width: 25,
        height: 12,
        backgroundColor: colors.button.primary.backgroundColor,
        borderRadius: 15,
      }}>
      <View style={styles.slide}>
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
          <Text style={styles.title}>Bantu Petani dan Permudah Belanja-mu</Text>
          <Text style={styles.text}>
            Bantu petani dengan membeli langsung hasil panen dari mereka,
            sehingga kamu dapat belanja dengan mudah, petani bahagia.
          </Text>
          <View style={styles.buttonContainer}>
            <Button title="Lanjut" space={110} onPress={() => handleNext()} />
          </View>
        </View>
      </View>

      <View style={styles.slide}>
        <LinearGradient
          colors={['#D0F5B2', '#24AD65']}
          style={styles.linearGradient}>
          <View style={styles.lewatiContainer}>
            <TouchableOpacity>
              <Text style={styles.textLewati}>Lewati</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image source={IMGOnBoarding2} style={styles.image} />
          </View>
        </LinearGradient>
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>Pilih Sayuran Sesuai Kebutuhan-mu!</Text>
          <Text style={styles.text}>
            Cukup lewat HP kamu bisa memilih sayuran dan kebutuhan dapur
            lainnya, jumlahnya bisa kamu sesuaikan dengan keterangan harga yang
            tersedia juga.
          </Text>
          <View style={styles.buttonContainer}>
            <Button title="Lanjut" space={110} onPress={() => handleNext()} />
          </View>
        </View>
      </View>

      <View style={styles.slide}>
        <LinearGradient
          colors={['#D0F5B2', '#24AD65']}
          style={styles.linearGradient}>
          <View style={styles.lewatiContainer}>
            <TouchableOpacity>
              <Text style={styles.textLewati}></Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image source={IMGOnBoarding3} style={styles.image} />
          </View>
        </LinearGradient>
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>
            Pesan Sayuran Mudah hanya #dirumahaja
          </Text>
          <Text style={styles.text}>
            Tidak perlu repot untuk berbelanja kebutuhan dapur kamu, hanya
            dengan dirumah aja kamu sudah bisa membeli sayur dan lainnya.
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Selesai"
              space={110}
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </View>
      </View>
    </Swiper>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: colors.white,
  },
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
    bottom: 30,
  },
});
