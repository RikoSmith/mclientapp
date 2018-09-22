import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class NotificationsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>NotificationsScreen</Text>
      </View>
    );
  }
}

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
