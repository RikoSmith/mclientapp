import React, { Component } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import Notifications from "../../components/Notifications/Notifications";
import { Card } from "react-native-elements";

const nots = [
  {
    name: "Seen notification",
    value: "8 October, 03:45PM"
  },
  {
    name: "Seen notification",
    value: "8 October, 03:45PM"
  },
  {
    name: "Seen notification",
    value: "8 October, 03:45PM"
  },
  {
    name: "Seen notification",
    value: "8 October, 03:45PM"
  },
  {
    name: "Seen notification",
    value: "8 October, 03:45PM"
  },
  {
    name: "Seen notification",
    value: "8 October, 03:45PM"
  },
  {
    name: "Seen notification",
    value: "8 October, 03:45PM"
  },
  {
    name: "Seen notification",
    value: "8 October, 03:45PM"
  },
  {
    name: "Seen notification",
    value: "8 October, 03:45PM"
  }
];

const notsNew = [
  {
    name: "New notification",
    value: "8 October, 03:45PM"
  },
  {
    name: "New notification",
    value: "8 October, 03:45PM"
  },
  {
    name: "New notification",
    value: "8 October, 03:45PM"
  },
  {
    name: "New notification",
    value: "8 October, 03:45PM"
  }
];

class NotificationsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ScrollView>
        <Card>
          <Text>New</Text>
          <Notifications list={notsNew} />
          <Text>Seen</Text>
          <Notifications list={nots} />
        </Card>
      </ScrollView>
    );
  }
}

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
