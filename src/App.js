import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import {LogBox} from 'react-native';

const App = () => {
  LogBox.ignoreLogs(['Setting a timer']);
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;
