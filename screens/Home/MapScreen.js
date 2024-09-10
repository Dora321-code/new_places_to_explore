import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Colors from "../../constants/Colors";
import { Button } from "@rneui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";


const MapScreen = (props) => {
  const initialLocation = props.route.params?.initialLocation;
  const readonly = props.route.params?.readonly;

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : -6.7924, // Dar es Salaam latitude
    longitude: initialLocation ? initialLocation.lng : 39.2083, // Dar es Salaam longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const selectLocationHandler = (event) => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
    
  };

  const savePickedLocationHandler = () => {
    if (!selectedLocation) {
      // could show an alert!
      Alert.alert(
        'Location Empty!',
        'You havent picked a location yet. Pick a location',
        [{ text: 'Okay' }]
      );

      return;
    }
    props.navigation.navigate({
      name: "AddPlace",
      params: { pickedLocation: selectedLocation },
    });
  };

  useEffect(() => {
    props.navigation.setOptions({
      if (readonly) {
        return{ headerTitle: "Map",}
      },
      headerRight: () => (
        <TouchableOpacity style={styles.headerButton} onPress={savePickedLocationHandler}>
          <Button
            onPress={savePickedLocationHandler}
            title="Save"
            icon={() => (
              <Ionicons name="save-outline" size={20} color="white" />
            )}
            iconContainerStyle={{ marginRight: 50 }}
            titleStyle={{ fontFamily: "Roboto-bold", marginLeft: 10 }}
            buttonStyle={{
              backgroundColor: "blue",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 10,
            }}
            containerStyle={{
              width: 80,
            
            }}
          />
        </TouchableOpacity>
      ),

      headerTitle: "Map",
    });
  }, [savePickedLocationHandler]);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

// MapScreen.navigationOptions = navData => {
//   const saveFn = navData.navigation.getParam('saveLocation');
//   const readonly = navData.navigation.getParam('readonly');
//   if (readonly) {
//     return {};
//   }
//   return {
//     headerRight: (
//       <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
//         <Text style={styles.headerButtonText}>Save</Text>
//       </TouchableOpacity>
//     )
//   };
// };

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Colors.primary,
  },
});

export default MapScreen;
