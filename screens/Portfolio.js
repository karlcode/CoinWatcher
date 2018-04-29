import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar } from 'react-native';
import { Card, Button, List, ListItem, SearchBar, Overlay, Icon } from 'react-native-elements';
import PortfolioContainer from '../components/PortfolioContainer'
import CustomHeader from '../components/CustomHeader'
import { LinearGradient } from 'expo';
export default class Portfolio extends React.Component {

  render() {
    return (
      <View style={styles.container}>
      <CustomHeader/>
        <PortfolioContainer />
        <View pointerEvents="none" style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
          <LinearGradient style={{
            
            height: 150,
          }} 
          colors={[ 'rgba(0,0,0,0)', 'rgb(20,20,20)' ] } />
        </View>
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
