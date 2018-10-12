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
        tabBarIcon: () => <Icon name="home" size={22} />
      }
    },
    Charts: {
      screen: ChartsScreen,
      navigationOptions: {
        tabBarIcon: () => <Icon name="analytics" size={22} />
      }
    },
    Tables: {
      screen: TablesScreen,
      navigationOptions: {
        tabBarIcon: () => <Icon name="list-box" size={22} />
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarIcon: () => <Icon name="notifications" size={22} />
      }
    },
    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: {
        tabBarIcon: () => <Icon name="settings" size={22} />
      }
    }
  },
  {
    order: ["Home", "Charts", "Tables", "Notifications", "Settings"],
    tabBarOptions: {
      activeTintColor: "#18BC9C",
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
