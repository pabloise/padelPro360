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
import firestore from '@react-native-firebase/firestore';
import {setCurrentClub} from '../../redux/modules/clubSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const {initializing, userEmail, userPassword, userType} = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useDispatch();
  const {handleEmailChange, handlePasswordChange} = useAuthForm();
  const {navigate} = useNavigation<NavigationProps>();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async user => {
      if (user) {
        const savedUserType = await AsyncStorage.getItem('userType');
        const finalUserType = savedUserType || 'normal';

        const clubData = await fetchClubData(user.uid);
        clubData && dispatch(setCurrentClub(clubData));

        const userData: UserType = {
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          uid: user.uid,
          photoURL: user.photoURL,
        };
        dispatch(setUser(userData));
        finalUserType === 'owner' ? navigate('OwnerHome') : navigate('Home');
      } else {
        dispatch(setUser(null));
        navigate('Login');
      }
      console.log('this is the user', user);
      if (initializing) {
        dispatch(setInitializing(false));
      }
    });
    return subscriber;
  }, [dispatch, initializing, navigate]);

  const onGoogleButtonPress = async () => {
    dispatch(setIsLoading(true));
    navigate('Home');
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      return userCredential;
    } catch (error) {
      console.log('Google Services error', error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const fetchClubData = async (userId: string) => {
    const clubDoc = await firestore().collection('clubs').doc(userId).get();
    if (clubDoc.exists) {
      const clubData = clubDoc.data();
      const formattedClubData = {
        id: clubDoc.id,
        clubName: clubData?.clubName,
        address: clubData?.address,
        googleMapsLink: clubData?.googleMapsLink,
        location: {
          lat: clubData?.location.latitude,
          lng: clubData?.location.longitude,
        },
        courts: clubData?.courts || [],
        ownerName: clubData?.ownerName,
      };
      console.log('formatttedClubdata', formattedClubData);
      return formattedClubData;
    }
    return null;
  };

  const SignInWithEmail = async () => {
    dispatch(setIsLoading(true));
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        userEmail,
        userPassword,
      );
      console.log('user logged in', userCredential);
      const clubData = await fetchClubData(userCredential.user.uid);
      if (clubData) {
        dispatch(setCurrentClub(clubData));
        userType === 'owner' ? navigate('OwnerHome') : navigate('Home');
      }
    } catch (error) {
      console.log('SignInWithEmail Error: ', error);
      Toast.show({
        type: 'error',
        text1: 'Something is wrong',
        text2: `Your email or password is incorrect. Try again! 😉`,
      });
      dispatch(setUserEmail(''));
      dispatch(setUserPassword(''));
      navigate('Login');
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
        <Button title="Register now" onPress={() => navigate('Register')} />
      </View>
      <BookingsItem />
    </SafeAreaView>
  );
};

export default Login;
