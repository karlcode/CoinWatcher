import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar, TouchableHighlight } from 'react-native';
import { Button, Header, ListItem, SearchBar, Overlay } from 'react-native-elements';


export default class Search extends React.Component {
    constructor(props){
        super(props);

      }

    componentDidMount(){
        
        
    //this.grabPriceData()
    }
    handleChange(e){
        let text = e.toLowerCase();
        console.log(this.props)
    }

    render() {
        return(
        <SearchBar 
            onChangeText={this.handleChange} 
            round 
            placeholder='Search coin' 
            containerStyle={{width: '100%'}}/>
        )}
    }