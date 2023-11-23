import React from 'react';
import auth from '@react-native-firebase/auth';
import {UserType} from '../../types/user';
import {
  setUser,
  setUserEmail,
  setUserPassword,
  setUserName,
  setInitializing,
} from '../../redux/modules/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {Button, SafeAreaView, TextInput, View} from 'react-native';
import {RootState} from '../../redux/store';
import useAuthForm from '../../hooks/useAuthForm';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../types/navigation';

const Register = () => {
  const dispatch = useDispatch();
  const {userName, userEmail, userPassword} = useSelector(
    (state: RootState) => state.user,
  );
  const {handleEmailChange, handlePasswordChange, handleNameChange} =
    useAuthForm();
  const navigation = useNavigation<NavigationProps>();

  const RegisterWithEmail = (
    userName: string,
    userEmail: string,
    userPassword: string,
  ) => {
    auth()
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
          photoURL: userCredential.user.uid,
        };
        dispatch(setUser(userData));
        console.log('User account created and signed in!!!!', userEmail);
        dispatch(setUserEmail(''));
        dispatch(setUserPassword(''));
        dispatch(setUserName(''));
        dispatch(setInitializing(false));
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log('An error has ocurred!', error);
      });
  };

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Enter your name"
        value={userName}
        onChangeText={handleNameChange}
      />
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
      <Button
        title="Register!"
        onPress={() => {
          RegisterWithEmail(userName, userEmail, userPassword);
        }}
      />
      <Button
        title="Take me home"
        onPress={() => navigation.navigate('Login')}
      />
    </SafeAreaView>
  );
};

export default Register;
