import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import {LogBox} from 'react-native';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  LogBox.ignoreLogs(['Setting a timer']);
  return (
    <>
    <NavigationContainer>
      <Router />
    </NavigationContainer>
    <FlashMessage position="top" />
    </>
  );
};

export default App;
