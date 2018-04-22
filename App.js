import React from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import Navigation from './Navigation';
import { Font } from 'expo';
export default class App extends React.Component {

  componentDidMount() {
    Font.loadAsync({
      'IBMPlexSans': require('./assets/fonts/IBMPlexSans-Regular.ttf'),
    });
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          translucent={true}
          backgroundColor="rgba(255, 255, 255, 0)"
          barStyle="light-content"
          
        />
        <Navigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'IBMPlexSans',
  },
  /*statusBar: {
    height: (Platform.OS === 'ios' ? 20 :  StatusBar.currentHeight),
    backgroundColor: 'white',
  },*/
});
