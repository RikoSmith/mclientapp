import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = { username: 'Username', password: '123456' };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{
            height: 60,
            backgroundColor: '#fff',
            borderColor: 'rgba(255,255,255, 0.3)',
            borderWidth: 1,
            minWidth: 300,
            fontSize: 16
          }}
          onChangeText={text => this.setState({ username })}
          value={this.state.username}
        />
        <TextInput
          secureTextEntry={true}
          style={{
            height: 60,
            backgroundColor: '#fff',
            borderColor: 'rgba(255,255,255, 0.3)',
            borderWidth: 1,
            minWidth: 300,
            fontSize: 16,
            marginTop: 10
          }}
          onChangeText={text => this.setState({ password })}
          value={this.state.password}
        />
        <Button
          buttonStyle={{
            marginTop: 15,
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(255,255,255,0.75)',
            borderWidth: 1,
            width: 200
          }}
          textStyle={{
            color: '#fff',
            fontSize: 18
          }}
          title="Submit"
          onPress={() => this.props.navigation.navigate('HomeTabNavigator')}
        />
      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#45D9CF'
  }
});
