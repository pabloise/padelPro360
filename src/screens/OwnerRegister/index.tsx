import {useEffect, useRef, useState} from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProps} from '../../types/navigation';
import {RootState} from '../../redux/store';
import useAuthForm from '../../hooks/useAuthForm';
import {RegisterWithEmail} from '../../helpers/authHelper';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import {setClubAddress, setLocation} from '../../redux/modules/clubSlice';
import {saveClubDateToFirestore} from '../../firebase/saveClubData';
import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const OwnerRegister = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const {userEmail, userPassword, userName} = useSelector(
    (state: RootState) => state.user,
  );
  const [address, setAddress] = useState('');
  const {clubName, location} = useSelector(
    (state: RootState) => state.club.currentClub,
  );
  const placesRef = useRef<GooglePlacesAutocompleteRef>(null);

  const {
    handleEmailChange,
    handleNameChange,
    handlePasswordChange,
    handleClubNameChange,
  } = useAuthForm();

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const res = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      return res === RESULTS.GRANTED;
    }

    if (Platform.OS === 'android') {
      const res = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return res === PermissionsAndroid.RESULTS.GRANTED;
    }

    return false;
  };

  const handleUserCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      console.log('Location permission not granted');
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('position', position);
      },
      error => {
        console.log('error Geolotacion, ', error);
      },
      {enableHighAccuracy: true, timeout: 1500, maximumAge: 10000},
    );
  };

  const generateGoogleMapsLink = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  };

  const handleOwnerRegister = async () => {
    try {
      const registeredOwner = await RegisterWithEmail(
        dispatch,
        navigation,
        userEmail,
        userPassword,
        userName,
        'owner',
        () => {
          if (placesRef.current) {
            placesRef.current.setAddressText('');
          }
        },
      );

      const googleMapsLink = generateGoogleMapsLink(address);

      if (registeredOwner) {
        const clubData = {
          address,
          clubName,
          location: location,
          googleMapsLink,
          ownerName: userName,
          courts: [],
        };

        await saveClubDateToFirestore(registeredOwner.uid, clubData);
      }
    } catch (error) {
      console.log('error desde ownerRegister', error);
    }
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
      <TextInput
        placeholder="Enter your club name"
        value={clubName}
        onChangeText={handleClubNameChange}
      />
      <View
        style={{
          position: 'absolute',
          top: 200,
          right: 0,
          left: 0,
          zIndex: 10,
        }}>
        <GooglePlacesAutocomplete
          textInputProps={{
            value: address,
            onChangeText: text => setAddress(text),
          }}
          ref={placesRef}
          placeholder="Type the club address"
          query={{
            key: 'AIzaSyC_tt9tAg7wHDoU8Zmno2PSeXfP5h6Rzfo',
            language: 'en',
            fields: 'geometry',
          }}
          fetchDetails
          onPress={(data, details = null) => {
            console.log('Data:', data);
            console.log('Details:', details);
            if (details && details.geometry && details.geometry.location) {
              const {lat, lng} = details.geometry.location;
              console.log('Latitude:', lat, 'Longitude:', lng);
              dispatch(setLocation({lat, lng}));
              if (data.description) {
                dispatch(setClubAddress(data.description));
              }
            } else {
              console.log('No location details available');
            }
          }}
        />
      </View>
      <Button title="Register!" onPress={handleOwnerRegister} />
      <Button
        title="Use current Location"
        onPress={handleUserCurrentLocation}
      />
      <Button
        title="Take me home"
        onPress={() => navigation.navigate('Login')}
      />
    </SafeAreaView>
  );
};

export default OwnerRegister;
