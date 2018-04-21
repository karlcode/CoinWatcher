import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar, TouchableHighlight, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Header, ListItem, SearchBar, Overlay, Card } from 'react-native-elements';
import SearchInput, { createFilter } from 'react-native-search-filter';
import Search from './Search';
import CryptoIcon from 'react-native-crypto-icons';
import ListRow from './ListRow';
import { LargeList } from "react-native-largelist";

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
      renderData: [],
      noData: false,
      error: null,
      refreshing: false,
      searchTerm: ''
    };
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
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        }}
      />
    );
  };

  _renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
      <ListRow item={item} navigation={this.props.navigation}/> 
      </View>
      </TouchableWithoutFeedback>
    );
  }

  /*
  _onChangeText = (e) => {
    let text = e.toLowerCase()
    let filteredData = this.state.renderData.filter((item) => {
      return item.name.toLowerCase().match(text)
    })
    if (!text || text === '') {
      this.setState({
        noData: false,
        renderData: this.state.data
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
        renderData: filteredData,
      })
    }
  }
  _onClearText(){
    //let list = this.state.data;
    this.setState({
      noData: false,
      renderData: this.state.data
    })
  }*/
  _onChangeText = (e) => {
    this.setState({ searchTerm: e })
    this.refs.listRef.scrollToOffset({x: 0, y: 0, animated: true})
  }

  _setNavigationParams = () => {
    let search = <SearchBar 
                  lightTheme
                  round
                  onChangeText={this._onChangeText}
                  onClearText={this._onClearText}
                  placeholder='Search coin' 
                  clearIcon={{ type: 'font-awesome', name: 'clear' }}
                  containerStyle={styles.searchBar}
                  inputStyle={{fontSize: 20}}/>
    this.props.navigation.setParams({
      search
    })
  }

  render() {
    const filtered = this.props.data.filter(createFilter(this.state.searchTerm, ['name', 'id', 'symbol']))
    console.log("Rendered again");
    return (
      <View style={styles.container}>
          <FlatList
          ref="listRef"
          data={filtered.filter(item => item)}
          //data={this.state.renderData}
          //getItemLayout={(data, index) => ({length: 100, offset: 100 * index, index})}  this was the cause of slowdown since it dynamically resized each item
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.id}
          //extraData={filtered.filter(item => item)}
          ItemSeparatorComponent={this.renderSeparator}
          //ListHeaderComponent={this.renderHeader}
          //ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          removeClippedSubviews={false}
          refreshing={this.state.refreshing}
          initialNumToRender={10}
          maxToRenderPerBatch={50}
        /> 
     </View>
    );
  }
}
/*<FlatList
          ref="listRef"
          data={filtered.filter(item => item)}
          //getItemLayout={(data, index) => ({length: 100, offset: 100 * index, index})}  this was the cause of slowdown since it dynamically resized each item
          renderItem={this._renderItem}
          keyExtractor={item => item.id}
          extraData={this.state}
          ItemSeparatorComponent={this.renderSeparator}
          //ListHeaderComponent={this.renderHeader}
          //ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          removeClippedSubviews={false}
          refreshing={this.state.refreshing}
          initialNumToRender={50}
          maxToRenderPerBatch={50}
        /> */
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