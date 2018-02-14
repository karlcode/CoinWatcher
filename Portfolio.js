import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar } from 'react-native';
import { Card, Button, Header, List, ListItem, SearchBar, Overlay, Icon } from 'react-native-elements';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Card
        title='No Coins Added Yet'>
        <Icon
            name='star'
            type='evilicon'
            color='#517fa4'
            size={200}
            />
        <Text style={{marginBottom: 10}}>
            If none, render a card saying nothing here with an ANIMATED SVG; else render Flatlist of items
        </Text>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
