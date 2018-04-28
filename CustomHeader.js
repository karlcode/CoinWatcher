import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar } from 'react-native';
import { Card, Button, Header, List, ListItem, SearchBar, Overlay, Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class CustomHeader extends React.Component {

  render(){
    return (
      <View style={styles.container}>
        <Ionicons name={'md-more'} size={30} style={{ alignSelf: 'flex-end'}} color='white'/>
        <Text style={{color: 'white', fontSize: 27, fontWeight: 'bold'}}>Portfolio</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D3037',
    padding: 20,
    paddingTop: (Platform.OS === 'ios' ? 20 :  StatusBar.currentHeight + 10),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
