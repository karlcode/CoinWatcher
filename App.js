import React from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { Button, Header,List, ListItem } from 'react-native-elements';
const list = [
  {
    title: 'Appointments',
    icon: 'av-timer'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff',
    subtitle: 'Vice Chairman'
  },
  {
    title: 'Trips',
    icon: 'rowing',
    subtitle: 'Vice Chairman'
  },
]
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <List>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{name: item.icon}}
              />
            ))
          }
        </List>
        <Image
          source={{uri: 'https://i.chzbgr.com/full/7345954048/h7E2C65F9/'}}
          style={{width: 320, height:180}}
        />
        <Button
          onPress={()=>{Alert.alert("asd")}}
          raised
          icon={{name: 'home', size: 20}}
          buttonStyle={{backgroundColor: 'pink', borderRadius: 10}}
          textStyle={{textAlign: 'center'}}
          title={`Welcome to\nReact Native Elements`}
        />
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
