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
import { LineChart, Grid, StackedBarChart } from 'react-native-svg-charts'
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";

export default class CoinChart extends React.Component {
    render() {
        console.log(this.props.data);
        const data = [{time: 1524182400, close: 0.3019, high: 0.3102, low: 0.2668, open: 0.2692},
            {time: 1524268800, close: 0.2852, high: 0.3075, low: 0.2681, open: 0.302} ]
        return (
            <View>
                {this.props.data.Data ? 
                <LineChart
                style={{ height: 300 }}
                data={ this.props.data.Data}
                yAccessor={({ item }) => item.close}
                xAccessor={({item}) => item.time}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 20, bottom: 20 }}
            >
                <Grid/>
            </LineChart> : null}
                
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
    },
  title: {
    flex: 1,
    color: "white",
    paddingLeft: 10
  }
});
