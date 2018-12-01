import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card, Divider, Tile } from "react-native-elements";
import Icon from "react-native-ionicons";

var mainStyles = require("../../style/main");

export default class RecCard extends Component {
  render() {
    return (
      <Card style={mainStyles.recBody}>
        <View>
          <Text>Bla lba</Text>
        </View>
      </Card>
    );
  }
}
