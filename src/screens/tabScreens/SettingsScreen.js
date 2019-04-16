import React, { Component } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import UserCard from "../../components/UserCard/UserCard";
import UserSettings from "../../components/UserSettings/UserSettings";

var mainStyles = require("../../style/main");

class SettingsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ScrollView style={mainStyles.scrollV}>
        <UserCard />
        <UserSettings />
      </ScrollView>
    );
  }
}

export default SettingsScreen;
