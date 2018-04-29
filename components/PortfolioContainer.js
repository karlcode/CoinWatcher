import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PortfolioRow from './PortfolioRow';
import * as Actions from '../actions'; //Import your actions

class PortfolioContainer extends React.Component {
  constructor(props) {
    super(props);

  }
  componentDidMount(){
    this.props.getPortfolio();
  }
  _renderItem = ({item}) => {
      return (
        <PortfolioRow item={item}/> 
      );
    }
  render(){
    return (
      <View style={styles.container}>
        <FlatList
            data={this.props.crypto.map(item => item)}
            extraData={this.props}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => item.id}
        />
        <Text>Its lit</Text>
      </View>
    );
  }
}
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