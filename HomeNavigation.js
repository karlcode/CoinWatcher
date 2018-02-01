import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar, Easing, Animated } from 'react-native';
import { Button, Header, List, ListItem, SearchBar, Overlay, Icon } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import SecondScreen from './SecondScreen';

const HomeNavigation = StackNavigator({
  Home: { 
    screen: HomeScreen,
    navigationOptions: {
      title: 'SearchBarHere',
      headerTitleStyle: {
        alignSelf: 'center',
      }
    },
  },
  Chat: { 
    screen: SecondScreen, 
    navigationOptions: {
      title: 'Wee',
    },
  },
},
{
  
})

export default HomeNavigation;