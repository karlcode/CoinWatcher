import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar, TouchableHighlight } from 'react-native';
import { Button, Header, ListItem, SearchBar, Overlay } from 'react-native-elements';



export default class App extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false
    };
  }

  componentDidMount(){
    this.makeRemoteRequest()
    console.log(this.state)
  }

  makeRemoteRequest = () => {
    const url = `https://api.coinmarketcap.com/v1/ticker/`;
    //const url = `https://min-api.cryptocompare.com/data/`;
    fetch(url)
    .then(res => res.json())
    .then(res => {
      this.setState({data: res, refreshing: false})
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
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <TouchableHighlight  onPress={() => this.props.navigation.navigate('SecondScreen', ({name: item.symbol}))}>
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
  }
});
