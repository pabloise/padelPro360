import auth from '@react-native-firebase/auth';
import {
  resetUser,
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
import {resetClub, setClubGoogleMapsLink} from '../redux/modules/clubSlice';

interface FirebaseAuthError extends Error {
  code?: string;
}

export const RegisterWithEmail = async (
  dispatch: Dispatch<AnyAction>,
  navigation: NavigationProps,
  userEmail: string,
  userPassword: string,
  userName: string,
  userType: 'normal' | 'owner',
  onError?: () => void,
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
        Toast.show({
          type: 'success',
          text1: 'Success! ✅',
          text2: 'You have been registered! 🎾',
        });
        navigation.navigate('Home');
      });
  } catch (error) {
    const firebaseError = error as FirebaseAuthError;
    let errorMsg;
    if (firebaseError.code === 'auth/invalid-email') {
      errorMsg = 'The email address is badly formatted.';
    } else if (firebaseError.code === 'auth/email-already-in-use') {
      errorMsg = 'The email address is already in use.';
    } else if (firebaseError.code === 'auth/weak-password') {
      errorMsg = 'The password is too weak.';
    } else {
      errorMsg = 'An unexpected error occurred. Please try again.';
    }
    Toast.show({
      type: 'error',
      text1: 'Something went wrong! 😥',
      text2: errorMsg,
    });
    dispatch(resetUser());
    dispatch(resetClub());
    typeof onError === 'function' && onError();
    userType === 'normal'
      ? navigation.navigate('Login')
      : navigation.navigate('OwnerRegister');
  } finally {
    dispatch(setIsLoading(false));
  }
};
