import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card, Divider, Tile } from "react-native-elements";
import Icon from "react-native-ionicons";

var mainStyles = require("../../style/main");

export default class HomeTile extends Component {
  render() {
    return (
      <View>
        <Tile
          height={200}
          imageSrc={require("../../media/images/bgtile.png")}
          title="Lorem ipsum dolor sit amet, consectetur adipisicing elit"
          featured
          caption="Tap here for more information"
          style={mainStyles.tileHome}
        />
      </View>
    );
  }
}
