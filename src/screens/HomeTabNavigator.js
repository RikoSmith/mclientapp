import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { createBottomTabNavigator } from 'react-navigation';
import HomeScreen from './tabScreens/HomeScreen';
import ChartsScreen from './tabScreens/ChartsScreen';
import TablesScreen from './tabScreens/TablesScreen';
import SettingsScreen from './tabScreens/SettingsScreen';
import NotificationsScreen from './tabScreens/NotificationsScreen';

const HomeTabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    Charts: { screen: ChartsScreen },
    Tables: { screen: TablesScreen },
    Settings: { screen: SettingsScreen },
    Notifications: { screen: NotificationsScreen }
  },
  { order: ['Home', 'Charts', 'Tables', 'Notifications', 'Settings'] }
);

export default HomeTabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
