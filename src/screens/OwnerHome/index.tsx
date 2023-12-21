import {SafeAreaView, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {useEffect} from 'react';

const OwnerHome = () => {
  const {clubName, clubAddress, userEmail} = useSelector(
    (state: RootState) => state.user,
  );

  useEffect(() => {
    console.log('clubName: ', clubName);
    console.log('clubAddress: ', clubAddress);
  }, [clubName, clubAddress]);

  return (
    <SafeAreaView>
      <Text>Congrats! You are an owner</Text>
      <Text>Adentro de una!!</Text>
      <Text>{userEmail}</Text>
      <Text>Club name: {clubName}</Text>
      <Text>Club address: {clubAddress}</Text>
    </SafeAreaView>
  );
};

export default OwnerHome;
