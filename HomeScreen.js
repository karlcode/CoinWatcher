import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar } from 'react-native';
import { Button, Header, List, ListItem, SearchBar, Overlay } from 'react-native-elements';
import {StackNavigator} from 'react-navigation';


export default class App extends React.Component {
  static navigationOptions= ({ navigation }) => ({
    title: 'Home'
  })
  constructor(props){
    super(props);

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
      console.log(res)
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
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },

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
    return <SearchBar placeholder="Type Here..." lightTheme round />;
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
        <ActivityIndicator animating size="large" />
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
              <View>
                <ListItem
                  onPress={() => this.props.navigation.navigate('SecondScreen', ({name: item.symbol}))}
                  roundAvatar
                  title={`${item.symbol} ${item.name}`}
                  subtitle={`$${item.price_usd}`}
                  containerStyle={{ borderBottomWidth: 0 }}
                />
              </View>
            )}
            keyExtractor={item => item.name}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={50}
          />
        </List>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
