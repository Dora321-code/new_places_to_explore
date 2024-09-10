import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Divider, Stack } from "@rneui/themed";
import CollectionItem from "../../components/CollectionItem";
import * as placesActions from "../../context/actions/placeActions";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/index";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";
import MyplaceItem from "../../components/MyplaceItem";

function MyplacesSCreen(props) {
  const places = useSelector((state) => state.places?.userPlaces);
  const dispatch = useDispatch();
  console.log(places);

  useEffect(() => {
    dispatch(placesActions.loadCollection());
  }, [dispatch]);
  return (
    <ScrollView style={styles.screen}>
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
          <Text style={styles.name}>My Places</Text>
          <Avatar
            size={32}
            onPress={() => props.navigation.toggleDrawer()}
            rounded
            source={{ uri: "https://www.isd518.net/wp-content/uploads/2023/01/bpa-logo.png" }}
          />
        </View>
      </View>
      <View style={{marginTop:50}}>
      <Divider />

      
      {places?.map((place) => (
          <MyplaceItem
            key={place.id}
            image={place.imageUri}
            title={place.title}
            placeId={place.id}
            address={place.address}
            onSelect={() => {
              props.navigation.navigate({
                name: "PlaceDetail",
                params: {
                  placeTitle: itemData.item.title,
                  placeId: itemData.item.id,
                },
              });
            }}
          />
        ))}
        </View>
      {/* <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
  
            <MyplaceItem
              image={itemData.item.imageUri}
              title={itemData.item.title}
              address={itemData.item.address}
              placeId={itemData.item.id}
              onSelect={() => {
                props.navigation.navigate({
                  name: "PlaceDetail",
                  params: {
                    placeTitle: itemData.item.title,
                    placeId: itemData.item.id,
                  },
                });
              }}
            />
         
        )}
      /> */}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent:"center",
    marginTop:5,
    height: SCREEN_HEIGHT,
    backgroundColor: "white",
  },
  screenHerosec: {
    flexDirection: "column",
    height: "10%",
    width: SCREEN_WIDTH,
    paddingHorizontal: 30,
    marginTop: 40,
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
    fontFamily: "Roboto-bold",
  },
});

export default MyplacesSCreen;
