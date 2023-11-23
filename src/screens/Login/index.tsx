import React, {useEffect} from 'react';
import {Button, SafeAreaView, Text, TextInput, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {
  setInitializing,
  setIsLoading,
  setUser,
} from '../../redux/modules/userSlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {RootState} from '../../redux/store';
import {UserType} from '../../types/user';
import useAuthForm from '../../hooks/useAuthForm';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../types/navigation';
import Toast from 'react-native-toast-message';

const Login = () => {
  const {initializing, userEmail, userPassword} = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useDispatch();
  const {handleEmailChange, handlePasswordChange} = useAuthForm();
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '691358675671-2jrmk7lk6v6tdjdmfk01t3djajuhqd80.apps.googleusercontent.com',
    });
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
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
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = auth().signInWithCredential(googleCredential);
      navigation.navigate('Home');
      return userCredential;
    } catch (error) {
      console.log('erorrroroorororor', error);
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
      console.log('errorcito', error);
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: `It seems you don't have an account. Press Register 😉`,
      });
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
    </SafeAreaView>
  );
};

export default Login;
