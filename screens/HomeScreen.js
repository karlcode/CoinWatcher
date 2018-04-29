import { LinearGradient } from 'expo';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListRow from '../components/ListRow';
import SearchHeader from '../components/SearchHeader';
import * as Actions from '../actions'; //Import your actions

class HomeScreen extends React.PureComponent {
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};
    return {
      header: ( /* Your custom header */
        <View>
          <SearchHeader/>
        </View>
      )
    }
  }

  constructor(props){
    super(props);

    this.state = {
      error: null,
      refreshing: false,
      //searchTerm: ''
    };
  }

  componentDidMount(){
    this._setNavigationParams()
    this.props.getData(); 
  }

  handleRefresh = () => {
    console.log("refreshing")
    this.setState(
      {refreshing: true},
    );
    this.props.getData();  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "rgba(255,255,255, 0.1)",
        }}
      />
    );
  };

  _renderItem = ({item}) => {
    return (

      <ListRow item={item} navigation={this.props.navigation}/> 

    );
  }
  noItemDisplay = () => {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <Text>No Results Returned</Text>
      </View>
    );
  }

  //_onChangeText = (e) => {
   // this.setState({ searchTerm: e })
   // this.refs.listRef.scrollToOffset({x: 0, y: 0, animated: true})
  //}

  _setNavigationParams = () => {
    let search = 
                    <SearchBar 
                            round
                            onChangeText={this._onChangeText}
                            onClearText={this._onClearText}
                            placeholder='Search coin' 
                            clearIcon={{ type: 'font-awesome', name: 'cancel', style: {fontSize: 20} }}
                            containerStyle={styles.searchBar}
                            //inputStyle={{fontSize: 20, backgroundColor: '#E9EAE8', width: '85%'}}
                            />
    this.props.navigation.setParams({
      search
    })
  }

  render() {
    //const filtered = this.props.data.filter(createFilter(this.props.searchTerm, ['name', 'id', 'symbol']))
    return (
      <View style={styles.container}>
          {this.props.loading ? <ActivityIndicator size="large" color="white" /> : 
            <FlatList
            ref="listRef"
            //data={filtered.map(item => item)}
            data={this.props.cleared ? this.props.data : this.props.filteredData}
            //getItemLayout={(data, index) => ({length: 100, offset: 100 * index, index})}  this was the cause of slowdown since it dynamically resized each item
            renderItem={this._renderItem}
            extraData={this.state}
            keyExtractor={(item, index) => item.id}
            ListEmptyComponent={this.noItemDisplay}
            //extraData={filtered.filter(item => item)}
            ItemSeparatorComponent={this.renderSeparator}
            //ListHeaderComponent={this.renderHeader}
            //ListFooterComponent={this.renderFooter}
            onRefresh={this.handleRefresh}
            removeClippedSubviews={true}
            refreshing={this.props.refreshing}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
          /> 
          }
          
        <View pointerEvents="none" style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
          <LinearGradient style={{
            
            height: 150,
          }} 
          colors={[ 'rgba(0,0,0,0)', 'rgb(20,20,20)' ] } />
        </View>
     </View>
    );
  }
}

mapStateToProps = (state, props) => {
  return {
      loading: state.dataReducer.loading,
      data: state.dataReducer.data,
      refreshing: state.dataReducer.refreshing,
      searchTerm: state.dataReducer.searchTerm,
      cleared: state.dataReducer.cleared,
      filteredData: state.dataReducer.filteredData
  }
}

mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,1)',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  search: {
    elevation: 4,
  },
  searchHeader: {
    backgroundColor: '#2D3037',
    padding: 20,
    //paddingTop: (Platform.OS === 'ios' ? 20 :  StatusBar.currentHeight + 10),
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  searchBar: {
    width: '100%',
    
  }
});
