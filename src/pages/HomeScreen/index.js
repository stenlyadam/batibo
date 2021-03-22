import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {DummyBrokoliHijau} from '../../assets';
import {Gap, Product, SearchBox, Carousel} from '../../components';
import {colors, fonts} from '../../utils';
// import Swiper from 'react-native-swiper';

// const Carousel = () => {
//   return (
//     <Swiper
//       style={styles.carouselWrapper}
//       height={132}
//       containerStyle={{marginTop: 32}}
//       dotStyle={{backgroundColor: colors.white, opacity: 0.5}}
//       activeDotStyle={{backgroundColor: colors.white}}>
//       <View style={styles.slide1}>
//         <Image source={IMGCarousel} style={styles.carouselPicture} />
//       </View>
//       <View style={styles.slide1}>
//         <Image source={IMGCarousel} style={styles.carouselPicture} />
//       </View>
//       <View style={styles.slide1}>
//         <Image source={IMGCarousel} style={styles.carouselPicture} />
//       </View>
//     </Swiper>
//   );
// };

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Halo John Doe</Text>
        <Text style={styles.welcomeText}>Pilih Sayuran-mu disini</Text>
        <Gap height={16} />
        <SearchBox label="Cari yang kamu butuhkan" />
        <Carousel />
      </View>
      <Text style={styles.titleText}>Sedang Diskon</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.productContainer}>
          <Product
            name="Brokoli Hijau"
            image={DummyBrokoliHijau}
            category="Sayuran"
            originalPrice="20.000"
            sellPrice="10.000"
            productUnit="gr"
            discount="50%"
            onBuy={() => navigation.navigate('Cart')}
          />
          <Product
            name="Brokoli Hijau"
            image={DummyBrokoliHijau}
            category="Sayuran"
            originalPrice="20.000"
            sellPrice="10.000"
            productUnit="gr"
            discount="50%"
          />
          <Product
            name="Brokoli Hijau"
            image={DummyBrokoliHijau}
            category="Sayuran"
            originalPrice="20.000"
            sellPrice="10.000"
            productUnit="gr"
            discount="50%"
          />
          <Product
            name="Brokoli Hijau"
            image={DummyBrokoliHijau}
            category="Sayuran"
            originalPrice="20.000"
            sellPrice="10.000"
            productUnit="gr"
            discount="50%"
          />
          <Product
            name="Brokoli Hijau"
            image={DummyBrokoliHijau}
            category="Sayuran"
            originalPrice="20.000"
            sellPrice="10.000"
            productUnit="gr"
            discount="50%"
          />
          <Product
            name="Brokoli Hijau"
            image={DummyBrokoliHijau}
            category="Sayuran"
            originalPrice="20.000"
            sellPrice="10.000"
            productUnit="gr"
            discount="50%"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    width: '100%',
    height: 375,
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingTop: 33,
  },
  welcomeText: {
    fontSize: 14,
    fontFamily: fonts.primary[700],
    color: colors.white,
  },
  titleText: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
    marginTop: 12,
    marginLeft: 24,
  },
  productContainer: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
