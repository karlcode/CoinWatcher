import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar, ToastAndroid } from 'react-native';
import { Button, ButtonGroup,Card, Header, List, ListItem, SearchBar, Overlay, Icon, Badge } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-circular-action-menu';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions'; //Import your actions
import CoinChart from '../components/CoinChart'
import { iOSUIKit, human } from "react-native-typography";

class SecondScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeParams: {key: 'daily', period: 'minute', limit: '48&aggregate=30'},
      selectedIndex: 1
    };
    this.updateIndex = this.updateIndex.bind(this)
  }
  componentDidMount(){
    this.props.getChartData(this.props.navigation.state.params.symbol, this.state.timeParams)
    console.log("called");
  }
  
  onBadgePress = (item) => {
    console.log(item);
    //switch(key){
      //case 'Hour': this.setState({timeParams: {key: 'hourly', period: 'minute', limit: '60'}})
      //case 'Day': this.setState({timeParams: {key: 'daily', period: 'minute', limit: '48&aggregate=30'}})
      //case 'Week': this.setState({timeParams: {key: 'weekly', period: 'hour', limit: '168'}})
  }
  updateIndex (selectedIndex) {
    this.setState({selectedIndex}, () => {
      if(this.state.selectedIndex === 0){
        this.props.getChartData(this.props.navigation.state.params.symbol, {key: 'hourly', period: 'minute', limit: '60'})
      } else if(this.state.selectedIndex === 1){
        this.props.getChartData(this.props.navigation.state.params.symbol, {key: 'daily', period: 'minute', limit: '48&aggregate=30'})
      } else this.props.getChartData(this.props.navigation.state.params.symbol, {key: 'weekly', period: 'hour', limit: '168'})
    })
    
    
  }
  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    const coin = this.props.data.find((item) => item.id == params.id)
    const component1 = () => <View>
                              <Badge 
                              containerStyle={[this.state.selectedIndex == 0 ? { backgroundColor: 'white', } :{ backgroundColor: 'grey' }  ]}>
                                  <Text>Hourly</Text>
                                </Badge>
                              {coin.percent_change_1h < 0 ? 
                                <Text style={styles.negative}>{coin.percent_change_1h}% <Ionicons name={'md-arrow-dropdown'} size={20} /></Text> : 
                                <Text style={styles.positive}> {coin.percent_change_1h}% <Ionicons name={'md-arrow-dropup'} size={20} /></Text> }
                              </View>
    const component2 = () => <View>
                              <Badge 
                              containerStyle={[this.state.selectedIndex == 1 ? { backgroundColor: 'white' } :{ backgroundColor: 'grey' }]}>
                                  <Text>Daily</Text>
                                </Badge>
                              {coin.percent_change_24h < 0 ? 
                                <Text style={styles.negative}>{coin.percent_change_24h}% <Ionicons name={'md-arrow-dropdown'} size={20} /></Text> : 
                                <Text style={styles.positive}> {coin.percent_change_24h}% <Ionicons name={'md-arrow-dropup'} size={20} /></Text> }
                              </View>
    const component3 = () => <View>
                              <Badge 
                              containerStyle={[this.state.selectedIndex == 2 ? { backgroundColor: 'white' } :{ backgroundColor: 'grey' }]}>
                                  <Text>Weekly</Text>
                                </Badge>
                              {coin.percent_change_7d < 0 ? 
                                <Text style={styles.negative}>{coin.percent_change_7d}% <Ionicons name={'md-arrow-dropdown'} size={20} /></Text> : 
                                <Text style={styles.positive}> {coin.percent_change_7d}% <Ionicons name={'md-arrow-dropup'} size={20} /></Text> }
                              </View>
    const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
    return (
      <View style={styles.container}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[iOSUIKit.largeTitleEmphasized, { flex: 1, color: 'white' }]}>
              {coin.name} 
            </Text>
            <Text style={[human.headline, { color: 'white' }]}>
            #{coin.rank}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[human.largeTitle, {color: 'white'}]}>
                ${coin.price_usd < 1 ? Number(coin.price_usd).toFixed(4) : Number(coin.price_usd).toFixed(2)}
            </Text>
            <Text style={[human.headline, { color: 'white', alignSelf: 'center' }]}> USD </Text>
          </View>
          <CoinChart data={this.props.chartData}/>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={this.state.selectedIndex}
              buttons={buttons}
              underlayColor='black'
              innerBorderStyle={{color: 'black', backgroundColor: 'black'}}
              selectedButtonStyle={{backgroundColor: 'black'}}
              containerStyle={{height: 60, flex: 1, backgroundColor: 'transparent', borderColor: 'transparent'}}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20 }}>
            <Text
              style={ [human.footnote, { color: 'grey',flex: 1 }]}>
              Market Cap
            </Text>
            <Text style={{ color: 'white',fontWeight: 'bold' }}>
            ${Number(coin.market_cap_usd).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={ [human.footnote, { color: 'grey',flex: 1 }]}>
              24hr Volume
            </Text>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
            ${Number(coin['24h_volume_usd']).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={ [human.footnote, { color: 'grey',flex: 1 }]}>
              Available Supply
            </Text>
            <Text style={{ color: 'white',fontWeight: 'bold' }}>
            {Number(coin.available_supply).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
          </View>
          {coin.added ? null : <ActionButton buttonColor="rgba(231,76,60,1)"  
          onPress={()=> {this.props.addCoin(params.id)
            ToastAndroid.show(`Added new ${params.id} coin`, ToastAndroid.SHORT)
            navigate('Portfolio')}}/>}
      </View>
    );
  }
}
mapStateToProps = (state, props) => {
  return {
      data: state.dataReducer.data,
      chartData: state.dataReducer.chartData,
      isFetching: state.dataReducer.isFetching
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
