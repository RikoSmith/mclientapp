import React, { Component } from "react";
import { ScrollView, Text, StyleSheet, RefreshControl } from "react-native";
import { Card } from "react-native-elements";
import GroupedBarChart from "../../components/Charts/GroupedBarChart";
import RecordsList from "../../components/RecordsList/RecordsList";
import instance from "../../utils/axiosConf";
import { connect } from "react-redux";

var mainStyles = require("../../style/main");

class ChartsScreen extends Component {
  state = {
    refreshing: true,
    data: null
  };

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    //console.log("Home screen pre-mount " + this.props.token);
    instance
      .get("/fdata10", {
        headers: {
          "x-access-token": this.props.token
        }
      })
      .then(response => {
        console.log(response.data);
        this.setState({ refreshing: false, data: response.data.fdataList });
      })
      .catch(err => {
        console.log(err);
      });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.componentDidMount();
  };

  render() {
    const { refreshing, data } = this.state;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        style={mainStyles.scrollV}
      >
        {/*<GroupedBarChart />*/}
        <Card title="Last Recordings">
          {refreshing ? (
            <Text>Loading...</Text>
          ) : (
            <RecordsList fdataList={data} />
          )}
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(ChartsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
