import React from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import Navigation from './Navigation';

const App = () => {
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  /*statusBar: {
    height: (Platform.OS === 'ios' ? 20 :  StatusBar.currentHeight),
    backgroundColor: 'white',
  },*/
});

export default App