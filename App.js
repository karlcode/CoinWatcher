import React from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import Navigation from './Navigation';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Font, Constants } from 'expo';

import reducer from './reducer'


const store = createStore(reducer)

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
      <Provider store={store}>
      <View style={styles.container}>
         <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle="light-content"
          />
        <Navigation />
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  /*statusBar: {
    height: (Platform.OS === 'ios' ? 20 :  StatusBar.currentHeight),
    backgroundColor: 'white',
  },*/
});
