import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar } from 'react-native';
import { Button, ButtonGroup, Header, List, ListItem, SearchBar, Overlay, Icon, Badge } from 'react-native-elements';
import ActionButton from 'react-native-circular-action-menu';

export default class App extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    const component1 = () => <View><Text>{params.percent_change_1h}%</Text>
                            <Badge containerStyle={{ backgroundColor: 'violet'}}>
                              <Text>Hour</Text>
                            </Badge></View>
    const component2 = () => <View><Text>{params.percent_change_24h}%</Text>
                            <Badge containerStyle={{ backgroundColor: 'violet'}}>
                              <Text>Day</Text>
                            </Badge></View>
    const component3 = () => <View><Text>{params.percent_change_7d}%</Text>
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
            <Text style={{fontSize: 30}}>
            #{params.rank}
            </Text>
          </View>
          <Text>
          <Text style={{fontSize: 55}}>
              ${params.price_usd} 
          </Text>
          <Text style={{fontSize: 30}}> USD </Text>
          </Text>
          <FlatList
            data={[{key: 'a'}, {key: 'b'}]}
            renderItem={({item}) => <Text>{item.key}</Text>
            
            }
            horizontal={true}
          />
          <Text style={{fontSize: 30}}>
              Market Capitalization: {params.market_cap_usd} USD
          </Text>
          <ButtonGroup
            buttons={buttons}
            containerStyle={{height: 100}}
          />
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
