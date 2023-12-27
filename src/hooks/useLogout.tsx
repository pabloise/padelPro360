import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {resetUser} from '../redux/modules/userSlice';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../types/navigation';
import {resetClub} from '../redux/modules/clubSlice';

const useLogout = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation<NavigationProps>();

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        navigate('Login');
        dispatch(resetUser());
        dispatch(resetClub());
      });
  };
  return {handleSignOut};
};

export default useLogout;
