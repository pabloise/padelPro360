import {SafeAreaView, Text, Image, View, Button} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {useEffect} from 'react';
import useLogout from '../../hooks/useLogout';

const OwnerHome = () => {
  const {handleSignOut} = useLogout();
  const {userName} = useSelector((state: RootState) => state.user);
  const {user} = useSelector((state: RootState) => state);
  const {clubName, address} = useSelector(
    (state: RootState) => state.club.currentClub,
  );

  useEffect(() => {
    console.log('clubName: ', clubName);
    console.log('clubAddress: ', address);
  }, [clubName, address]);

  console.log('user', user.userName);

  return (
    <SafeAreaView>
      <View>
        <View style={{}}>
          <Image
            style={{width: 60, height: 60, borderRadius: 50}}
            source={require('../../assets/owner-avatar.png')}
          />
          <Text>Welcome, {userName}</Text>
          <Text>Club name: {clubName}</Text>
          <Text>Club Address: {address}</Text>
        </View>
        <Button title="Logout" onPress={handleSignOut} />
      </View>
    </SafeAreaView>
  );
};

export default OwnerHome;
