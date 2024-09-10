import React from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MapPreview from '../../components/MapPreview';
import Colors from '../../constants/Colors';

const PlaceDetailScreen = props => {
  console.log(props);
  const placeId = props.route.params?.placeId;
  const placeTitle = props.route.params?.placeTitle;
  const selectedPlace = useSelector(state =>
    state.places.places
  );
  console.log(placeId);
  const place =  selectedPlace.find(place => place.id === placeId) ;
  console.log(place);

  const selectedLocation = { lat: place.lat, lng: place.lng };

  React.useEffect(() => {
    props.navigation.setOptions({
      headerTitle: placeTitle,
    });
  }, [placeTitle])

  const showMapHandler = () => {
    props.navigation.navigate({name:'Map',params:{
      readonly: true,
      initialLocation: selectedLocation
    }});
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <Text style={{marginVertical:20, fontFamily:'Roboto-bold', fontSize:30 }}>{place.description}</Text>
      {/* <Text style={{marginVertical:2, fontFamily:'Roboto-bold', fontSize:25 }}>{place.description}</Text> */}
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          location={selectedLocation}
          onPress={showMapHandler}
        />
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc'
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: 'center',
    fontSize:18,
    fontFamily:'Roboto-bold'
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});

export default PlaceDetailScreen;
