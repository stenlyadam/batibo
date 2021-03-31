import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {DummyBrokoliHijau} from '../../assets';
import {Gap, Product, SearchBox, Carousel} from '../../components';
import Category from '../../components/molecules/Category';
import {colors, fonts} from '../../utils';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Halo John Doe</Text>
        <Text style={styles.welcomeText}>Pilih Sayuran-mu disini</Text>
        <Gap height={5} />
        <SearchBox label="Cari yang kamu butuhkan" />
        <Carousel />
      </View>
      <View style={styles.categoryContainer}>
        <Category title="sayuran" />
        <Category title="buah" />
        <Category title="rempah" />
        <Category title="lainnya" />
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
            onDetail={() => navigation.navigate('Detail')}
          />
          <Product
            name="Brokoli Hijau"
            image={DummyBrokoliHijau}
            category="Sayuran"
            originalPrice="20.000"
            sellPrice="10.000"
            productUnit="gr"
            discount="50%"
            onBuy={() => navigation.navigate('Cart')}
            onDetail={() => navigation.navigate('Detail')}
          />
          <Product
            name="Brokoli Hijau"
            image={DummyBrokoliHijau}
            category="Sayuran"
            originalPrice="20.000"
            sellPrice="10.000"
            productUnit="gr"
            discount="50%"
            onBuy={() => navigation.navigate('Cart')}
            onDetail={() => navigation.navigate('Detail')}
          />
          <Product
            name="Brokoli Hijau"
            image={DummyBrokoliHijau}
            category="Sayuran"
            originalPrice="20.000"
            sellPrice="10.000"
            productUnit="gr"
            discount="50%"
            onBuy={() => navigation.navigate('Cart')}
            onDetail={() => navigation.navigate('Detail')}
          />
          <Product
            name="Brokoli Hijau"
            image={DummyBrokoliHijau}
            category="Sayuran"
            originalPrice="20.000"
            sellPrice="10.000"
            productUnit="gr"
            discount="50%"
            onBuy={() => navigation.navigate('Cart')}
            onDetail={() => navigation.navigate('Detail')}
          />
          <Product
            name="Brokoli Hijau"
            image={DummyBrokoliHijau}
            category="Sayuran"
            originalPrice="20.000"
            sellPrice="10.000"
            productUnit="gr"
            discount="50%"
            onBuy={() => navigation.navigate('Cart')}
            onDetail={() => navigation.navigate('Detail')}
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
    height: 305,
    backgroundColor: colors.button.green,
    paddingHorizontal: 24,
    paddingTop: 25,
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
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 20,
  },
});
