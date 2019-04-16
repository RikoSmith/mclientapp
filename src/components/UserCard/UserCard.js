import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Card, Divider } from "react-native-elements";
import Icon from "react-native-ionicons";

var mainStyles = require("../../style/main");

export default class StatCard extends Component {
  render() {
    console.log("User Props: ");
    console.log(this.props.user);
    return (
      <View>
        <Card containerStyle={mainStyles.userCard}>
          <View style={mainStyles.userBackground} />
          <View style={mainStyles.userContent}>
            <Image
              style={mainStyles.userAvatar}
              source={
                this.props.user.sex === "F"
                  ? {
                      uri:
                        "https://banner2.kisspng.com/20180403/eqe/kisspng-computer-icons-teacher-clip-art-avatar-5ac3db46122e89.4817606315227850940745.jpg"
                    }
                  : {
                      uri:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbabgK14inJEq8e7T8cqvzS5YXlIWvyI6l32IailNs0NNXpsPU6g"
                    }
              }
            />
            <Text style={mainStyles.userName}>
              {this.props.user.name + " " + this.props.user.lname}
            </Text>
            <Text style={mainStyles.userLogin}>
              {"@" + this.props.user.uname}
            </Text>
            <Text style={mainStyles.userQuote}>{this.props.user.quote}</Text>
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
