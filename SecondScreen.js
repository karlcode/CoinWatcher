import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar } from 'react-native';
import { Button, Header, List, ListItem, SearchBar, Overlay, Card } from 'react-native-elements';


export default class App extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
    
  }
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
          <Text style={styles.title}>
              {params.name} 
          </Text>
          <Text style={{fontSize: 30}}>
              ${params.price_usd} USD 
          </Text>
          <Text style={{fontSize: 30}}>
              ฿{params.price_btc} BTC
          </Text>
          <Text style={{marginBottom: 10}}>
              Rank:#{params.rank} //put this at top corner or sth
          </Text>

          <Text style={{marginBottom: 10}}>
              {params.percent_change_1h}%(1h)
          </Text>
          <Text style={{marginBottom: 10}}>
              {params.percent_change_24h}%(24h)
          </Text>
          <Text style={{marginBottom: 10}}>
              {params.percent_change_7d}%(7d)
          </Text>

        <Text style={{marginBottom: 10}}>
              Graph here or something with market cap{params.market_cap_usd} USD
          </Text>
          
        <Button
        onPress={()=> Alert.alert('Send props to Portfolio.js i.e map out list of new items. Change this button to greyed out') }
        backgroundColor='#84C24D'
        large
        icon={{name: 'done'}}
        title='Add' />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',  
  },
  container: {
    flex: 1,
    margin: 20

  },
  
});
