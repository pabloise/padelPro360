import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {resetUser} from '../redux/modules/userSlice';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../types/navigation';

const useLogout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
        dispatch(resetUser());
      });
  };
  return {handleSignOut};
};

export default useLogout;
