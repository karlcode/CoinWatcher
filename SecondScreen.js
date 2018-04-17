import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar } from 'react-native';
import { Button, Header, List, ListItem, SearchBar, Overlay, Card, Icon } from 'react-native-elements';
import ActionButton from 'react-native-circular-action-menu';

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
      
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Icon name="g-translate" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
            <Icon name="g-translate" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Icon name="g-translate" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
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
    margin: 30,
    top: 40
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
