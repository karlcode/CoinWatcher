import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: 'https://i.chzbgr.com/full/7345954048/h7E2C65F9/'}}
          style={{width: 320, height:180}}
        />
        <Text>Open up App.js to start working on your map!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Button
          onPress={() => {
          Alert.alert('You tapped the button!');
          }}
          title="Press Me"
        />
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
