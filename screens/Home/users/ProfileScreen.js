import { Avatar, Button, Divider } from "@rneui/themed";
import React from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TextInput, Modal, Pressable } from "react-native";
import Colors from "../../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import * as PlaceActions from "../../../context/actions/placeActions";
import PlaceCard from "../../../components/PlaceCard";
import CollectionItem from "../../../components/CollectionItem";

function ProfileScreen() {
  const [isLoading, setisLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [password, setpassword] = React.useState("");
  const [email, setemail] = React.useState("");
  const [phone, setphone] = React.useState("");
  const places = useSelector((state) => state.places.userPlaces);
  const user = useSelector((state) => state.auth.user);
  const allplaces = useSelector((state) => state.places.places);
  const collplaces = useSelector((state) => state.places.userCollection);
  const dispatch = useDispatch();

   let views = 0;

  const loadData = async () => {
    setisLoading(true);
    await dispatch(PlaceActions.loadPlaces());
    for (let i = 0; i < places?.length; i++) {
      const element = places[i];
      views + parseInt(element.likes)
     }
    setisLoading(false);
  };

  React.useEffect(() => {
    loadData();
  }, [dispatch]);
  console.log(places);

  const changePassword = (text) => {
    setpassword(text);
  };
  const changeEmail = (text) => {
    setemail(text);
  };
  const changePhone = (text) => {
    setphone(text);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update profile</Text>
            <TextInput
              id="password"
              placeholder="email"
              onChangeText={changeEmail}
              initialValue={email}
              style={{
                width: "100%",
                height: 44,
                fontSize: 16,
                paddingRight: 44,
                paddingLeft: 9,
                backgroundColor: "rgb(242,242,242)",
                marginVertical:2
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
                width: "100%",
                height: 44,
                fontSize: 16,
                paddingRight: 4,
                paddingLeft: 9,
                backgroundColor: "rgb(242,242,242)",
                marginVertical:2
              }}
              required
              minLength={5}
              errorText="Please enter a strong password."
              keyboardType="phone-pad"
              returnKeyType="done"
            />
             <TextInput
                  id='password'
                  placeholder="password"
                  onChangeText={changePassword}
                  initialValue={password}
                  style={{
                    width: "100%",
                    height: 44,
                    fontSize: 16,
                    paddingRight: 44,
                    paddingLeft: 9,
                    backgroundColor: "rgb(242,242,242)",
                    marginVertical:2
                  }}
                  required
                  minLength={5}
                  errorText="Please enter a strong password."
                  returnKeyType="done"
                />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>update</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Avatar
          size={120}
          rounded
          title={user?.charAt(0).toUpperCase()}
          containerStyle={{ backgroundColor: Colors.primary }}
        />
        <Text style={styles.userEmail}>{user}</Text>
        <View style={styles.btnWrapper}>
          <Button
            title="Edit Profile"
            onPress={() => setModalVisible(true)}
            icon={() => (
              <Ionicons name="pencil-outline" size={20} color="white" />
            )}
            iconContainerStyle={{ marginRight: 20 }}
            titleStyle={{ fontFamily: "Roboto-regular", marginLeft: 10 }}
            buttonStyle={{
              backgroundColor: "blue",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 10,
            }}
            containerStyle={{
              width: 120,
              marginHorizontal: 10,
              marginVertical: 10,
            }}
          />
          <Button
            title="Add Place"
            // onPress={savePlaceHandler}
            icon={() => (
              <Ionicons name="add-circle-outline" size={20} color="white" />
            )}
            iconContainerStyle={{ marginRight: 20 }}
            titleStyle={{ fontFamily: "Roboto-regular", marginLeft: 10 }}
            buttonStyle={{
              backgroundColor: "blue",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 10,
            }}
            containerStyle={{
              width: 120,
              marginHorizontal: 10,
              marginVertical: 10,
            }}
          />
        </View>
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{places?.length}</Text>
            <Text style={styles.userInfosub}>Places</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{collplaces?.length}</Text>
            <Text style={styles.userInfosub}>Places in Collection</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{views}</Text>
            <Text style={styles.userInfosub}>Total Views</Text>
          </View>
        </View>

        <Divider />

        {places?.map((place) => (
          <CollectionItem
            key={place.id}
            image={place.imageUri}
            title={place.title}
            address={place.address}
            onSelect={() => {
              props.navigation.navigate({
                name: "PlaceDetail",
                params: {
                  placeTitle: place.title,
                  placeId: place.id,
                },
              });
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 60,
  },
  userEmail: {
    fontFamily: "Roboto-bold",
    fontSize: 18,
    marginTop: 5,
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  userInfoWrapper: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  userInfoItem: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfoTitle: {
    fontFamily: "Roboto-bold",
    fontSize: 24,
  },
  userInfosub: {
    fontFamily: "Roboto-regular",
    fontSize: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    fontFamily: "Roboto-regular",
    width: "70%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    fontFamily: "Roboto-bold",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontFamily: "Roboto-regular",
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ProfileScreen;
