import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Card, Divider, ListItem } from "react-native-elements";
import Icon from "react-native-ionicons";

var mainStyles = require("../../style/main");

const settings = [
  {
    name: "Amy Farha",
    value: "Vice President"
  },
  {
    name: "Chris Jackson",
    value: "Vice Chairman"
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
              rightIcon={<Icon name="arrow-dropright" />}
            />
          ))}
        </Card>
      </View>
    );
  }
}
