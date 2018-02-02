import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar } from 'react-native';
import { Button, Header, List, ListItem, SearchBar, Overlay } from 'react-native-elements';


export default class App extends React.Component {
  constructor(props){
    super(props);

  }
  componentDidMount(){
    this.props = {
      ...this.props,
      ...this.props.navigation.state.params
      
    }
    this.grabPriceData()
  }
  componentWillReceiveProps(nextProps){
    
  }
  grabPriceData(){
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${this.props.name}&tsyms=BTC,USD,EUR`
    fetch(url)
    .then(res => res.json())
    .then(res => console.log(res))
  }
  render() {
    return (
      <View style={styles.container}>
        <Button
        backgroundColor='#84C24D'
        large
        icon={{name: 'done'}}
        title='Add' />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
