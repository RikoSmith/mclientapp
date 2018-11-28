import React, { Component } from "react";
import { ScrollView, Text, StyleSheet, Image, Dimensions } from "react-native";
import StatCard from "../../components/StatCard/StatCard";
import HomeTile from "../../components/HomeTile/HomeTile";
import { connect } from "react-redux";
import instance from "../../utils/axiosConf";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hbeat: 0,
      weight: 0,
      todos: 0,
      mood: "None"
    };
  }

  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    console.log("Home screen pre-mount " + this.props.token);
    instance
      .get("/fdata", {
        headers: {
          "x-access-token": this.props.token
        }
      })
      .then(response => {
        console.log(response);
        console.log(
          response.data.hbeat +
            " " +
            response.data.weight +
            " " +
            response.data.todos +
            " " +
            response.data.mood
        );
        this.setState({
          hbeat: response.data.fdata.hbeat,
          mood: response.data.fdata.mood,
          weight: response.data.fdata.weight,
          todos: response.data.fdata.todos
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <ScrollView>
        <HomeTile />
        <StatCard
          bIconName="fitness"
          bIconColor="#ff9500"
          title="Weight"
          value={this.state.weight + "KG"}
          iconName="refresh"
          text="Updated now"
        />
        <StatCard
          bIconName="happy"
          bIconColor="#87cb16"
          title="Mood"
          value={this.state.mood}
          iconName="calendar"
          text="Last day"
        />
        <StatCard
          bIconName="pulse"
          bIconColor="#ff4a55"
          title="Heartbeat"
          value={this.state.hbeat + "BPM"}
          iconName="time"
          text="In the last hour"
        />
        <StatCard
          bIconName="calendar"
          bIconColor="#1dc7ea"
          title="TO DO Items"
          value={this.state.todos + " items"}
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
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({});
