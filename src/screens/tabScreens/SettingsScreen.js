import React, { Component } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import UserCard from "../../components/UserCard/UserCard";

class SettingsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ScrollView>
        <UserCard />
      </ScrollView>
    );
  }
}

export default SettingsScreen;
