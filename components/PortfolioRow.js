import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { Button, Header, ListItem, SearchBar, Overlay, Card } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class PortfolioRow extends React.PureComponent { 
  render(){
    const { item } = this.props;
    return(
      <TouchableOpacity 
        onPress={() => this.props.navigation.navigate({key: 'SecondScreen', routeName: 'SecondScreen', params: ({...item})})}>
          
        <ListItem
        scaleProps={{
          friction: 90,
          tension: 100,
          activeScale: 0.95,
        }}
        //onPress={() => navigate('SecondScreen', ({...item}))}
        roundAvatar
        rightIcon={<View style={styles.right}>
                    <Text style={styles.title}> ${item.price_usd}</Text>
                    {item.percent_change_24h < 0 ? 
                    <Text style={styles.negative}>{Number(item.percent_change_24h).toFixed(2)}% <Ionicons name={'md-arrow-dropdown'} size={15} /></Text> : 
                    <Text style={styles.positive}> {Number(item.percent_change_24h).toFixed(2)}% <Ionicons name={'md-arrow-dropup'} size={15} /></Text> }
                    
                    </View>}
        title={<View style={styles.left}> 
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={{color: 'grey'}}>{item.symbol}</Text>
                    </View>}
        /*containerStyle={{ borderBottomWidth: 0, borderBottomLeftRadius: 10, borderTopRightRadius: 10, marginRight:15,
          marginLeft:15,
          marginTop:7,
          marginBottom:7,
          
          elevation: 2,
          backgroundColor:'rgb(255,255,255)', }}*/
          containerStyle={{ borderBottomWidth: 0, marginLeft: 10, marginRight: 10, marginTop:5, marginBottom:5,  }}
        />
    </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  left: {
    flex: 1,
    alignItems: 'flex-start', 
  },
  right: {
    flex: 1,
    alignItems: 'flex-end', 
  },
  symbol: {
    color: 'red',
    borderRadius: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
  },
  positive: {
    color: '#3CBD61',
  },
  negative: {
    color: '#FF5E5E',
  },
});

