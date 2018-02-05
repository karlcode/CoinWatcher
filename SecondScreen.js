import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar } from 'react-native';
import { Button, Header, List, ListItem, SearchBar, Overlay, Card } from 'react-native-elements';


export default class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      usdPrice: '',
      btcPrice: ''
    }
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
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${this.props.symbol}&tsyms=BTC,USD,EUR`
    fetch(url)
    .then(res => res.json())
    .then(res =>{
      console.log(res)
      this.setState({
        usdPrice: '$' + res.USD,
        btcPrice: res.BTC + ' BTC',

      })}
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Card
          title={this.props.symbol}>
          <Text style={{marginBottom: 10}}>
              {this.state.usdPrice}
          </Text>
          <Text style={{marginBottom: 10}}>
              {this.state.btcPrice}
          </Text>
          
        </Card>
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
