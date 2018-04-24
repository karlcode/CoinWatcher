import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar } from 'react-native';
import { Button, ButtonGroup, Header, List, ListItem, SearchBar, Overlay, Icon, Badge } from 'react-native-elements';
import ActionButton from 'react-native-circular-action-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class App extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    const component1 = () => <View>{params.percent_change_1h < 0 ? 
                            <Text style={styles.negative}>{params.percent_change_1h}% <Ionicons name={'md-arrow-dropdown'} size={20} /></Text> : 
                            <Text style={styles.positive}> {params.percent_change_1h}% <Ionicons name={'md-arrow-dropup'} size={20} /></Text> }
                            <Badge containerStyle={{ backgroundColor: 'violet'}}>
                              <Text>Hour</Text>
                            </Badge></View>
    const component2 = () => <View>{params.percent_change_24h < 0 ? 
                            <Text style={styles.negative}>{params.percent_change_24h}% <Ionicons name={'md-arrow-dropdown'} size={20} /></Text> : 
                            <Text style={styles.positive}> {params.percent_change_24h}% <Ionicons name={'md-arrow-dropup'} size={20} /></Text> }
                            <Badge containerStyle={{ backgroundColor: 'violet'}}>
                              <Text>Day</Text>
                            </Badge></View>
    const component3 = () => <View>{params.percent_change_7d < 0 ? 
                            <Text style={styles.negative}>{params.percent_change_7d}% <Ionicons name={'md-arrow-dropdown'} size={20} /></Text> : 
                            <Text style={styles.positive}> {params.percent_change_7d}% <Ionicons name={'md-arrow-dropup'} size={20} /></Text> }
                            <Badge containerStyle={{ backgroundColor: 'violet', elevation: 10}}>
                              <Text>Week</Text>
                            </Badge></View>
    const { params } = this.props.navigation.state;
    const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
    return (
      <View style={styles.container}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[styles.title, { flex: 1 }]}>
              {params.name} 
            </Text>
            <Text style={{color: 'white',fontSize: 30}}>
            #{params.rank}
            </Text>
          </View>
          <Text>
          <Text style={{color: 'white',fontSize: 55}}>
              ${params.price_usd}
          </Text>
          <Text style={{color: 'white',fontSize: 30}}> USD </Text>
          </Text>
          <ButtonGroup
            buttons={buttons}
            containerStyle={{height: 100}}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={ { color: 'white',flex: 1 }}>
              Market Cap
            </Text>
            <Text style={{ color: 'white',fontWeight: 'bold' }}>
            ${params.market_cap_usd}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={ { color: 'white', flex: 1 }}>
              24hr Volume
            </Text>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
            ${params['24h_volume_usd']}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={ { color: 'white',flex: 1 }}>
              Available Supply
            </Text>
            <Text style={{ color: 'white',fontWeight: 'bold' }}>
            {params.available_supply}
            </Text>
          </View>
        <ActionButton buttonColor="rgba(231,76,60,1)" >
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
    color: 'white',
    
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 70,
    paddingLeft: 20,
    paddingRight: 20,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  positive: {
    color: '#3CBD61',
    fontSize: 18,
  },
  negative: {
    color: '#FF5E5E',
    fontSize: 18,
  },
});
