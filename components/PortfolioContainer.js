import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PortfolioRow from './PortfolioRow';
import * as Actions from '../actions'; //Import your actions

class PortfolioContainer extends React.Component {

  componentDidMount(){
    this.props.getPortfolio();
  }
  _renderItem = ({item}) => {
      return (
        <PortfolioRow item={item}/> 
      );
    }
  noItemDisplay = () => {
    return (
      <View style={[styles.container, styles.horizontal]}>
      </View>
    );
  };
  render(){
    return (
      <View style={styles.container}>
        <FlatList
            data={this.props.crypto.map(item => item)}
            extraData={this.props}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => item.id}
            ListEmptyComponent={this.noItemDisplay}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,1)",
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 10
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