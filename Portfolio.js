import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar } from 'react-native';
import { Card, Button, Header, List, ListItem, SearchBar, Overlay } from 'react-native-elements';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Card
        title='HELLO WORLD'>
        <Image style={{width: 200, height: 200}} source={{uri: 'https://pbs.twimg.com/profile_images/875443327835025408/ZvmtaSXW_400x400.jpg'}}/>
        <Text style={{marginBottom: 10}}>
            The idea with React Native Elements is more about component structure than actual design.
        </Text>
        <Button
            icon={{name: 'code'}}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW NOW' />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});