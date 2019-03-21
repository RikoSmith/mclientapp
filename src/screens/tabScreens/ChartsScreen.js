import React, { Component } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import GroupedBarChart from "../../components/Charts/GroupedBarChart";
import RecordsList from "../../components/RecordsList/RecordsList";
import instance from "../../utils/axiosConf";
import { connect } from "react-redux";

class ChartsScreen extends Component {
  state = {
    loading: true,
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
        console.log(response);
        this.setState({ loading: false, data: response.data.fdataList });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { loading, data } = this.state;
    return (
      <ScrollView>
        <GroupedBarChart />
        <Card title="Last Recordings">
          {loading ? <Text>Loading...</Text> : <RecordsList fdataList={data} />}
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
