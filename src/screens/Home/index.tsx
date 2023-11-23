import {SafeAreaView, Text, Button, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import useLogout from '../../hooks/useLogout';

const Home = () => {
  const {handleSignOut} = useLogout();
  const {user} = useSelector((state: RootState) => state.user);

  return (
    <SafeAreaView>
      <Text>Hi from Home</Text>
      <Text>Welcome, {user?.displayName}</Text>
      <Image
        alt="hola"
        source={{uri: user?.photoURL || undefined}}
        style={{width: 100, height: 100}}
      />
      <Button title="Logout" onPress={handleSignOut} />
    </SafeAreaView>
  );
};

export default Home;
