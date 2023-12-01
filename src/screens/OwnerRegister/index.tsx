import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProps} from '../../types/navigation';
import {RootState} from '../../redux/store';
import useAuthForm from '../../hooks/useAuthForm';
import {RegisterWithEmail} from '../../helpers/authHelper';
import Toast from 'react-native-toast-message';
import {Button, SafeAreaView, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {GENDER_OPTIONS} from '../../constants/genderOptions';

const OwnerRegister = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const {userEmail, userPassword, userName, userGender, userType} = useSelector(
    (state: RootState) => state.user,
  );
  const {
    handleEmailChange,
    handleNameChange,
    handlePasswordChange,
    handleGenderChange,
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
      <Button title="Register!" onPress={handleOwnerRegister} />
      <Button
        title="Take me home"
        onPress={() => navigation.navigate('Login')}
      />
    </SafeAreaView>
  );
};

export default OwnerRegister;
