import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar, Easing, Animated } from 'react-native';
import { Button, Header, List, ListItem, SearchBar, Overlay, Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import HomeScreen from './HomeScreen';
import Portfolio from './Portfolio';
import SecondScreen from './SecondScreen';
import HomeNavigation from './HomeNavigation';
import {  LinearGradient } from 'expo';
const Navigation = TabNavigator(
  {
    Home: {
      screen: HomeNavigation,
    },
    Portfolio: { 
      screen: Portfolio,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Portfolio') {
          iconName = `ios-briefcase${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarComponent: TabBarBottom,
    removeClippedSubviews: false,
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'tomato',                               
      inactiveTintColor: 'gray',
      style: {
        elevation: 0,
        backgroundColor: 'rgba(255,255,255,1)',
        borderTopColor: "transparent"
      },
    },
  }
);

export default Navigation