import firestore from '@react-native-firebase/firestore';
import {Club} from '../types/club';

export const saveClubDateToFirestore = async (
  userId: string,
  clubData: Omit<Club, 'id'>,
) => {
  const {address, clubName, location, googleMapsLink, ownerName} = clubData;
  const firestoreData = {
    address,
    clubName,
    courts: [],
    googleMapsLink,
    location: location
      ? new firestore.GeoPoint(location.lat, location.lng)
      : null,
    ownerName,
  };

  await firestore().collection('clubs').doc(userId).set(firestoreData);

  console.log('In firestore successfully!');
};
