import {useDispatch} from 'react-redux';
import {
  setUserEmail,
  setUserName,
  setUserPassword,
  setGender,
} from '../redux/modules/userSlice';
import {
  setClubAddress,
  setClubGoogleMapsLink,
  setClubName,
} from '../redux/modules/clubSlice';

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

  const handleClubNameChange = (clubName: string) => {
    dispatch(setClubName(clubName));
  };

  const handleClubAddressChange = (clubAddress: string) => {
    dispatch(setClubAddress(clubAddress));
  };

  const handleClubGoogleMapsLinkChange = (clubGoogleMapsLink: string) => {
    dispatch(setClubGoogleMapsLink(clubGoogleMapsLink));
  };

  return {
    handleEmailChange,
    handlePasswordChange,
    handleNameChange,
    handleGenderChange,
    handleClubNameChange,
    handleClubAddressChange,
    handleClubGoogleMapsLinkChange,
  };
};

export default useAuthForm;
