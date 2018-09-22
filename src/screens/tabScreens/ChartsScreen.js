import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ChartsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>ChartsScreen</Text>
      </View>
    );
  }
}

export default ChartsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
