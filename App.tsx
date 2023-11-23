import React, {useEffect} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import SplashScreen from 'react-native-splash-screen';
import {MainNavigation} from './src/screens';
import Toast from 'react-native-toast-message';

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <MainNavigation />
      <Toast />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
