import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Card, Divider, ListItem } from "react-native-elements";
import Icon from "react-native-ionicons";

var mainStyles = require("../../style/main");

const settings = [
  {
    name: "Name",
    value: "Johanna Smith",
    arrow: false
  },
  {
    name: "Username",
    value: "johannasmith",
    icon: ""
  },
  {
    name: "Gender",
    value: "Woman",
    icon: ""
  },
  {
    name: "Country",
    value: "Kazakshtan",
    icon: "arrow-dropright"
  },
  {
    name: "Log out",
    value: "Logged as johannasmith",
    icon: ""
  }
];

export default class UserSettings extends Component {
  render() {
    return (
      <View>
        <Card containerStyle={mainStyles.userCard}>
          {settings.map((l, i) => (
            <ListItem
              key={i}
              title={l.name}
              subtitle={l.value}
              rightIcon={<Icon name={l.icon} />}
            />
          ))}
        </Card>
      </View>
    );
  }
}
