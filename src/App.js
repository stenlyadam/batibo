import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import {LogBox} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import store from './redux/store'
import {Provider, useSelector} from 'react-redux'
import { Loading } from './components';

const MainApp = () => {
  //destructuring isLoading
  const {isLoading} = useSelector ((state) => state.globalReducer)
  LogBox.ignoreLogs(['Setting a timer', 'Remote debugger']);
  return (
    <>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
        <FlashMessage position="top" />
        {isLoading && <Loading/>}
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
