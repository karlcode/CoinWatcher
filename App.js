import React from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import Navigation from './Navigation';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Font, Constants } from 'expo';
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import rootReducer from './reducer'

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, applyMiddleware(thunk))
const persistor = persistStore(store)


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
      <PersistGate loading={null} persistor={persistor}>
      <View style={styles.container}>
         <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle="light-content"
          />
        <Navigation />
      </View>
      </PersistGate>
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
