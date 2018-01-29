import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar, TouchableHighlight, ListView } from 'react-native';
import { Button, Header, List, ListItem, SearchBar, Overlay } from 'react-native-elements';



export default class App extends React.Component {
  static navigationOptions= ({ navigation }) => ({
    title: 'Home'
  })
  constructor(props){
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (prevRow, nextRow) => prevRow !== nextRow})
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount(){
    this.makeRemoteRequest()
    console.log(this.state)
  }

  makeRemoteRequest = () => {
    const {seed, page} = this.state;
    const url = `https://api.coinmarketcap.com/v1/ticker/`;
    fetch(url)
    .then(res => res.json())
    .then(res => {
      this.setState({data: this.ds.cloneWithRows(res), refreshing: false})
      console.log(this.ds.getRowAndSectionCount())
    })
    .catch(error => {
      this.setState({error, loading: false});
    })
  }
  handleRefresh = () => {
    console.log("refreshing")
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
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
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme showLoading round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;
  
  searchFilterFunction = (text) => {
     
      const newData = this.arrayholder.filter(function(item){
          const itemData = item.fruit_name.toUpperCase()
          const textData = text.toUpperCase()
          return itemData.indexOf(textData) > -1
      })
      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newData),
          text: text
      })
  } 
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

  render() {
    return (
      <View style={styles.container}>

        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <TouchableHighlight activteOpacity='0.1' underlayColor='rgba(0, 0, 0, 1, 0.6)' onPress={() => this.props.navigation.navigate('SecondScreen', ({name: item.symbol}))}>
                <View>
                <ListItem
                  
                  roundAvatar
                  title={`${item.symbol} ${item.name}`}
                  subtitle={`$${item.price_usd}`}
                  containerStyle={{ borderBottomWidth: 0 }}
                />
                </View>
              </TouchableHighlight>
            )}
            keyExtractor={item => item.name}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}

          />
        </List>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
