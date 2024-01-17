import {SafeAreaView, Text, Image, View, Button} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {useEffect} from 'react';
import useLogout from '../../hooks/useLogout';

const OwnerHome = () => {
  const {handleSignOut} = useLogout();
  const {user} = useSelector((state: RootState) => state);
  const {clubName, address} = useSelector(
    (state: RootState) => state.club.currentClub,
  );
  const {ownerName} = useSelector((state: RootState) => state.club.currentClub);

  useEffect(() => {
    console.log('clubName: ', clubName);
    console.log('clubAddress: ', address);
  }, [clubName, address]);

  return (
    <SafeAreaView>
      <View>
        <View style={{}}>
          <Image
            style={{width: 60, height: 60, borderRadius: 50}}
            source={require('../../assets/owner-avatar.png')}
          />
          <Text>Welcomeeee, {ownerName ? ownerName : user.userName}</Text>
          <Text>Club name: {clubName}</Text>
          <Text>Club Address: {address}</Text>
          <Text>Hi from OWNER HOME for owner useres</Text>
        </View>
        <Button title="Logout" onPress={handleSignOut} />
      </View>
    </SafeAreaView>
  );
};

export default OwnerHome;
