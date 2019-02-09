import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { createBottomTabNavigator } from "react-navigation";
import HomeScreen from "./tabScreens/HomeScreen";
import ChartsScreen from "./tabScreens/ChartsScreen";
import TablesScreen from "./tabScreens/TablesScreen";
import SettingsScreen from "./tabScreens/SettingsScreen";
import NotificationsScreen from "./tabScreens/NotificationsScreen";
import Icon from "react-native-ionicons";

const HomeTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: a => <Icon name="home" color={a.tintColor} size={22} />
      }
    },
    Charts: {
      screen: ChartsScreen,
      navigationOptions: {
        tabBarIcon: a => <Icon name="analytics" color={a.tintColor} size={22} />
      }
    },
    Record: {
      screen: TablesScreen,
      navigationOptions: {
        tabBarIcon: a => (
          <Icon name="microphone" color={a.tintColor} size={22} />
        )
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarIcon: a => <Icon name="settings" color={a.tintColor} size={22} />
      }
    },
    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: {
        tabBarIcon: a => (
          <Icon name="notifications" color={a.tintColor} size={22} />
        )
      }
    }
  },
  {
    order: ["Home", "Charts", "Record", "Notifications", "Settings"],
    tabBarOptions: {
      activeTintColor: "#45D9CF",
      inactiveTintColor: "gray",
      style: {
        paddingTop: 8
      }
    }
  }
);

export default HomeTabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
