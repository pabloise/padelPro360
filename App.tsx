import {StyleSheet, Text, SafeAreaView, Button} from 'react-native';
import React, {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '691358675671-2jrmk7lk6v6tdjdmfk01t3djajuhqd80.apps.googleusercontent.com',
    });
  }, []);

  const onGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <SafeAreaView>
      <Text>App</Text>
      <Button title="Google" onPress={onGoogleButtonPress} />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
