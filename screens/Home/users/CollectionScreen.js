import React, { useEffect } from "react";
import { View, Text, StyleSheet, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Divider } from "@rneui/themed";
import CollectionItem from "../../../components/CollectionItem";
import * as placesActions from "../../../context/actions/placeActions";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";

function CollectionScreen(props) {
  const places = useSelector((state) => state.places.userCollection);
  const dispatch = useDispatch();
  console.log(places);

  useEffect(() => {
    dispatch(placesActions.loadCollection());
  }, [dispatch]);
  
  return (
    <View style={styles.screen}>
        <View style={styles.screenHerosec}>
     <View style={styles.avatarSec}>
        <Ionicons name="menu-outline" size={30} color="#333" onPress={() => {props.navigation.toggleDrawer()}}/>
          <Text style={styles.name}>My Collection</Text>
          <Avatar
            size={32}
            onPress={() => props.navigation.toggleDrawer()}
            rounded
            source={{ uri: "https://www.isd518.net/wp-content/uploads/2023/01/bpa-logo.png" }}
          />
        </View>
        </View>
        <Divider />
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <CollectionItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.address}
          onSelect={() => {
            props.navigation.navigate({
              name:'PlaceDetail',params: {
                placeTitle: itemData.item.title,
                placeId: itemData.item.id
              }
            });
          }}
        />
      )}
    />
     </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent:"center",
    // alignItems:'center',
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    // fontWeight: "bold",
    fontFamily:'Roboto-bold'
  },
})
export default CollectionScreen;
