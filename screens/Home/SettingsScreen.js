import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { Divider } from '@rneui/themed';
import { SCREEN_WIDTH } from '../../constants';

const SettingsScreen = (props) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled((prevValue) => !prevValue);
  };

  const toggleDarkMode = () => {
    setDarkModeEnabled((prevValue) => !prevValue);
  };

  return (
    <View style={styles.container}>
       <View style={styles.screenHerosec}>
        <View style={styles.avatarSec}>
          <Ionicons
            name="menu-outline"
            style={{marginRight:6}}
            size={30}
            color="#333"
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <Text style={{fontSize:18, fontFamily:'Roboto-bold'}}>Settings</Text>
        </View>
      </View>
      <Divider />
      <Text style={styles.heading}></Text>

      <View style={styles.option}>
        <Text style={styles.optionText}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          style={{}}
        />
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Enable Dark Mode</Text>
        <Switch value={darkModeEnabled} onValueChange={toggleDarkMode} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  optionText: {
    fontSize: 18,
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
});

export default SettingsScreen;
