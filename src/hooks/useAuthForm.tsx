import {useDispatch} from 'react-redux';
import {
  setUserEmail,
  setUserName,
  setUserPassword,
  setGender,
} from '../redux/modules/userSlice';
import {GenderType} from '../types/user';

const useAuthForm = () => {
  const dispatch = useDispatch();

  const handleGenderChange = (value: GenderType) => {
    dispatch(setGender(value));
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

  return {
    handleEmailChange,
    handlePasswordChange,
    handleNameChange,
    handleGenderChange,
  };
};

export default useAuthForm;
