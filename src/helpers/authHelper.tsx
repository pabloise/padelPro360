import auth from '@react-native-firebase/auth';
import {
  setClubAddress,
  setClubGoogleMapsLink,
  setClubName,
  setInitializing,
  setIsLoading,
  setUser,
  setUserEmail,
  setUserName,
  setUserPassword,
  setUserType,
} from '../redux/modules/userSlice';
import {NavigationProps} from '../types/navigation';
import {UserType} from '../types/user';
import Toast from 'react-native-toast-message';
import {Dispatch} from 'redux';
import {AnyAction} from '@reduxjs/toolkit';

export const RegisterWithEmail = async (
  dispatch: Dispatch<AnyAction>,
  navigation: NavigationProps,
  userEmail: string,
  userPassword: string,
  userName: string,
  userType: 'normal' | 'owner',
) => {
  dispatch(setIsLoading(true));
  navigation.navigate('Home');

  try {
    await auth()
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(userCredential => {
        userCredential.user.updateProfile({
          displayName: userName,
        });
        const userData: UserType = {
          displayName: userName,
          email: userCredential.user.email,
          emailVerified: userCredential.user.emailVerified,
          uid: userCredential.user.uid,
          photoURL: userCredential.user.photoURL,
        };
        dispatch(setUserType(userType));
        dispatch(setUser(userData));
        dispatch(setUserPassword(''));
        dispatch(setUserName(''));
        dispatch(setClubGoogleMapsLink(''));
        dispatch(setInitializing(false));
      });
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Ups! Email already in use',
      text2: `It seems you already have an account. Try signing in 😉`,
    });
    dispatch(setUserEmail(''));
    dispatch(setUserPassword(''));
    dispatch(setUserName(''));
    navigation.navigate('Login');
  } finally {
    dispatch(setIsLoading(false));
  }
};
