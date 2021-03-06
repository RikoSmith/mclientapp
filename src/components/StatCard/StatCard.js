import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card, Divider } from "react-native-elements";
import Icon from "react-native-ionicons";

let mainStyles = require("../../style/main");

class StatCard extends Component {
  render() {
    cardBigIcon = {
      fontSize: 50,
      position: "absolute",
      left: 30,
      color: this.props.bIconColor
    };
    if (this.props.bIconColor) {
      cardBigIcon.color = this.props.bIconColor;
    }
    return (
      <View>
        <Card containerStyle={mainStyles.card}>
          <Icon
            name={this.props.bIconName ? this.props.bIconName : "help-circle"}
            style={cardBigIcon}
          />
          <Text style={mainStyles.cardTitle}>
            {this.props.title ? this.props.title : "Title"}
          </Text>
          <Text style={mainStyles.cardValue}>
            {this.props.value ? this.props.value : "Value"}
          </Text>
          <Divider style={mainStyles.cardDivider} />
          <View style={mainStyles.cardBottom}>
            <Icon
              name={this.props.iconName ? this.props.iconName : "help-circle"}
              style={mainStyles.cardIcon}
            />
            <Text style={mainStyles.cardSmallText}>
              {this.props.text ? this.props.text : "Description"}
            </Text>
          </View>
        </Card>
      </View>
    );
  }
}

export default StatCard;
