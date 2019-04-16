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
          subtitle={item.date + "+6"}
          titleStyle={{ color: "#ff6a6a" }}
          subtitleStyle={{ color: "#ff6a6a", fontSize: 10 }}
          bottomDivider={false}
          /*badge={
            item.feedback
              ? {
                  value: "Correct",
                  textStyle: { color: "#75b7e9", fontSize: 12 },
                  containerStyle: {
                    backgroundColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    borderColor: "#75b7e9"
                  }
                }
              : {
                  value: "Incorrect",
                  textStyle: { color: "#ff6a6a", fontSize: 12 },
                  containerStyle: {
                    backgroundColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    borderColor: "#ff6a6a"
                  }
                }
          }*/
          hideChevron={true}
        />
      );
    } else {
      return (
        <ListItem
          title="Not Stressed"
          subtitle={item.date + "+6"}
          titleStyle={{ color: "#75b7e9" }}
          subtitleStyle={{ color: "#75b7e9", fontSize: 10 }}
          bottomDivider={false}
          /*badge={
            item.feedback
              ? {
                  value: "Correct",
                  textStyle: { color: "#75b7e9", fontSize: 12 },
                  containerStyle: {
                    backgroundColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    borderColor: "#75b7e9"
                  }
                }
              : {
                  value: "Incorrect",
                  textStyle: { color: "#ff6a6a", fontSize: 12 },
                  containerStyle: {
                    backgroundColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    borderColor: "#ff6a6a"
                  }
                }
          }*/
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
