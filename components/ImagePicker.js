import React, { useState } from "react";
import { View, Image, Text, StyleSheet, Alert } from "react-native";
import { Button } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";

const ImgPicker = (props) => {
  const [pickedImage, setpickedImage] = useState();
  

  const getPermissionAsync = async () => {
    const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(status);

    if (status.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.canceled) {
      setpickedImage(result.assets[0].uri);
    }
}

const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.canceled) {
      setpickedImage(result.assets[0].uri);
    }
}

  const takeImageHandler = async () => {
    const hasPermission = await getPermissionAsync();
    console.log(hasPermission);
    if (!hasPermission) {
      return;
    }
    // const image = await ImagePicker.launchImageLibraryAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
      quality: 1,
      });

    // Explore the result

    if (!result.canceled) {
      setpickedImage(result.assets[0].uri);
      props.onImageTaken(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Button
            onPress={takeImageHandler}
            title="Add an Image"
            icon={() => (
              <Ionicons name="image-outline" size={20} color="white" />
            )}
            iconContainerStyle={{ marginRight: 50 }}
            titleStyle={{ fontFamily: "Roboto-bold", marginLeft: 10 }}
            buttonStyle={{
              backgroundColor: "rgba(78, 116, 289, 1)",
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
        ) : (
          <Image style={{ width: 400, height: 200 }} source={{uri:pickedImage}} />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 5,
  },
    imagePreview: {
      width: "100%",
      height:200,
      marginBottom: 10,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#ccc",
      borderWidth: 1,
    },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImgPicker;
