import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { useDispatch } from "react-redux";
import { Avatar, Divider } from "@rneui/themed";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/index";
import Ionicons from "@expo/vector-icons/Ionicons";

function AboutUsScreen(props) {
  const dispatch = useDispatch();

  // Uncomment if loadCollection is needed
  // useEffect(() => {
  //   dispatch(placesActions.loadCollection());
  // }, [dispatch]);

  const handlePhoneCall = () => {
    Linking.openURL("tel:+255757617713");
  };

  const handleSendMessage = () => {
    Linking.openURL("sms:+255757617713");
  };

  const handleSendEmail = () => {
    Linking.openURL("mailto:bestplaces@gmail.com");
  };

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
          <Text style={styles.name}>About Us</Text>
        </View>
      </View>
      <Divider />
      <View style={styles.content}>
        <Avatar
          size={132}
          rounded
          source={{
            uri: "https://www.isd518.net/wp-content/uploads/2023/01/bpa-logo.png",
          }}
        />
        <Text style={styles.name}>Fine Locations</Text>
        <Text style={styles.version}>Version 1.0.1</Text>
        <Text style={styles.copyright}>Copyright © 2024</Text>
        <View style={styles.contact}>
          <TouchableOpacity onPress={handlePhoneCall} style={styles.contactButton}>
            <Text style={styles.contactText}>Call Us: +255757617713</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSendMessage} style={styles.contactButton}>
            <Text style={styles.contactText}>Message Us: +255757617713</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSendEmail} style={styles.contactButton}>
            <Text style={styles.contactText}>Email Us: bestplaces@gmail.com</Text>
          </TouchableOpacity>
        </View>
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
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontFamily: "Roboto-bold",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  version: {
    fontFamily: "Roboto-medium",
    fontSize: 18,
    marginVertical: 5,
  },
  copyright: {
    fontFamily: "Roboto-regular",
    fontSize: 12,
    marginVertical: 5,
  },
  contact: {
    marginTop: 20,
    alignItems: "center",
  },
  contactButton: {
    marginVertical: 5,
  },
  contactText: {
    fontFamily: "Roboto-medium",
    fontSize: 16,
    color: "#007BFF",
  },
});

export default AboutUsScreen;
