import {SafeAreaView, Text, Button, Image, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import useLogout from '../../hooks/useLogout';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Home = () => {
  const {handleSignOut} = useLogout();
  const {user, isLoading} = useSelector((state: RootState) => state.user);

  console.log('isLoading en Home', isLoading);

  if (isLoading) {
    return (
      <SafeAreaView>
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item
              width={60}
              height={60}
              borderRadius={50}
            />
            <SkeletonPlaceholder.Item marginLeft={20}>
              <SkeletonPlaceholder.Item width={120} height={20} />
              <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Hi from Home</Text>
        <Text>Welcome, {user?.displayName}</Text>
        <Image
          alt="hola"
          source={{uri: user?.photoURL || undefined}}
          style={{width: 100, height: 100}}
        />
        <Button title="Logout" onPress={handleSignOut} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
