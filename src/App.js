import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import {LogBox} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import store from './redux/store'
import {Provider} from 'react-redux'

const App = () => {
  LogBox.ignoreLogs(['Setting a timer']);
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
        <FlashMessage position="top" />
      </Provider>
    </>
  );
};

export default App;
