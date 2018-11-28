import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { createStackNavigator } from "react-navigation";
import { createStore } from "redux";
import { Provider } from "react-redux";

import StartScreen from "./src/screens/StartScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import HomeTabNavigator from "./src/screens/HomeTabNavigator";
import reducer from "./src/reducers";

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppStackNavigator />
      </Provider>
    );
  }
}

export default App;

const AppStackNavigator = createStackNavigator({
  StartScreen: { screen: StartScreen },
  HomeTabNavigator: {
    screen: HomeTabNavigator,
    navigationOptions: {
      header: null
    }
  },
  LoginScreen: { screen: LoginScreen },
  SignUpScreen: { screen: SignUpScreen }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});
