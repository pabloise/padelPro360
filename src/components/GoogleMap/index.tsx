import MapView, {Marker} from 'react-native-maps';

const GoogleMap = ({location}: any) => {
  if (!location || location.lat === null || location.lng === null) return null;

  const region = {
    latitude: location.lat,
    longitude: location.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <MapView
      style={{height: 200, width: '100%'}}
      region={region}
      showsUserLocation={true}>
      <Marker
        coordinate={{latitude: location.lat, longitude: location.lng}}
        title="You are here"
      />
    </MapView>
  );
};

export default GoogleMap;
