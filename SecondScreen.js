import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar } from 'react-native';
import { Button, Header, List, ListItem, SearchBar, Overlay, Card } from 'react-native-elements';


export default class App extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
    
  }
  componentDidMount(){
    this.props = {
      ...this.props,
      ...this.props.navigation.state.params
      
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Card
          title={this.props.symbol}>
          <Text style={{marginBottom: 10}}>
              
          </Text>
          <Text style={{marginBottom: 10}}>
              
          </Text>
          
        </Card>
        <Button
        onPress={()=> Alert.alert('Send props to Portfolio.js i.e map out list of new items. Change this button to greyed out') }
        backgroundColor='#84C24D'
        large
        icon={{name: 'done'}}
        title='Add' />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
