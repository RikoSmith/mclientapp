import React, { Component } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import UserCard from "../../components/UserCard/UserCard";
import UserSettings from "../../components/UserSettings/UserSettings";

class SettingsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ScrollView>
        <UserCard />
        <UserSettings />
      </ScrollView>
    );
  }
}

export default SettingsScreen;
