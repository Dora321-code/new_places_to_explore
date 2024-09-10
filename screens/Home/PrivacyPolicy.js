import React, { useEffect } from "react";
import { View, Text, StyleSheet, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Divider } from "@rneui/themed";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/index";
import Ionicons from "@expo/vector-icons/Ionicons";

function PrivacyPolicy(props) {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(placesActions.loadCollection());
  // }, [dispatch]);

  return (
    <View style={styles.screen}>
      <View style={styles.screenHerosec}>
        <View style={styles.avatarSec}>
          <Ionicons
            name="menu-outline"
            size={30}
            color="#333"
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <Text style={styles.name}>Our Privacy Policy</Text>
        </View>
      </View>
      <Divider />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Avatar
          size={132}
          // onPress={() => props.navigation.toggleDrawer()}
          rounded
          source={{
            uri: "https://www.isd518.net/wp-content/uploads/2023/01/bpa-logo.png",
          }}
        />

        <Text style={styles.name}> Best Places app</Text>
        <Text
          style={{
            fontFamily: "Roboto-medium",
            fontSize: 18,
            marginVertical: 5,
            marginHorizontal:7
          }}
        >
          Best Places App, Is committed to protecting the privacy of
          our users. This Privacy Policy outlines how we collect, use, disclose,
          and safeguard your personal information when you use our Best Places
          app. Please read this Privacy Policy carefully to understand our
          practices regarding your personal data. 1.1. Personal Information:
          When you use our Best Places app, we may collect certain personal
          information, such as your name, email address, location, and any other
          information you provide to us voluntarily. 1.2. Usage Data: We may
          also collect information about your usage of the app, including but
          not limited to your interactions, preferences, search queries, and
          device information.
        </Text>
        <Text
          style={{
            fontFamily: "Roboto-regular",
            fontSize: 12,
            marginVertical: 5,
          }}
        >
          {" "}
          Copyright@2024
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,

    height: SCREEN_HEIGHT,
    backgroundColor: "white",
  },
  screenHerosec: {
    flexDirection: "column",
    height: "10%",
    width: SCREEN_WIDTH,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  avatarSec: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "space-a",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    // fontWeight: "bold",
    fontFamily: "Roboto-bold",
  },
});
export default PrivacyPolicy;
