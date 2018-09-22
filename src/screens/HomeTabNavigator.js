import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { createBottomTabNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';

const HomeTabNavigator = createBottomTabNavigator({
  Home: { screen: HomeScreen },
  Home2: { screen: HomeScreen }
});

export default HomeTabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
