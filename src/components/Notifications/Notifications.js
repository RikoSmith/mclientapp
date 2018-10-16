import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card, ListItem } from "react-native-elements";
import Icon from "react-native-ionicons";

var mainStyles = require("../../style/main");

export default class Notifications extends Component {
  render() {
    return (
      <View>
        {this.props.list.map((n, i) => (
          <ListItem
            containerStyle={mainStyles.notsItem}
            key={i}
            leftIcon={<Icon name="notifications" style={mainStyles.notsIcon} />}
            title={n.name}
            subtitle={n.value}
            rightIcon={<Icon name={n.icon} />}
          />
        ))}
      </View>
    );
  }
}
