import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListRow from "./ListRow";
import * as Actions from "../actions"; //Import your actions

class ListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      refreshing: false
    };
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.searchTerm){
        this.refs.listRef.scrollToOffset({x: 0, y: 0, animated: true})
    };
  }
  componentDidMount() {
    this.props.getData();
  }

  handleRefresh = () => {
    console.log("refreshing");
    this.setState({ refreshing: true });
    this.props.getData();
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "rgba(255,255,255, 0.1)"
        }}
      />
    );
  };

  _renderItem = ({ item }) => {
    return <ListRow item={item} navigation={this.props.navigation} />;
  };
  noItemDisplay = () => {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <Text style={{color: 'white'}}>No Results Returned</Text>
      </View>
    );
  };
  render() {
    
    return (
      <View style={styles.container}>
        <FlatList
          
          ref="listRef"
          data={this.props.cleared ? this.props.data : this.props.filteredData}
          renderItem={this._renderItem}
          extraData={this.state}
          keyExtractor={(item, index) => item.id}
          ListEmptyComponent={this.noItemDisplay}
          ItemSeparatorComponent={this.renderSeparator}
          onRefresh={this.handleRefresh}
          removeClippedSubviews={true}
          refreshing={this.props.refreshing}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
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
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  search: {
    elevation: 4
  },
  searchHeader: {
    backgroundColor: "#2D3037",
    padding: 20,
    //paddingTop: (Platform.OS === 'ios' ? 20 :  StatusBar.currentHeight + 10),
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%"
  },
  searchBar: {
    width: "100%"
  }
});

mapStateToProps = (state, props) => {
  return {
    ...props.navigation,
    loading: state.dataReducer.loading,
    data: state.dataReducer.data,
    refreshing: state.dataReducer.refreshing,
    searchTerm: state.dataReducer.searchTerm,
    cleared: state.dataReducer.cleared,
    filteredData: state.dataReducer.filteredData
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(ListContainer);
