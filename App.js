import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar } from 'react-native';
import { Button, Header, List, ListItem, SearchBar, Overlay } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import SecondScreen from './SecondScreen';


const AppRoot = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      
    },
    SecondScreen: { screen: SecondScreen,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.name}`,
      })
    },
  },
  {
    cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    }
  }
);

export default AppRoot;
