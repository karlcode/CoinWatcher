import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar, Easing, Animated } from 'react-native';
import { Button, Header, List, ListItem, SearchBar, Overlay, Icon } from 'react-native-elements';
import { StackNavigator, HeaderBackButton } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SecondScreen from '../screens/SecondScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
const HomeNavigation = StackNavigator({
  Home: { 
    screen: HomeScreen,
    
  },
  SecondScreen: { 
    screen: SecondScreen, 
    navigationOptions: ({navigation}) => ({
      tabBarVisible: false, //godlike line
      headerTintColor: 'white',
      headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 }
      //title: `${navigation.state.params.name}`,
    }),
  },
},
{
  cardStyle: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  }
})

export default HomeNavigation;