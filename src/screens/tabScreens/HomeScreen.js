import React, { Component } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import StatCard from "../../components/StatCard/StatCard";
import HomeTile from "../../components/HomeTile/HomeTile";
import RecCard from "../../components/RecCard/RecCard";
import { connect } from "react-redux";
import instance from "../../utils/axiosConf";
import { PermissionsAndroid } from "react-native";
import AudioRecord from "react-native-audio-record";
var RNFS = require("react-native-fs");

var mainStyles = require("../../style/main");

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: 0,
      mood: "None",
      mood_text: "None",
      recording: false,
      passed: false,
      name: "User",
      week_str: 0,
      week_nstr: 0,
      day_str: 0,
      day_nstr: 0,
      home_text: "",
      refreshing: true
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    //console.log("Home screen pre-mount " + this.props.token);
    instance
      .get("/fdata", {
        headers: {
          "x-access-token": this.props.token
        }
      })
      .then(response_parent => {
        console.log(response_parent.data);
        instance
          .get("/user", {
            headers: {
              "x-access-token": this.props.token
            }
          })
          .then(res_child => {
            console.log(res_child.data);
            this.setState({
              mood: response_parent.data.fdata.mood,
              mood_text: response_parent.data.fdata.mood_text,
              weight: response_parent.data.fdata.weight,
              week_nstr: response_parent.data.fdata.udata_week_nstr,
              week_str: response_parent.data.fdata.udata_week_str,
              day_nstr: response_parent.data.fdata.udata_day_nstr,
              day_str: response_parent.data.fdata.udata_day_str,
              name: res_child.data.user.name,
              refreshing: false
            });
            if (this.state.mood === "stressed") {
              this.setState({
                home_text:
                  "Hi, " +
                  this.state.name +
                  ". Looks like you are a little bit stressed"
              });
            } else {
              this.setState({
                home_text:
                  "Hi, " +
                  this.state.name +
                  ". Looks like you are having a good day ;)"
              });
            }
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.componentDidMount();
  };

  render() {
    return !this.state.refreshing ? (
      <ScrollView
        style={mainStyles.scrollV}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <HomeTile text={this.state.home_text} onPress={() => this._onRefresh} />
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
          value={this.state.mood_text}
          iconName="microphone"
          text="Last recorded"
        />
        <StatCard
          bIconName="calendar"
          bIconColor="#ff4a55"
          title="Weekly Stats"
          value={this.state.week_nstr + "/" + this.state.week_str}
          iconName="time"
          text="In the last 7 days"
        />
        <StatCard
          bIconName="sunny"
          bIconColor="#1dc7ea"
          title="Daily Stats"
          value={this.state.day_nstr + "/" + this.state.day_str}
          iconName="time"
          text="Today"
        />
      </ScrollView>
    ) : (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#9dcaec" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(HomeScreen);
