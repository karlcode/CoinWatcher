import React from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import Navigation from './Navigation';
import { Font, Constants } from 'expo';
export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'IBMPlexSans': require('./assets/fonts/IBMPlexSans-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <Navigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: "#3B4044",
    height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  },
  /*statusBar: {
    height: (Platform.OS === 'ios' ? 20 :  StatusBar.currentHeight),
    backgroundColor: 'white',
  },*/
});
