import React, {useEffect, useState} from 'react';
import {Button, Image, Text, TextInput, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {
  resetUser,
  setInitializing,
  setUser,
  setUserEmail,
  setUserName,
  setUserPassword,
} from '../../redux/modules/userSlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {RootState} from '../../redux/store';
import {UserType} from '../../types/user';

const Login = () => {
  const {initializing, user, userEmail, userPassword, userName} = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useDispatch();

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
      return userCredential;
    } catch (error) {
      console.log('erorrroroorororor', error);
    }
  };

  const RegisterWithEmail = () => {
    auth()
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(userCredential => {
        const userData: UserType = {
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
          emailVerified: userCredential.user.emailVerified,
          uid: userCredential.user.uid,
          photoURL: userCredential.user.uid,
        };
        dispatch(setUser(userData));
        console.log('User account created and signed in!!!!', userEmail);
        dispatch(setUserEmail(''));
        dispatch(setUserPassword(''));
        dispatch(setInitializing(false));
      })
      .catch(error => {
        console.log('An error has ocurred!', error);
      });
  };

  const handleEmailChange = (email: string) => {
    dispatch(setUserEmail(email));
  };

  const handlePasswordChange = (password: string) => {
    dispatch(setUserPassword(password));
  };

  const handleNameChange = (name: string) => {
    dispatch(setUserName(name));
  };

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => dispatch(resetUser()));
  };

  if (initializing) return null;

  return (
    <View>
      {!user ? (
        <View>
          <Text>Login with your email</Text>
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
          <Button title="Register" onPress={RegisterWithEmail} />
          <Text>If you want, you can also use</Text>
          <Button title="Google" onPress={onGoogleButtonPress} />
        </View>
      ) : (
        <View>
          <Text>Welcome, {user.displayName || userName}</Text>
          {user.photoURL && (
            <Image
              source={{uri: user.photoURL ?? undefined}}
              style={{width: 30, height: 30}}
            />
          )}

          <Button title="logout" onPress={handleSignOut} />
        </View>
      )}
    </View>
  );
};

export default Login;
