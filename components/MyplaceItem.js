import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import { Avatar } from "@rneui/themed";
import * as PlaceActions from "../context/actions/placeActions"

const MyplaceItem = (props) => {
    const dispatch = useDispatch()

  const deletePlace = async (placeId) => {
    Alert.alert("Your about to Delete!", props.title, [{ text: "Delete" }, {text:"Cancel"}]);

   try {
    await dispatch(PlaceActions.deletePlace(placeId))
    dispatch(PlaceActions.loadPlaces())
   } catch (error) {
    if (error) {
      Alert.alert("An Error Occurred!", error.message, [{ text: "Okay" }]);
    }
   }

  }
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      <Image style={styles.image} source={{ uri: props.image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.address}>{props.address}</Text>
      </View>
      <Avatar
        size={32}
        rounded
        icon={() => <Ionicons name="trash-bin" size={20} color="white" />}
        containerStyle={{ backgroundColor: Colors.accent }}
        onPress={() => deletePlace(props.placeId)}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ccc",
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    color: "black",
    fontSize: 18,
    marginBottom: 5,
  },
  address: {
    color: "#666",
    fontSize: 16,
  },
});

export default MyplaceItem;
