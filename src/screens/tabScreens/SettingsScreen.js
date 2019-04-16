import React, { Component } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  ActivityIndicator
} from "react-native";
import UserCard from "../../components/UserCard/UserCard";
import UserSettings from "../../components/UserSettings/UserSettings";
import { connect } from "react-redux";
import instance from "../../utils/axiosConf";

var mainStyles = require("../../style/main");

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      fetch: true,
      settings: null
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    instance
      .get("/user", {
        headers: {
          "x-access-token": this.props.token
        }
      })
      .then(res => {
        console.log(res.data.user);
        this.setState({
          data: res.data.user,
          fetch: false,
          settings: [
            {
              name: "Name",
              value: res.data.user.name + " " + res.data.user.lname,
              arrow: false
            },
            {
              name: "Username",
              value: res.data.user.uname,
              icon: ""
            },
            {
              name: "Gender",
              value: res.data.user.sex === "F" ? "Female" : "Male",
              icon: ""
            },
            {
              name: "Country",
              value: res.data.user.country,
              icon: ""
            },
            {
              name: "Log out",
              value: "Logged as " + res.data.user.uname,
              icon: ""
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return !this.state.fetch ? (
      <ScrollView style={mainStyles.scrollV}>
        <UserCard user={this.state.data} />
        <UserSettings settings={this.state.settings} />
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

export default connect(mapStateToProps)(SettingsScreen);
