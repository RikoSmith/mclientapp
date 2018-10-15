import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Card, Divider } from "react-native-elements";
import Icon from "react-native-ionicons";

var mainStyles = require("../../style/main");

export default class StatCard extends Component {
  render() {
    return (
      <View>
        <Card containerStyle={mainStyles.userCard}>
          <View style={mainStyles.userBackground} />
          <View style={mainStyles.userContent}>
            <Image
              style={mainStyles.userAvatar}
              source={{
                uri:
                  "https://banner2.kisspng.com/20180403/eqe/kisspng-computer-icons-teacher-clip-art-avatar-5ac3db46122e89.4817606315227850940745.jpg"
              }}
            />
            <Text style={mainStyles.userName}>Johanna Smith</Text>
            <Text style={mainStyles.userLogin}>@johannasmith</Text>
            <Text style={mainStyles.userQuote}>
              "Lorem ipsum dolor sit amet"
            </Text>
            <Divider />
            <View style={mainStyles.userSocial}>
              <Icon name="logo-facebook" />
              <Icon name="logo-twitter" />
              <Icon name="logo-linkedin" />
              <Icon name="logo-instagram" />
            </View>
          </View>
        </Card>
      </View>
    );
  }
}
