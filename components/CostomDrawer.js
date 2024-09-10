import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
  Share,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Divider, Avatar } from "@rneui/base";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as AuthAction from "../context/reducers/auth";

function CostomDrawer(props) {
  const user = useSelector((state) => state.auth?.user);
  const places = useSelector((state) => state.places.userPlaces);
  const dispatch = useDispatch();

  const backPressed = () => {
    Alert.alert(
      "Logout App",
      "Do you want to exit?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ],
      { cancelable: false }
    );
    return true;
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Best Places App | Find your best places",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: Colors.primary }}
      >
        <ImageBackground
          source={require("../assets/withdarkshades-nfTVDjMaXYc-unsplash.jpg")}
          style={{ padding: 40 }}
        >
          <Avatar
            size={100}
            rounded
            title={"B"}
            containerStyle={{ backgroundColor: Colors.primary }}
          />
          <Text
            style={{ color: "#fff", fontSize: 15, fontFamily: "Roboto-medium" }}
          >
            {user}
          </Text>
          <Text style={{ color: "#fff", fontFamily: "Roboto-regular" }}>
            {places?.length} places
          </Text>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <Divider />
      <View style={{ padding: 20 }}>
        <TouchableOpacity onPress={() => {onShare()}} style={{ paddingVertical: 15 }} 
        
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Roboto-medium",
                marginLeft: 5,
              }}
            >
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            backPressed();
          }}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Roboto-medium",
                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CostomDrawer;
