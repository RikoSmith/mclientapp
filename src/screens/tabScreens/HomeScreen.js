import React, { Component } from "react";
import { ScrollView, Text, StyleSheet, Image, Dimensions } from "react-native";
import StatCard from "../../components/StatCard/StatCard";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ScrollView>
        <StatCard />
        <StatCard />
        <StatCard />
        <StatCard />
        <StatCard />
        <StatCard />
      </ScrollView>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({});
