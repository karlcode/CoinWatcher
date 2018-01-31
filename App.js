import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar, Easing, Animated } from 'react-native';
import { Button, Header, List, ListItem, SearchBar, Overlay } from 'react-native-elements';
import { TabNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import SecondScreen from './SecondScreen';


const AppRoot = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    SecondScreen: { 
      screen: SecondScreen,
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63',
    },
  }
);

export default AppRoot;
