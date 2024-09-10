// import 'react-native-gesture-handler';
import React, {useRef} from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PlacesNavigator from "./navigation/PlacesNavigator";
import { Provider } from "react-redux";
import store from "./context/store";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";

const fetchFonts = () => {
  return Font.loadAsync({});
};

export default function App() {
  
  const [fontsLoaded] = useFonts({
    "Roboto-black": require("./assets/Roboto/Roboto-Black.ttf"),
    "Roboto-bold": require("./assets/Roboto/Roboto-Bold.ttf"),
    "Roboto-boldItalic": require("./assets/Roboto/Roboto-Bold.ttf"),
    "Roboto-Light": require("./assets/Roboto/Roboto-Light.ttf"),
    "Roboto-regular": require("./assets/Roboto/Roboto-Regular.ttf"),
    "Roboto-medium": require("./assets/Roboto/Roboto-Medium.ttf"),
    "Roboto-thin": require("./assets/Roboto/Roboto-Thin.ttf"),
  });

  
 
  if (!fontsLoaded) {
    return null;
  }
   
  return (
    <Provider store={store}>

        <StatusBar style="auto" />
        <PlacesNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
