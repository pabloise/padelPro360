import {SafeAreaView, Text, Button, Image, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import useLogout from '../../hooks/useLogout';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import OwnerHome from '../OwnerHome';
import {AVATAR_IMAGES} from '../../constants/genderOptions';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../types/navigation';

const Home = () => {
  const {handleSignOut} = useLogout();
  const {user, isLoading, userGender, userType} = useSelector(
    (state: RootState) => state.user,
  );

  if (isLoading) {
    return (
      <SafeAreaView>
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item
            flexDirection="row"
            alignItems="center"
            paddingLeft={10}>
            <SkeletonPlaceholder.Item
              width={60}
              height={60}
              borderRadius={50}
            />
            <SkeletonPlaceholder.Item marginLeft={20}>
              <SkeletonPlaceholder.Item width={250} height={20} />
              <SkeletonPlaceholder.Item marginTop={6} width={180} height={20} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </SafeAreaView>
    );
  }

  const avatarImageCheck = () => {
    const genderKey = userGender ?? "I'd rather not say";
    const imgSrc = AVATAR_IMAGES[genderKey];
    return (
      <Image
        source={imgSrc}
        style={{width: 60, height: 60, borderRadius: 50}}
      />
    );
  };

  return (
    <SafeAreaView>
      {userType === 'owner' ? (
        <View>
          <OwnerHome />
        </View>
      ) : (
        <View>
          <View style={{flexDirection: 'row'}}>
            {user?.photoURL ? (
              <Image
                style={{width: 60, height: 60, borderRadius: 50}}
                source={{uri: user?.photoURL}}
              />
            ) : (
              avatarImageCheck()
            )}
            <Text>Welcome, {user?.displayName}</Text>
            <Text>{userGender}</Text>
            <Text>Hi from HOME for normal useres</Text>
          </View>
          <Button title="Logout" onPress={handleSignOut} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
