import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, SafeAreaView, TextInput} from 'react-native';
import {RootState} from '../../redux/store';
import useAuthForm from '../../hooks/useAuthForm';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../types/navigation';
import Toast from 'react-native-toast-message';
import {Picker} from '@react-native-picker/picker';
import {RegisterWithEmail} from '../../helpers/authHelper';
import {GENDER_OPTIONS} from '../../constants/genderOptions';

const Register = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const {userName, userEmail, userPassword, userGender} = useSelector(
    (state: RootState) => state.user,
  );
  const {
    handleEmailChange,
    handlePasswordChange,
    handleNameChange,
    handleGenderChange,
  } = useAuthForm();

  const handleRegister = () => {
    RegisterWithEmail(
      dispatch,
      navigation,
      userEmail,
      userPassword,
      userName,
      'normal',
    ).catch(error => console.log('error in Register with Email, ', error));
  };

  const isGenderSelected = userGender !== null;

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
      <Picker
        enabled={!isGenderSelected}
        selectedValue={userGender}
        onValueChange={itemValue => handleGenderChange(itemValue)}>
        {GENDER_OPTIONS.map(item => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
      <Button title="Register!" onPress={handleRegister} />
      <Button
        title="Register as an owner"
        onPress={() => navigation.navigate('OwnerRegister')}
      />
      <Button
        title="Take me home"
        onPress={() => navigation.navigate('Login')}
      />
    </SafeAreaView>
  );
};

export default Register;
