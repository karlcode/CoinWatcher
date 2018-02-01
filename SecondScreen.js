import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar } from 'react-native';
import { Button, Header, List, ListItem, SearchBar, Overlay } from 'react-native-elements';


export default class App extends React.Component {
  render() {
    const {navigation: {state: {params}}} = this.props
    return (
      <View style={styles.container}>
        <Button
          backgroundColor='red'
          large
          icon={{name: 'squirrel', type: 'octicon', buttonStyle: styles.someButtonStyle }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
