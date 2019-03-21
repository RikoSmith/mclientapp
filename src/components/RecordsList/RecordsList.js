import React, { Component } from "react";
import { FlatList, View } from "react-native";
import { ListItem, Card } from "react-native-elements";

var mainStyles = require("../../style/main");

export default class RecordsList extends Component {
  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => {
    if (item.mood == "stressed") {
      return (
        <ListItem
          title="Stressed"
          subtitle={item.date}
          titleStyle={{ color: "#ff3333" }}
          subtitleStyle={{ color: "#ff3333", fontSize: 10 }}
          bottomDivider={false}
          badge={
            item.feedback
              ? {
                  value: "Correct",
                  textStyle: { color: "#45D9CF", fontSize: 12 },
                  containerStyle: {
                    backgroundColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    borderColor: "#45D9CF"
                  }
                }
              : {
                  value: "Incorrect",
                  textStyle: { color: "#ff3333", fontSize: 12 },
                  containerStyle: {
                    backgroundColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    borderColor: "#ff3333"
                  }
                }
          }
          hideChevron={true}
        />
      );
    } else {
      return (
        <ListItem
          title="Not Stressed"
          subtitle={item.date}
          titleStyle={{ color: "#45D9CF" }}
          subtitleStyle={{ color: "#45D9CF", fontSize: 10 }}
          bottomDivider={false}
          badge={
            item.feedback
              ? {
                  value: "Correct",
                  textStyle: { color: "#45D9CF", fontSize: 12 },
                  containerStyle: {
                    backgroundColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    borderColor: "#45D9CF"
                  }
                }
              : {
                  value: "Incorrect",
                  textStyle: { color: "#ff3333", fontSize: 12 },
                  containerStyle: {
                    backgroundColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    borderColor: "#ff3333"
                  }
                }
          }
          hideChevron={true}
        />
      );
    }
  };

  render() {
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.props.fdataList}
        renderItem={this.renderItem}
      />
    );
  }
}
