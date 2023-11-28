import React, {useEffect} from 'react';
import {Button, SafeAreaView, Text, TextInput, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {
  setInitializing,
  setIsLoading,
  setUser,
  setUserEmail,
  setUserPassword,
} from '../../redux/modules/userSlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {RootState} from '../../redux/store';
import {UserType} from '../../types/user';
import useAuthForm from '../../hooks/useAuthForm';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../types/navigation';
import Toast from 'react-native-toast-message';
import BookingsItem from '../../components/BookingsItem';
import Config from 'react-native-config';

const Login = () => {
  const {initializing, userEmail, userPassword, user} = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useDispatch();
  const {handleEmailChange, handlePasswordChange} = useAuthForm();
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Home');
        const userData: UserType = {
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          uid: user.uid,
          photoURL: user.photoURL,
        };
        dispatch(setUser(userData));
      } else {
        dispatch(setUser(null));
      }
      console.log('this is the user', user);
      if (initializing) {
        dispatch(setInitializing(false));
      }
    });
    return subscriber;
  }, [dispatch, initializing]);

  const onGoogleButtonPress = async () => {
    dispatch(setIsLoading(true));
    navigation.navigate('Home');
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      return userCredential;
    } catch (error) {
      console.log('Google error', error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const SignInWithEmail = async () => {
    dispatch(setIsLoading(true));
    navigation.navigate('Home');
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        userEmail,
        userPassword,
      );
      console.log('user logged in', userCredential);
    } catch (error) {
      console.log('SignInWithEmail Error: ', error);
      Toast.show({
        type: 'error',
        text1: 'Something is wrong',
        text2: `Your email or password is incorrect. Try again! 😉`,
      });
      dispatch(setUserEmail(''));
      dispatch(setUserPassword(''));
      navigation.navigate('Login');
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  if (initializing) return null;

  return (
    <SafeAreaView>
      <View>
        <Text>Login with your email</Text>
        <TextInput
          placeholder="Enter your email"
          value={userEmail}
          onChangeText={handleEmailChange}
        />
        <TextInput
          placeholder="Enter your password"
          value={userPassword}
          onChangeText={handlePasswordChange}
        />
        <Button title="sign in" onPress={SignInWithEmail} />
        <Text>If you want, you can also use</Text>
        <Button title="Google" onPress={onGoogleButtonPress} />
        <Text>Don't have an account?</Text>
        <Button
          title="Register now"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
      <BookingsItem />
    </SafeAreaView>
  );
};

export default Login;
