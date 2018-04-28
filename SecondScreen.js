import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar, ToastAndroid } from 'react-native';
import { Button, ButtonGroup,Card, Header, List, ListItem, SearchBar, Overlay, Icon, Badge } from 'react-native-elements';
import ActionButton from 'react-native-circular-action-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';


import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from './actions'; //Import your actions




class SecondScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      added: false,
    };
  }

  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    const data = [{key: 'Hour', value: params.percent_change_1h}, {key: 'Day', value: params.percent_change_24h}, {key: 'Week', value: params.percent_change_7d}]
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
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          {
              data.map((item) => {
                return (
                  <Card key={item.key} containerStyle={{backgroundColor: 'transparent', borderColor: 'transparent' , margin: 15, padding: 0}}>
                  <View>
                  <Badge containerStyle={{ backgroundColor: 'white', }}>
                      <Text>{item.key}</Text>
                    </Badge>
                  {item.value < 0 ? 
                    <Text style={styles.negative}>{item.value}% <Ionicons name={'md-arrow-dropdown'} size={20} /></Text> : 
                    <Text style={styles.positive}> {item.value}% <Ionicons name={'md-arrow-dropup'} size={20} /></Text> }
                  </View>
                  </Card>
                );
              })
            }
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={ { color: 'white',flex: 1 }}>
              Market Cap
            </Text>
            <Text style={{ color: 'white',fontWeight: 'bold' }}>
            ${Number(params.market_cap_usd).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={ { color: 'white', flex: 1 }}>
              24hr Volume
            </Text>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
            ${Number(params['24h_volume_usd']).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={ { color: 'white',flex: 1 }}>
              Available Supply
            </Text>
            <Text style={{ color: 'white',fontWeight: 'bold' }}>
            {Number(params.available_supply).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
          </View>
          {params.added ? null : <ActionButton buttonColor="rgba(231,76,60,1)"  
          onPress={()=> {this.props.addCoin(params.id)
            ToastAndroid.show(`Added new ${params.id} coin`, ToastAndroid.SHORT)
            navigate('Portfolio')}}/>}
      </View>
    );
  }
}
mapStateToProps = (state, props) => {
  return {
      loading: state.dataReducer.loading,
      data: state.dataReducer.data,
      crypto: state.dataReducer.crypto
  }
}

mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondScreen);


const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    height: 100,
  },
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
