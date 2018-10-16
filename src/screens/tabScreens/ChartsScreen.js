import React, { Component } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import GroupedBarChart from "../../components/Charts/GroupedBarChart";

class ChartsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ScrollView>
        <GroupedBarChart />
      </ScrollView>
    );
  }
}

export default ChartsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
