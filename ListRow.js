import React from 'react';
import { StyleSheet, Text, View, Image, Alert, FlatList, Platform, StatusBar, TouchableHighlight } from 'react-native';
import { Button, Header, ListItem, SearchBar, Overlay, Card } from 'react-native-elements';

const ListRow = (props) => {
    const { navigate } = props.navigation;
    const { item } = props;
    return(
        <ListItem
        onPress={() => navigate('SecondScreen', ({...item}))}
        roundAvatar
        rightIcon={<View style={styles.right}>
                    {item.percent_change_24h < 0 ? <Text style={styles.negative}>{item.percent_change_24h}%(24h)</Text> : <Text style={styles.positive}> +{item.percent_change_24h}%(24h)</Text> }
                    <Text> ${item.price_usd}</Text>
                    </View>}
        title={<View style={styles.left}> 
                    <Text style={styles.title}>{item.name}</Text>
                    <Text >{item.symbol}</Text>
                    </View>}
        containerStyle={{ borderBottomWidth: 0 }}
        />
    )
}
const styles = StyleSheet.create({
  left: {
    flex: 1,
    alignItems: 'flex-start', 
  },
  right: {
    flex: 1,
    alignItems: 'flex-end', 
  },
  symbol: {
    color: 'red',
    borderRadius: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  },
  positive: {
    color: '#3CBD61',
    fontSize: 18,
  },
  negative: {
    color: '#FF2100',
    fontSize: 18,
  },
});

export default ListRow