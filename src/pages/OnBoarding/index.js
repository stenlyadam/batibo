import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IMGOnBoarding1, IMGOnBoarding2, IMGOnBoarding3} from '../../assets';
import {colors, storeData} from '../../utils';
import Swiper from 'react-native-swiper';
import Page from './Page';

const OnBoarding = ({navigation}) => {
  const swiper = React.useRef(null);
  const [disableButton, setdisableButton] = useState(false);
  
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const handleNext = () => {
    setdisableButton(true);
    if (swiper && swiper.current) {
      swiper.current.scrollBy(1);
    }
    wait(500).then(() => setdisableButton(false));
  };

  const toLoginPage = () => {
    setdisableButton(true);
    //simpan data oldApp ke localstorage
    storeData('oldApp', {value: true});
    //berpindah ke halaman Login
    navigation.replace('Login');
    wait(1000).then(() => setdisableButton(false));
  }

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
        <Page
          title="Bantu Petani dan Permudah Belanja-mu"
          text="Bantu petani dengan membeli langsung hasil panen dari mereka, sehingga
          kamu dapat belanja dengan mudah, petani bahagia."
          image={IMGOnBoarding1}
          press={handleNext}
          lewati={toLoginPage}
          disabledButton={disableButton}
        />
      </View>

      <View style={styles.slide}>
        <Page
          title="Pilih Sayuran Sesuai Kebutuhan-mu!"
          text="Cukup lewat HP kamu bisa memilih sayuran dan kebutuhan dapur
          lainnya, jumlahnya bisa kamu sesuaikan dengan keterangan harga yang
          tersedia juga."
          image={IMGOnBoarding2}
          press={handleNext}
          lewati={toLoginPage}
          disabledButton={disableButton}
        />
      </View>

      <View style={styles.slide}>
        <Page
          title="Pesan Sayuran Mudah hanya #dirumahaja"
          text="Tidak perlu repot untuk berbelanja kebutuhan dapur kamu, hanya
          dengan dirumah aja kamu sudah bisa membeli sayur dan lainnya."
          image={IMGOnBoarding3}
          topButton=""
          bottomButton="Selesai"
          press={toLoginPage}
          disabledButton={disableButton}
        />
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
});
