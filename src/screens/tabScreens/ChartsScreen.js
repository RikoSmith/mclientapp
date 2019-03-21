import React, { Component } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import GroupedBarChart from "../../components/Charts/GroupedBarChart";
import RecordsList from "../../components/RecordsList/RecordsList";

export default class ChartsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  /*componentDidMount() {
    //console.log("Home screen pre-mount " + this.props.token);
    instance
      .get("/fdata", {
        headers: {
          "x-access-token": this.props.token
        }
      })
      .then(response => {
        this.setState({
          hbeat: response.data.fdata.hbeat,
          mood: response.data.fdata.mood,
          weight: response.data.fdata.weight,
          todos: response.data.fdata.todos
        });
      })
      .catch(err => {
        console.log(err);
      });
  }*/

  render() {
    return (
      <ScrollView>
        <GroupedBarChart />
        <Card title="Last Recordings">
          <RecordsList />
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
