import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar } from 'react-native';
import { Card, Button, Header, List, ListItem, SearchBar, Overlay, Icon } from 'react-native-elements';
import { connect } from 'react-redux';



function mapStateToProps(state, props) { //receives new props whenever state data gets updated
  console.log(state);
  console.log(props);
  return {
        crypto: state.dataReducer.crypto
  }
}

const PortfolioContainer = ({ crypto }) => {
    _renderItem = ({item}) => {
        return (
    
          <Text>{item}</Text>
    
        );
      }
    return (
      <View style={styles.container}>
        <FlatList
            data={crypto}
            renderItem={this._renderItem}
        />
        <Text>Its lit</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default connect(mapStateToProps)(PortfolioContainer);