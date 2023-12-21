import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {AVATAR_IMAGES} from '../constants/genderOptions';
import {Image} from 'react-native';

const AvatarImageCheck = () => {
  const {userGender} = useSelector((state: RootState) => state.user);
  const genderKey = userGender ?? "I'd rather not say";
  const imgSrc = AVATAR_IMAGES[genderKey];
  return (
    <Image source={imgSrc} style={{width: 60, height: 60, borderRadius: 50}} />
  );
};

export default AvatarImageCheck;
