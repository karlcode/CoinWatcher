import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabBarBottom, TabNavigator } from 'react-navigation';
import HomeNavigation from './HomeNavigation';
import Portfolio from '../screens/Portfolio';
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
          iconName = `ios-search${focused ? '' : '-outline'}`;
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
    lazy:true,
    tabBarComponent: TabBarBottom,
    removeClippedSubviews: false,
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#FA2474',                               
      inactiveTintColor: 'white',
      style: {
        elevation: 0,
        backgroundColor: 'rgb(20,20,20)',
        borderTopColor: "transparent"
      },
    },
  }
);

export default Navigation