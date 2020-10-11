import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert, TouchableOpacity, ImageBackground, BackHandler} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


class Setting extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
        
          user_id : this.props.navigation.state.params.user_id,

        }
    
      }

      

    onPress = () =>
    this.props.navigation.navigate('Pet_mo_de', {user_id : this.state.user_id});

   
    
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.user}>
                    <View style={styles.userName}>
                        <Text>{this.state.user_id}</Text>
                    </View>
                    <View style={styles.userQR}>
                        <Text>큐알코드</Text>
                    </View>
                </View>
                <View style={styles.content}>
                
                <TouchableOpacity style = {styles.bar2}
                                  onPress = {this.onPress}>
                    <View >
                        <Text>펫 정보 수정</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.bar3}>
                    <View >
                        <Text>기능 3</Text>
                    </View>
                </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex :1,
       // backgroundColor : 'rgb(161,175,210)'
    },
    user : {
        flex:0.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent : 'center',
        alignContent : 'center',
        borderWidth : 0.5,
        borderColor : 'gray'
    },
    userName : {
        flex : 0.7,
        flexDirection: 'row',
      //  justifyContent : 'center',
        alignContent : 'center',
        alignItems : 'center',
        borderWidth : 0.5,
        borderColor : 'gray',
        height : '100%',
    },
    userQR : {
        flex : 0.3,
        flexDirection: 'row',
        justifyContent : 'center',
        
    },
    content : {
        flex : 0.6,
        borderWidth : 0.5,
        borderColor : 'gray'
        
    },
    bar1 : {
        flex :0.34,
        borderWidth : 0.5,
        borderColor : 'gray',
        alignContent : 'center',
       // alignItems : 'center',
        justifyContent : 'center',
    },
    bar2 : {
        flex :0.34,
        borderWidth : 0.5,
        borderColor : 'gray',
        alignContent : 'center',
       // alignItems : 'center',
        justifyContent : 'center',
    },
    bar3 : {
        flex :0.34,
        borderWidth : 0.5,
        borderColor : 'gray',
        alignContent : 'center',
       // alignItems : 'center',
        justifyContent : 'center',
    }

    
})

export default Setting;