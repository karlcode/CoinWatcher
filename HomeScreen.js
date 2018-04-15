import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar, TouchableHighlight, VirtualizedList } from 'react-native';
import { Button, Header, ListItem, SearchBar, Overlay, Card } from 'react-native-elements';
import Search from './Search';
import CryptoIcon from 'react-native-crypto-icons';
import ListRow from './ListRow';


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
    //const url = `https://api.coinmarketcap.com/v1/ticker/?limit=0`;
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

  _renderItem = ({ item }) => {
    return (
      <ListRow item={item} navigation={this.props.navigation} /> 
    );
  }
  _onChangeText = (e) => {
    let text = e.toLowerCase()
    let filteredData = this.state.data.filter((item) => {
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
    } else if (Array.isArray(filteredData)) { //theres actually an array
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
                  lightTheme
                  onChangeText={this._onChangeText} 
                  onClearText={this._onClearText}
                  placeholder='Search coin' 
                  clearIcon={{ type: 'font-awesome', name: 'search' }}
                  containerStyle={styles.searchBar}
                  inputStyle={{fontSize: 20}}/>
    this.props.navigation.setParams({
      search
    })
  }

  render() {
    return (
      <View style={styles.container}>
          <FlatList
          ref="listRef"
          data={this.state.renderData}
          //getItemLayout={(data, index) => ({length: 100, offset: 100 * index, index})}  this was the cause of everything since it dynamically resized each item
          renderItem={this._renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          //ListHeaderComponent={this.renderHeader}
          //ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          removeClippedSubviews={false}
          refreshing={this.state.refreshing}
          initialNumToRender={50}
          maxToRenderPerBatch={50}
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
  searchBar: {
    width: '100%'
  }
});
