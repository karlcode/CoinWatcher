import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar } from 'react-native';
import { Card, Button, Header, List, ListItem, SearchBar, Overlay, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import PortfolioContainer from './PortfolioContainer'
import {bindActionCreators} from 'redux';
import * as Actions from './actions'; //Import your actions

class Portfolio extends React.Component {
  componentDidMount() {
    this.props.getData(); //call our action
}
  render() {
    console.log(this.props.data);
    return (
      <View style={styles.container}>
        <PortfolioContainer />
      </View>
    );
  }
}
function mapStateToProps(state, props) {
  return {
      loading: state.dataReducer.loading,
      data: state.dataReducer.data
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
