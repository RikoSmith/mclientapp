import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Button, Card } from "react-native-elements";
import instance from "../utils/axiosConf";
import { Base64 } from "js-base64";
import { connect } from "react-redux";

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = { username: "rikosmith", password: "asdasd" };
  }

  changeName = text => {
    this.setState({ username: text });
  };

  changePass = pw => {
    this.setState({ password: pw });
  };

  onLoginPress = () => {
    //this.props.navigation.navigate("HomeTabNavigator");
    console.log(this.state.username + ":" + this.state.password);
    const code2 = Base64.encode(
      this.state.username + ":" + this.state.password
    );
    console.log(code2);
    instance
      .post(
        "/login",
        {},
        {
          headers: {
            Authorization: "Basic " + code2,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )
      .then(response => {
        console.log(this.props.token);
        console.log(response);
        this.props.onLogin(response.data.token);
        this.props.navigation.navigate("HomeTabNavigator");
        console.log(this.props.token);
        console.log(this.props);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log("Rendering");
    return (
      <View style={styles.container}>
        <TextInput
          style={{
            height: 60,
            backgroundColor: "#fff",
            borderColor: "rgba(255,255,255, 0.3)",
            borderWidth: 1,
            minWidth: 300,
            fontSize: 16
          }}
          onChangeText={username => this.changeName(username)}
          value={this.state.username}
        />
        <TextInput
          secureTextEntry={true}
          style={{
            height: 60,
            backgroundColor: "#fff",
            borderColor: "rgba(255,255,255, 0.3)",
            borderWidth: 1,
            minWidth: 300,
            fontSize: 16,
            marginTop: 10
          }}
          onChangeText={password => this.changePass(password)}
          value={this.state.password}
        />
        <Button
          buttonStyle={{
            marginTop: 15,
            backgroundColor: "#45D9CF",
            borderColor: "rgba(255,255,255,0.75)",
            borderWidth: 1,
            width: 200
          }}
          textStyle={{
            color: "rgba(255,255,255,.75)",
            fontSize: 18
          }}
          title="Submit"
          onPress={() => this.onLoginPress()}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    token: state.token,
    navigation: props.navigation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: token => dispatch({ type: "LOG_IN", token }),
    onSuccess: fdata => dispatch({ type: "GET_FDATA", fdata })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#45D9CF"
  }
});
