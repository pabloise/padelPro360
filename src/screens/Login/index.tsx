import React, {useEffect, useState} from 'react';
import {Button, Image, Text, View} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {resetUser, setUser} from '../../redux/modules/userSlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Login = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const dispatch = useDispatch();

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    console.log('user', user);
    if (initializing) {
      setInitializing(false);
    }
  };

  const onGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = auth().signInWithCredential(googleCredential);
    return userCredential;
  };

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => dispatch(resetUser()));
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <View>
      {!user ? (
        <View>
          <Text>Login</Text>
          <Button title="Google" onPress={onGoogleButtonPress} />
        </View>
      ) : (
        <View>
          <Text>Welcome, {user.displayName}</Text>
          <Image
            source={{uri: user.photoURL ?? undefined}}
            style={{width: 30, height: 30}}
          />
          <Button title="logout" onPress={handleSignOut} />
        </View>
      )}
    </View>
  );
};

export default Login;
