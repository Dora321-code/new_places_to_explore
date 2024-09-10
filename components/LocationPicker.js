import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';
import * as Location from 'expo-location';``
import Ionicons from "@expo/vector-icons/Ionicons";
import {  Button } from '@rneui/themed';


import MapPreview from './MapPreview';

const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();
  const mapPickedLocation = props.navigation.route.params?.pickedLocation;



// // //   const { onLocationPicked } = props;

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      props.onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation]);

  const getPermissionAsync = async () => {
    const status= await Location.requestForegroundPermissionsAsync();
     console.log(status);
  
      if (status.status !== 'granted') {
        Alert.alert(
          'Insufficient permissions!',
          'You need to grant camera permissions to use this app.',
          [{ text: 'Okay' }]
        );
        return false;
      }
      return true;
    }



  const getLocationHandler = async () => {
    const hasPermission = await getPermissionAsync();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      console.log(location)
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigation.navigate('Map');
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color='green' />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
      <Button
          title="Current Location"
          onPress={getLocationHandler}
              icon={() => (
                <Ionicons name="locate-outline" size={20} color='white'/>
              )}
              iconContainerStyle={{ marginRight: 50 }}
              titleStyle={{ fontFamily:'Roboto-regular',marginLeft:10 }}
              buttonStyle={{
                backgroundColor: 'blue',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 10,
              }}
              containerStyle={{
                width: 150,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
          />
        <Button
          title="Pick on Map"
          onPress={pickOnMapHandler}
              icon={() => (
                <Ionicons name="location-sharp" size={20} color='white'/>
              )}
              iconContainerStyle={{ marginRight: 50 }}
              titleStyle={{ fontFamily:'Roboto-regular',marginLeft:10 }}
              buttonStyle={{
                backgroundColor: 'teal',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 10,
              }}
              containerStyle={{
                width: 150,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
});

export default LocationPicker;
