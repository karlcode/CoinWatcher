import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar, TouchableHighlight } from 'react-native';
import { Button, Header, ListItem, SearchBar, Overlay, Card } from 'react-native-elements';

export default class ListRow extends React.Component {
    constructor(props){
        super(props);

      }

    render() {
        const { navigate } = this.props.navigation;
        const { item } = this.props;
        return(
            <ListItem
            onPress={() => navigate('SecondScreen', ({...item}))}
            roundAvatar
            leftIcon={<Button style={styles.symbol} title={item.symbol}/>}
            rightIcon={item.percent_change_24h < 0 ? <Text style={styles.negative}>{item.percent_change_24h}%(24h)</Text> : <Text style={styles.positive}> +{item.percent_change_24h}%(24h)</Text> }
            title={<Text style={styles.title}>{item.name}</Text>}
            subtitle={`$${item.price_usd} `}
            containerStyle={{ borderBottomWidth: 0 }}
          />
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

