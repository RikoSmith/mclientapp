import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Card, Button } from 'react-native-elements';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Card title="Heartbeat" containerStyle={styles.card}>
          <View>
            <Image style={styles.image} resizeMode="cover" />
            <Text style={styles.name}>Riko</Text>
          </View>
        </Card>
        <Card title="Calories" containerStyle={styles.card}>
          <View>
            <Image style={styles.image} resizeMode="cover" />
            <Text style={styles.name}>Riko</Text>
          </View>
        </Card>
        <Card title="Some other info" containerStyle={styles.card}>
          <View>
            <Image style={styles.image} resizeMode="cover" />
            <Text style={styles.name}>Riko</Text>
          </View>
        </Card>
        <Card title="Another mHealth info" containerStyle={styles.card}>
          <View>
            <Image style={styles.image} resizeMode="cover" />
            <Text style={styles.name}>Riko</Text>
          </View>
        </Card>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    width: width - 10
  }
});
