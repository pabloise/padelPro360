import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  View,
  Image,
  Platform,
} from 'react-native';
import Login from './src/screens/Login';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import SplashScreen from 'react-native-splash-screen';
import {MainNavigation} from './src/screens';

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
