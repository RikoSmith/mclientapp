import React, { Component } from "react";
import { ScrollView, Text, StyleSheet, Image, Dimensions } from "react-native";
import StatCard from "../../components/StatCard/StatCard";
import HomeTile from "../../components/HomeTile/HomeTile";
import { connect } from "react-redux";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ScrollView>
        <HomeTile />
        <StatCard
          bIconName="fitness"
          bIconColor="#ff9500"
          title="Weight"
          value={this.props.user.fdata.weight + "KG"}
          iconName="refresh"
          text="Updated now"
        />
        <StatCard
          bIconName="happy"
          bIconColor="#87cb16"
          title="Mood"
          value={this.props.user.fdata.mood}
          iconName="calendar"
          text="Last day"
        />
        <StatCard
          bIconName="pulse"
          bIconColor="#ff4a55"
          title="Heartbeat"
          value={this.props.user.fdata.hbeat + "BPM"}
          iconName="time"
          text="In the last hour"
        />
        <StatCard
          bIconName="calendar"
          bIconColor="#1dc7ea"
          title="TO DO Items"
          value={this.props.user.fdata.todos + " items"}
          iconName="refresh"
          text="Updated now"
        />
        <StatCard />
        <StatCard />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({});
