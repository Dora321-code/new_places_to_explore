import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useRef } from "react";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AuthStack from "./AuthStack";
import UserHomeScreen from "../screens/Home/users/UserHomeScreen";
import HomeNoLogin from "../screens/Home/HomeNoLogin";
import StartupScreen from "../screens/StartupScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import AddPlaceScreen from "../screens/Home/users/AddPlaceScreen";
import CollectionScreen from "../screens/Home/users/CollectionScreen";
import CostomDrawer from "../components/CostomDrawer";
import ProfileScreen from "../screens/Home/users/ProfileScreen";
import SettingsScreen from "../screens/Home/SettingsScreen";
import MyplacesSCreen from "../screens/Home/MyplacesSdreen";
import AboutUsScreen from "../screens/Home/AboutUsScreen";
import MapScreen from "../screens/Home/MapScreen";
import PlaceDetailScreen from "../screens/Home/PlaceDetailScreen";
import Colors from "../constants/Colors";
import FeedBackSCreen from "../screens/Home/FeedBackSacreen";
import PrivacyPolicy from "../screens/Home/PrivacyPolicy";

const Tab = createMaterialBottomTabNavigator();

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function BottomNavs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#aa18ea"
      barStyle={{ backgroundColor: "" }}
    >
      <Tab.Screen
        name="TabHome"
        component={UserHomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AddPlace"
        component={AddPlaceScreen}
        options={{
          tabBarLabel: "Add Place",
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function PlacesDrawerNavs() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: Colors.primary,
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: Colors.primary,
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: "Roboto-medium",
          fontSize: 15,
        },
      }}
      drawerContent={(props) => <CostomDrawer {...props} />}
    >
      <Drawer.Screen
        name="drawerHome"
        component={BottomNavs}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
          // headerShown:true,
          headerTitle: "My Places Collection",
          drawerLabel: "Home",
        }}
      />
      <Drawer.Screen
        name="Collection"
        component={CollectionScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="bookmark-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Places"
        component={MyplacesSCreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="basket-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="AboutUs"
        component={AboutUsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="analytics-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="FeedBack"
        component={FeedBackSCreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="help-circle-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="copy-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function PlacesNavigator() {
  const isAuth = useSelector((state) => state.auth.token);
  const dispatch = useDispatch()
  const navRef = useRef();

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        CommonActions.navigate({ name: 'Auth' })
      );
    }
  }, [isAuth]);

  return (
    <NavigationContainer ref={navRef} >
      <Stack.Navigator>
        <Stack.Screen
          name="startupscreen"
          component={StartupScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={PlacesDrawerNavs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerTitle: "Map View" }}
        />
        <Stack.Screen
          name="PlaceDetail"
          component={PlaceDetailScreen}
          options={{ headerTitle: "PlaceDetail" }}
        />

        {/* <Stack.Screen
          name="Home"
          component={PlacesDrawerNavs}
          options={{
            headerShown: false,
          }}
        /> */}

        <Stack.Screen
          component={AuthStack}
          name="Auth"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home_without_login"
          component={HomeNoLogin}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
