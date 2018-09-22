import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class StartScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Log in"
          onPress={() => this.props.navigation.navigate('LoginScreen')}
        />
        <Button
          title="Sign up"
          onPress={() => this.props.navigation.navigate('SignUpScreen')}
        />
      </View>
    );
  }
}

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
