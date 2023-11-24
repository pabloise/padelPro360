import {SafeAreaView, Text, Button, Image, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import useLogout from '../../hooks/useLogout';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Home = () => {
  const {handleSignOut} = useLogout();
  const {user, isLoading} = useSelector((state: RootState) => state.user);

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

  return (
    <SafeAreaView>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{width: 60, height: 60, borderRadius: 50}}
          source={
            user?.photoURL
              ? {uri: user.photoURL}
              : require('../../assets/avatar.png')
          }
        />
        <Text>Welcome, {user?.displayName}</Text>
      </View>
      <Button title="Logout" onPress={handleSignOut} />
    </SafeAreaView>
  );
};

export default Home;
