import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  Alert,
  TextInput,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button, Divider } from "@rneui/themed";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/index";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";

function FeedBackSCreen(props) {
  const [password, setpassword] = React.useState("");
  const [email, setemail] = React.useState("");
  const [phone, setphone] = React.useState("");

  // useEffect(() => {
  //   dispatch(placesActions.loadCollection());
  // }, [dispatch]);

  const changePassword = (text) => {
    setpassword(text);
  };
  const changeEmail = (text) => {
    setemail(text);
  };
  const changePhone = (text) => {
    setphone(text);
  };

  const submitFeedback = () => {
    Alert.alert(
      "user feedback!",
      "Thank you, your feedback was sent succesfully",
      [{ text: "Okay" }]
    );
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
          <Text style={styles.name}>User Feedback</Text>
        </View>
      </View>
      <Divider />
      <View
        style={{
        //   flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          width: "100%",
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

        <Text style={styles.modalText}>FeedBack</Text>
        <TextInput
          id="password"
          placeholder="email"
          onChangeText={changeEmail}
          initialValue={email}
          style={{
            width: "90%",
            height: 44,
            fontSize: 16,
            paddingRight: 44,
            paddingLeft: 9,
            backgroundColor: "rgb(242,242,242)",
            marginVertical: 2,
          }}
          required
          minLength={5}
          errorText="Please enter a strong password."
          keyboardType="email-address"
          returnKeyType="done"
        />
        <TextInput
          id="phone"
          placeholder="phone"
          onChangeText={changePhone}
          initialValue={email}
          style={{
            width: "90%",
            height: 44,
            fontSize: 16,
            paddingRight: 4,
            paddingLeft: 9,
            backgroundColor: "rgb(242,242,242)",
            marginVertical: 5,
          }}
          required
          minLength={5}
          errorText="Please enter a strong password."
          keyboardType="phone-pad"
          returnKeyType="done"
        />
        <TextInput
          id="password"
          placeholder="Feedback message"
          onChangeText={changePassword}
          initialValue={password}
          style={{
            width: "90%",
            height: 100,
            fontSize: 16,
            paddingRight: 44,
            paddingLeft: 9,
            backgroundColor: "rgb(242,242,242)",
            marginVertical: 5,
          }}
          required
          errorText="Please enter a strong password."
          returnKeyType="done"
        />
        <Button
          title="Send Feedback"
          onPress={submitFeedback}
          iconContainerStyle={{ marginRight: 50 }}
          titleStyle={{ fontFamily: "Roboto-bold", marginLeft: 10 }}
          buttonStyle={{
            backgroundColor: Colors.primary,
            borderColor: "transparent",
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
export default FeedBackSCreen;
