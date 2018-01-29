import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar, Easing, Animated } from 'react-native';
import { Button, Header, List, ListItem, SearchBar, Overlay } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import SecondScreen from './SecondScreen';


const AppRoot = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      
    },
    SecondScreen: { 
      screen: SecondScreen,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.name}`,
      })
    },
  },
  {
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        console.log(sceneProps)
        const { layout, position, scene } = sceneProps;
        const { index } = scene;
 
        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });
 
        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });
 
        return { opacity, transform: [{ translateY }] };
      },
    }),
  }
  
);

export default AppRoot;
