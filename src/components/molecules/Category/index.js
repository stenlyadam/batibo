import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IMGLainnya, IMGBuah, IMGRempah, IMGSayuran} from '../../../assets';
import {colors, fonts} from '../../../utils';

const Category = ({title}) => {
  if (title === 'sayuran') {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image source={IMGSayuran} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.text}>Sayuran</Text>
      </View>
    );
  }
  if (title === 'buah') {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image source={IMGBuah} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.text}>Buah</Text>
      </View>
    );
  }
  if (title === 'rempah') {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image source={IMGRempah} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.text}>Rempah</Text>
      </View>
    );
  }
  if (title === 'lainnya') {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image source={IMGLainnya} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.text}>Lainnya</Text>
      </View>
    );
  }
};

export default Category;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    width: 70,
    height: 70,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
  },
  text: {
    fontFamily: fonts.nunito.semibold,
    fontSize: 12,
    color: colors.button.green,
    marginTop: 8,
  },
});
