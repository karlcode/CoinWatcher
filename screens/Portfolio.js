import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar } from 'react-native';
import { Card, Button, List, ListItem, SearchBar, Overlay, Icon } from 'react-native-elements';
import PortfolioContainer from '../components/PortfolioContainer'
import CustomHeader from '../components/CustomHeader'
export default class Portfolio extends React.Component {

  render() {
    return (
      <View style={styles.container}>
      <CustomHeader/>
        <PortfolioContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});