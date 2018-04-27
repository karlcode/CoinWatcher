import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar } from 'react-native';
import { Card, Button, Header, List, ListItem, SearchBar, Overlay, Icon } from 'react-native-elements';
import PortfolioContainer from './PortfolioContainer'

export default class Portfolio extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <PortfolioContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
