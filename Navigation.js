import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar, Easing, Animated } from 'react-native';
import { Button, Header, List, ListItem, SearchBar, Overlay, Icon } from 'react-native-elements';
import { TabNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import SecondScreen from './SecondScreen';
import HomeNavigation from './HomeNavigation';

const Navigation = TabNavigator(
  {
    Home: {
      screen: HomeNavigation,
      navigationOptions: {
      tabBarLabel: <Icon
      name='home' />
      }
    },
    SecondScreen: { 
      screen: SecondScreen,
      navigationOptions: {
      tabBarLabel: <Icon
      name='insert-chart' />
      }
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: 'pink',
      style: {
        backgroundColor: 'white',
        elevation: 10,
      },
      indicatorStyle: {
        backgroundColor: 'pink'
      }
    },
  }
);

export default Navigation