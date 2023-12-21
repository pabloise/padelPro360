import {Button, SafeAreaView, TextInput, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProps} from '../../types/navigation';
import {RootState} from '../../redux/store';
import useAuthForm from '../../hooks/useAuthForm';
import {RegisterWithEmail} from '../../helpers/authHelper';
import Toast from 'react-native-toast-message';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {setClubAddress, setLocation} from '../../redux/modules/userSlice';
import GoogleMap from '../../components/GoogleMap';
import {useEffect} from 'react';

const OwnerRegister = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const {userEmail, userPassword, userName, userGender, clubName} = useSelector(
    (state: RootState) => state.user,
  );
  const {
    handleEmailChange,
    handleNameChange,
    handlePasswordChange,
    handleClubNameChange,
  } = useAuthForm();

  const handleOwnerRegister = () => {
    RegisterWithEmail(
      dispatch,
      navigation,
      userEmail,
      userPassword,
      userName,
      'owner',
    )
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Success! ✅',
          text2: 'You have been registered',
        });
      })
      .catch(error => {
        console.log('new error, ');
        console.error(error);
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
        title="Take me home"
        onPress={() => navigation.navigate('Login')}
      />
    </SafeAreaView>
  );
};

export default OwnerRegister;
