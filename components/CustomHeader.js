import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar } from 'react-native';
import { Card, Button, Header, List, ListItem, SearchBar, Overlay, Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { iOSUIKit } from 'react-native-typography'

export default class CustomHeader extends React.Component {

  render(){
    return (
      <View style={styles.container}>
        <Ionicons name={'md-more'} size={20} style={{ alignSelf: 'flex-end'}} color='transparent'/>
        <Text style={[iOSUIKit.largeTitleEmphasized, styles.title]}>Portfolio</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D3037',
    padding: 20,
    paddingTop: (Platform.OS === 'ios' ? 20 :  StatusBar.currentHeight),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
