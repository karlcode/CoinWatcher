import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar, TouchableHighlight } from 'react-native';
import { Button, Header, ListItem, SearchBar, Overlay, Card } from 'react-native-elements';
import Search from './Search';


export default class App extends React.Component {
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};
    return {
      title: 'Ranking',
      headerTitle: params.search,
      headerTitleStyle: {
        alignSelf: 'center',
      }
    }
  }

  constructor(props){
    super(props);

    this.state = {
      loading: false,
      data: [],
      renderData: [],
      noData: false,
      error: null,
      refreshing: false
    };
  }

  componentDidMount(){
    this.makeRemoteRequest()
    this._setNavigationParams()
  }

  makeRemoteRequest = () => {
    const url = `https://api.coinmarketcap.com/v1/ticker/?limit=0`;
    //const url = `https://min-api.cryptocompare.com/data/`;
    fetch(url)
    .then(res => res.json())
    .then(res => {
      this.setState({data: res, renderData: res, refreshing: false})
    })
    .catch(error => {
      this.setState({error, loading: false});
    })
  }

  handleRefresh = () => {
    console.log("refreshing")
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme showLoading round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;
  
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" 
        onChangeText={(text) => this.SearchFilterFunction(text)}
        />
      </View>
    );
  };

  _renderItem = ({ item }) => {
    return (
          <ListItem
            onPress={() => this.props.navigation.navigate('SecondScreen', ({name: item.name, symbol: item.symbol}))}
            roundAvatar
            rightIcon={item.percent_change_24h < 0 ? <Text style={styles.negative}>{item.percent_change_24h}%(24h)</Text> : <Text style={styles.positive}> +{item.percent_change_24h}%(24h)</Text> }
            title={`${item.symbol} ${item.name}`}
            subtitle={`$${item.price_usd} `}
            containerStyle={{ borderBottomWidth: 0 }}
          />
    );
  }
  _onChangeText = (e) => {
    let text = e.toLowerCase()
    let list = this.state.data;
    let filteredData = list.filter((item) => {
      return item.name.toLowerCase().match(text)
    })
    if (!text || text === '') {
      this.setState({
        noData: false,
        renderData: list
      })
    } else if (!Array.isArray(filteredData) && !filteredData.length) {
      // set no data flag to true so as to render flatlist conditionally
      this.setState({
        noData: true
      })
    } else if (Array.isArray(filteredData)) {
      //scroll to top method
      this.refs.listRef.scrollToOffset({x: 0, y: 0, animated: true})
      this.setState({
        noData: false,
        renderData: filteredData
      })
    }
  }
  _onClearText(){
    let list = this.state.data;
    this.setState({
      noData: false,
      renderData: list
    })
  }
  _setNavigationParams = () => {
    let search = <SearchBar 
                  onChangeText={this._onChangeText} 
                  onClearText={this._onClearText}
                  round 
                  placeholder='Search coin' 
                  containerStyle={{width: '100%'}}/>
    this.props.navigation.setParams({
      search
    })
  }

  render() {
    return (
      <View style={styles.container} >
          <FlatList
          ref="listRef"
          data={this.state.renderData}
          getItemLayout={(data, index) => (
            {length: 100, offset: 100 * index, index}
          )}
          renderItem={this._renderItem}
          keyExtractor={item => item.name}
          ItemSeparatorComponent={this.renderSeparator}
          //ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
        /> 
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
  search: {
    elevation: 4,
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: '#FF0000',
  },
});
