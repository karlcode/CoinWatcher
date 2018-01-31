import React from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { Navigation } from './Navigation';

const App = () => {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar}>
          <StatusBar
            backgroundColor={'transparent'}
            translucent
          />
        </View>
        <Navigation />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: (Platform.OS === 'ios' ? 20 :  StatusBar.currentHeight),
    backgroundColor: 'white',
  },
});

export default App