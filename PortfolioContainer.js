import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar } from 'react-native';
import { Card, Button, Header, List, ListItem, SearchBar, Overlay, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Portfolio from './Portfolio';
import ListRow from './ListRow';
import {bindActionCreators} from 'redux';
import * as Actions from './actions'; //Import your actions

class PortfolioContainer extends React.Component {
  constructor(props) {
    super(props);

  }
  componentDidMount(){
    this.props.getPortfolio();
  }
  _renderItem = ({item}) => {
      return (
        //<ListRow item={item} navigation={this.props.navigation}/> 
        <Text>{item.name}</Text>
      );
    }
  render(){
    console.log(this.props.crypto);
    return (
      <View style={styles.container}>
        <FlatList
            data={this.props.crypto.map(item => item)}
            extraData={this.props}
            renderItem={this._renderItem}
        />
        <Text>Its lit</Text>
      </View>
    );
  }
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

mapStateToProps = (state, props) => {
  return {
      loading: state.dataReducer.loading,
      data: state.dataReducer.data,
      crypto: state.dataReducer.crypto
  }
}

mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);