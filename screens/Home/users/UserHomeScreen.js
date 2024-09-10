import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
  FlatList,
  Animated,
  Alert
} from "react-native";
import { Avatar, Divider, Icon, SearchBar, Button } from "@rneui/themed";
import Input from "../../../components/Input";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import * as PlaceActions from "../../../context/actions/placeActions";
import PlaceCard from "../../../components/PlaceCard";
import Colors from "../../../constants/Colors";

function UserHomeScreen(props) {
  const [isLoading, setisLoading] = React.useState(false);
  const places = useSelector((state) => state.places.places).reverse();
  const [search, setSearch] = React.useState("");
  const user = useSelector((state) => state.auth?.user);


  function showToast() {
    ToastAndroid.show('Place added to collection successfully!', ToastAndroid.SHORT);
  }

  const updateSearch = (search) => {
    setSearch(search);
  };
  const dispatch = useDispatch();

  const loadData = async () => {
    setisLoading(true);
    await dispatch(PlaceActions.loadPlaces());
    setisLoading(false);
  };

  React.useEffect(() => {
    loadData();
  }, [dispatch]);
  console.log(places);


  const viewPlace = async (placeId) => {
    const viewedplace =  places.find(place => place.id === placeId);
    const likesToAdd = parseInt(viewedplace.likes)  + 1 ; 

   try {
    await dispatch(PlaceActions.addViews(placeId, likesToAdd))
    loadData()
   } catch (error) {
    if (error) {
      Alert.alert("An Error Occurred!", error.message, [{ text: "Okay" }]);
    }
   }

  }

  const _loadingDeg = new Animated.Value(0);

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
          <Text style={styles.name}>Best Places App</Text>
          <Avatar
            size={32}
            onPress={() => props.navigation.toggleDrawer()}
            containerStyle={{ backgroundColor: Colors.primary }}
            rounded
            title={"B"}
          />
        </View>
        <View style={styles.inputContainer}>
          <SearchBar
            searchIcon={() => (
              <Ionicons name="search-outline" size={20} color="white" />
            )}
            lightTheme
            round
            placeholder="Search Here..."
            onChangeText={updateSearch}
            value={search}
          />
        </View>
        <View style={styles.HeroTitles}>
          <Text style={styles.heroTitle}>All places</Text>
          {/* <Button title="See all" color="green" style={{ color: "white" }} /> */}
        </View>
      </View>
      <Divider />
      <View style={{ flex: 1 }}>
        {isLoading && (
          <View style={styles.loadingWrapper}>
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
                Loading Places...
              </Text>
            </View>
          </View>
        )}
        <FlatList
          // onRefresh={loadProducts}
          // refreshing={isRefreshing}
          data={places}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <PlaceCard
              image={itemData.item.imageUri}
              title={itemData.item.title}
              price={itemData.item.address}
              onSelect={() => {
                props.navigation.navigate({
                  name: "PlaceDetail",
                  params: {
                    placeTitle: itemData.item.title,
                    placeId: itemData.item.id,
                  },
                });
                viewPlace(itemData.item.id);
              }}
            >
              <Button
                title={`${itemData.item.likes} ` + 'Views'} 
                onPress={() => {
                  selectItemHandler(itemData.item.id, itemData.item.title);
                }}
                icon={() => (
                  <Ionicons name="eye-outline" size={20} color="white" />
                )}
                iconContainerStyle={{ marginRight: 50 }}
                titleStyle={{ fontFamily: "Roboto-bold", marginLeft: 10 }}
                buttonStyle={{
                  backgroundColor: Colors.primary,
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 10,
                }}
                containerStyle={{
                  width: 100,
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}
              />
              <Ionicons
                name="bookmark-outline"
                color={Colors.primary}
                size={30}
                onPress={() => {
                  dispatch(PlaceActions.add_to_collection(itemData.item.id));
                  showToast()
                }}
              />
            </PlaceCard>
          )}
        />
      </View>
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
    height: "20%",
    width: SCREEN_WIDTH,
    paddingHorizontal: 25,
    marginTop: 50,
  },
  avatarSec: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    width: "50%",
    height: "50%",
    // borderRadius:'50%',
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 20,
    // fontWeight: "bold",
    fontFamily: "Roboto-bold",
  },
  inputContainer: {
    position: "relative",
    width: "100%",
    height: 65,
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    marginVertical: 7.5,
  },
  heroTitle: {
    fontSize: 20,
    // fontWeight: "bold",
    fontFamily: "Roboto-bold",
  },

  HeroTitles: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

export default UserHomeScreen;
