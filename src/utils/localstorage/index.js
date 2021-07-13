import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
  console.log('async store success: ' + JSON.stringify(value));
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    console.log('getData: '+ value);
  } catch (e) {
    // error reading value
    console.log('error reading: ', e)
  }
  
};