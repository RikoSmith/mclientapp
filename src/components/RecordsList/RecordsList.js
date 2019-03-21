import React, { Component } from "react";
import { FlatList } from "react-native";
import { ListItem, Card } from "react-native-elements";

var mainStyles = require("../../style/main");

export default class RecordsList extends Component {
  fdataList = [
    {
      date: "12:30",
      mood: "stressed"
    },
    {
      date: "12:45",
      mood: "not_stressed"
    },
    {
      date: "13:36",
      mood: "not_stressed"
    },
    {
      date: "13:45",
      mood: "not_stressed"
    },
    {
      date: "13:60",
      mood: "stressed"
    },
    {
      date: "14:06",
      mood: "not_stressed"
    },
    {
      date: "14:26",
      mood: "stressed"
    },
    {
      date: "14:45",
      mood: "not_stressed"
    },
    {
      date: "14:58",
      mood: "not_stressed"
    },
    {
      date: "15:20",
      mood: "stressed"
    }
  ];

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => {
    if (item.mood == "stressed") {
      return (
        <ListItem
          title="Stressed"
          subtitle={item.date}
          titleStyle={{ color: "#ff3333" }}
          subtitleStyle={{ color: "#ff3333" }}
          bottomDivider={false}
        />
      );
    } else {
      return (
        <ListItem
          title="Not Stressed"
          subtitle={item.date}
          titleStyle={{ color: "#45D9CF" }}
          subtitleStyle={{ color: "#45D9CF" }}
          bottomDivider={false}
        />
      );
    }
  };

  render() {
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.fdataList}
        renderItem={this.renderItem}
      />
    );
  }
}
