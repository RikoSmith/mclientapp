import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-elements";

class StartScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../media/images/bg.jpg")}
        />
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={require("../media/images/logo_new.png")}
        />
        <Button
          large
          title="LOGIN"
          buttonStyle={{
            backgroundColor: "#9dcaec",
            width: 300
          }}
          textStyle={{
            fontSize: 22,
            alignSelf: "center",
            color: "#fff"
          }}
          onPress={() => this.props.navigation.navigate("LoginScreen")}
        />
        <Button
          large
          title="SIGN UP"
          buttonStyle={{
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#9dcaec",
            borderWidth: 1.0,
            width: 300,
            marginTop: 20
          }}
          textStyle={{
            fontSize: 22,
            alignSelf: "center",
            color: "#9dcaec"
          }}
          onPress={() => this.props.navigation.navigate("SignUpScreen")}
        />
      </View>
    );
  }
}

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000"
  },
  image: {
    position: "absolute",
    zIndex: -9999,
    opacity: 0.75
  },
  logo: {
    width: 300
  }
});
