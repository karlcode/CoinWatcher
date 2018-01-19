import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList } from 'react-native';
import { Button, Header,List, ListItem } from 'react-native-elements';


export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: [],
      page: 1,
      seed: 1,
      loading: false
    }
  }

  componentDidMount(){
    this.makeRemoteRequest()
    console.log(this.state)
  }

  makeRemoteRequest = () => {
    const {seed, page} = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    fetch(url)
    .then(res => res.json())
    .then(res => {
      this.setState({data: res.results})
      
    })
    .catch(error => {
      this.setState({error, loading: false});
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={()=>{Alert.alert("asd")}}
          raised
          icon={{name: 'home', size: 20}}
          buttonStyle={{backgroundColor: 'pink', borderRadius: 10}}
          textStyle={{textAlign: 'center'}}
          title={`Welcome to\nReact Native Elements`}
        />
        
        <Image
          source={{uri: 'https://i.chzbgr.com/full/7345954048/h7E2C65F9/'}}
          style={{width: 320, height:180}}
        />
        
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
