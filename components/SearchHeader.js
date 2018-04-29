import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SearchBar } from "react-native-elements";
import ModalDropdown from "react-native-modal-dropdown";
import { iOSUIKit } from "react-native-typography";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions"; //Import your actions

class SearchHeader extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Ionicons
          name={"md-more"}
          size={30}
          style={{ alignSelf: "flex-end" }}
          color="white"
        />
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <Text style={[iOSUIKit.largeTitleEmphasized, styles.title]}>
            Search
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.dropDown && this.dropDown.show();
            }}
          >
            <View
              style={{
                paddingRight: 10,
                flexDirection: "row",
                alignSelf: "flex-end"
              }}
            >
              <ModalDropdown
                ref={el => {
                  this.dropDown = el;
                }}
                options={["%1h", "%24h", "%7d"]}
                defaultIndex={parseInt(this.props.timePeriod)}
                defaultValue={this.props.timeCategory}
                textStyle={{
                  fontWeight: "bold",
                  textAlign: "right",
                  color: "white"
                }}
                adjustFrame={style => {
                  //console.log(`frameStyle={width:${style.width}, height:${style.height}, top:${style.top}, left:${style.left}, right:${style.right}}`)
                  style.top -= 50;
                  style.left += 150;
                  style.right -= 20;
                  return style;
                }}
                dropdownStyle={{ width: 50, height: "auto" }}
                onSelect={(idx, category) => {
                  this.props.changePeriod(idx);
                }}
              />
              <Text style={{ alignSelf: "flex-end" }}>
                {" "}
                <Ionicons name={"md-arrow-dropdown"} color="white" size={20} />
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <SearchBar
          round
          onChangeText={e => {
            this.props.searchTerm(e);
          }}
          onClearText={() => {
            this.props.clearSearch();
          }}
          placeholder="Search coin"
          clearIcon={{
            type: "font-awesome",
            name: "cancel",
            style: { fontSize: 18 }
          }}
          containerStyle={styles.searchBar}
          inputStyle={{ backgroundColor: "#282828" }}
        />
      </View>
    );
  }
}
mapStateToProps = (state, props) => {
  return {
    loading: state.dataReducer.loading,
    data: state.dataReducer.data,
    timePeriod: state.dataReducer.timePeriod,
    timeCategory: state.dataReducer.timeCategory
  };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchHeader);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2D3037",
    padding: 10,
    paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  title: {
    flex: 1,
    color: "white",
    paddingLeft: 10
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  searchBar: {
    width: "100%",
    backgroundColor: "#2D3037",
    borderBottomColor: "transparent",
    borderTopColor: "transparent"
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
