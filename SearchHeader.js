import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar } from 'react-native';
import { Card, Button, Header, List, ListItem, SearchBar, Overlay, Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from './actions'; //Import your actions

class SearchHeader extends React.Component {

  render(){
    return (
      <View style={styles.container}>
        <Ionicons name={'md-more'} size={30} style={{ alignSelf: 'flex-end'}} color='white'/>
        <Text style={{color: 'white', fontSize: 27, fontWeight: 'bold', paddingLeft: 10}}>Search</Text>
        <SearchBar 
                            round
                            onChangeText={(e)=> {this.props.searchTerm(e)}}
                            onClearText={()=> {this.props.clearSearch()}}
                            placeholder='Search coin' 
                            clearIcon={{ type: 'font-awesome', name: 'cancel', style: {fontSize: 18} }}
                            containerStyle={styles.searchBar}
                            inputStyle={{backgroundColor: '#282828'}}
                            />
      </View>
    );
  }
}
mapStateToProps = (state, props) => {
    return {
        loading: state.dataReducer.loading,
        data: state.dataReducer.data,
    }
  }
  
  mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Actions, dispatch);
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(SearchHeader);


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D3037',
    padding: 10,
    paddingTop: (Platform.OS === 'ios' ? 20 :  StatusBar.currentHeight),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  searchBar: {
      width: '100%',
      backgroundColor: '#2D3037',
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent'
  }
});
