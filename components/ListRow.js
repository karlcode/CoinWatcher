import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { iOSUIKit } from 'react-native-typography';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions'; //Import your actions

class ListRow extends React.PureComponent { 
  
  render(){
    const { navigate } = this.props.navigation;
    const { item, filtered } = this.props;

    return(
      <TouchableOpacity 
          onPress={() => navigate({key: 'SecondScreen', routeName: 'SecondScreen', params: ({...item})})}>
        <ListItem
        scaleProps={{
          friction: 90,
          tension: 100,
          activeScale: 0.95,
        }}
        //onPress={() => navigate('SecondScreen', ({...item}))}
        roundAvatar
        rightIcon={<View style={styles.right}>
                    <Text style={[iOSUIKit.subhead, styles.title]}> ${item.price_usd}</Text>
                    {item[this.props.period] < 0 ? 
                    <Text style={styles.negative}>{Number(item[this.props.period]).toFixed(2)}% <Ionicons name={'md-arrow-dropdown'} size={15} /></Text> : 
                    <Text style={styles.positive}> {Number(item[this.props.period]).toFixed(2)}% <Ionicons name={'md-arrow-dropup'} size={15} /></Text> }
                    
                    </View>}
        title={<View style={styles.left}> 
                    <Text style={[iOSUIKit.bodyEmphasized, styles.title]}>{item.name}</Text>
                    <Text style={{color: 'grey'}}>{item.symbol}</Text>
                    </View>}
        /*containerStyle={{ borderBottomWidth: 0, borderBottomLeftRadius: 10, borderTopRightRadius: 10, marginRight:15,
          marginLeft:15,
          marginTop:7,
          marginBottom:7,
          
          elevation: 2,
          backgroundColor:'rgb(255,255,255)', }}*/
          containerStyle={{ borderBottomWidth: 0, marginLeft: 10, marginRight: 10, marginTop:5, marginBottom:5,  }}
        />
    </TouchableOpacity>
    )
  }
}

mapStateToProps = (state, props) => {
  return {
      loading: state.dataReducer.loading,
      data: state.dataReducer.data,
      period: state.dataReducer.period
  }
}

mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListRow);

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
    color: 'white',
  },
  positive: {
    color: '#3CBD61',
  },
  negative: {
    color: '#FF5E5E',
  },
});

