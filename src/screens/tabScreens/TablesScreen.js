import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class TablesScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>TablesScreen</Text>
      </View>
    );
  }
}

export default TablesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
