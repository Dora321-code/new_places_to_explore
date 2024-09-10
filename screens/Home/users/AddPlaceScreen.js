import React, { useState, useCallback, useEffect } from "react";
import { Image, View, Text, StyleSheet, ScrollView, Animated, TextInput, Alert } from "react-native";
import { Button } from "@rneui/themed";
import { useDispatch } from "react-redux";
import ImgPicker from "../../../components/ImagePicker";
import Input from "../../../components/Input";
import Ionicons from "@expo/vector-icons/Ionicons";
import LocationPicker from "../../../components/LocationPicker";
import * as placesActions from "../../../context/actions/placeActions";
import { SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT } from "../../../constants";

function AddPlaceScreen(props) {
  const [titleValue, setTitleValue] = useState("");
  const [PlaceDescription, setPlaceDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch()
  const [selectedLocation, setSelectedLocation] = useState();
  const [IsAdding, setIsAdding] = useState(false)


  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const _loadingDeg = new Animated.Value(0)

  const titleChangeHandler = (text) => {
    // you could add validation
    setTitleValue(text);
  };
  const PlaceDescriptionHandler = (text) => {
    // you could add validation
    setPlaceDescription(text);
  };

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  const savePlaceHandler = async () => {
    setError(null)
    setIsAdding(true);  
   try {
   await dispatch(
      placesActions.addPlace(titleValue,PlaceDescription, selectedImage, selectedLocation)
    );
    setPlaceDescription(' ')
    imageTakenHandler(' ')
    setTitleValue(' ')
    locationPickedHandler(' ')
    props.navigation.goBack()
   } catch (error) {
    setError(error.message);
    setIsAdding(false);
    
   }
   setIsAdding(false);

  };


  return (
    <ScrollView>
       {IsAdding && (  <View style={styles.loadingWrapper}>
      <View style={styles.loading}>
        <Animated.Image
          // onLayout={_animationLoadingDeg}
          style={{
            width: 30,
            height: 30,
            marginRight: 10,
            transform: [
              {
                rotate: _loadingDeg.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
          }}
          source={require("../../../assets/waiting.png")}
        />
        <Text
          style={{
            fontWeight: "500",
          }}
        >
          Adding Place...
        </Text>
      </View>
    </View>)}
      <View style={{ marginTop: 80, alignItems: "center", flex: 1 }}>
        <ImgPicker onImageTaken={imageTakenHandler} />
        <Text style={styles.placeTitle}>Place Details</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Place Name"
            autoCorrect={false}
            autoFocus={true}
            required
            onChangeText={titleChangeHandler}
            initialValue={titleValue}
            returnKeyType="next"
            style={{ fontFamily: "Roboto-regular",margin:10 }}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Place description"
            autoCorrect={false}
            autoFocus={true}
            required
            onChangeText={PlaceDescriptionHandler}
            initialValue={PlaceDescription}
            returnKeyType="done"
            style={{ margin: 10 }}
          />
        </View>
        <View>
          <LocationPicker
            navigation={props}
            mapPickedLocation={props.route.param?.pickedLocation}
            onLocationPicked={locationPickedHandler}
          />
        </View>
        <Button
          title="Add Place"
          onPress={savePlaceHandler}
          icon={() => <Ionicons name="save-outline" size={20} color="white" />}
          iconContainerStyle={{ marginRight: 50 }}
          titleStyle={{ fontFamily: "Roboto-bold", marginLeft: 10 }}
          buttonStyle={{
            backgroundColor: "green",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 10,
          }}
          containerStyle={{
            width: 250,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  placeTitle: {
    fontSize: 30,
    fontFamily: "Roboto-bold",
  },
  inputWrapper: {
    borderRadius: 5,
    overflow: "hidden",
    borderColor: "#ddd",
    borderWidth: 1,
    width: "90%",
    position: "relative",
    marginVertical: 10,
  },
  loadingWrapper: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 99,
  },
  loading: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export default AddPlaceScreen;
