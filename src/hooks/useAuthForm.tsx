import {useDispatch} from 'react-redux';
import {
  setUserEmail,
  setUserName,
  setUserPassword,
} from '../redux/modules/userSlice';

const useAuthForm = () => {
  const dispatch = useDispatch();

  const handleEmailChange = (email: string) => {
    dispatch(setUserEmail(email));
  };

  const handlePasswordChange = (password: string) => {
    dispatch(setUserPassword(password));
  };

  const handleNameChange = (name: string) => {
    dispatch(setUserName(name));
  };

  return {handleEmailChange, handlePasswordChange, handleNameChange};
};

export default useAuthForm;
