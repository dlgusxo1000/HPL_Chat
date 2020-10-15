import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert, TouchableOpacity, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Setting extends React.Component {

  
  constructor(props) {
    super(props);
    
    this.state = {
    
      user_id : this.props.navigation.state.params.user_id,

    }

  }


    onPress = () =>
    this.props.navigation.navigate('Pet_mo_de', {user_id : this.state.user_id});

    onPress2 = () =>
    this.props.navigation.navigate('Login');

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
                <View style = {{flex : 0.02,}}></View>
                <View style={styles.content}>
                <TouchableOpacity style = {styles.bar1}
                                onPress = {this.onPress}>
                    <View >
                        <Text style = {styles.font}>펫 정보 수정</Text>
                    </View>
                </TouchableOpacity>

                <View style = {{flex : 0.035,}}></View>

                <View style = {styles.bar2}
                                onPress = {this.onPress2}>
                    <TouchableOpacity style = {styles.bar_0} >
                        <Text style = {styles.font}>자주 묻는 질문</Text>
                        <Icon name='chevron-right' color = 'gray' size = {15} style = {{marginRight : '2%'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.bar_0} >
                        <Text style = {styles.font}>고객 센터</Text>
                        <Icon name='chevron-right' color = 'gray' size = {15} style = {{marginRight : '2%'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.bar_0}>
                        <Text style = {styles.font}>이용 약관</Text>
                        <Icon name='chevron-right' color = 'gray' size = {15} style = {{marginRight : '2%'}}/>
                    </TouchableOpacity>
                </View>
                <View style = {{flex : 0.035,}}></View>
                <TouchableOpacity style = {styles.logout}
                                  onPress = {this.onPress2}>

                        <Text style = {styles.font}>로그아웃</Text>
                        <Icon name='chevron-right' color = 'gray' size = {15} style = {{marginRight : '2%'}}/>

        </TouchableOpacity>
                    <View style = {styles.bar3}>
                        <Text style= {{marginTop : '30%'}}>version 1.0</Text> 
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex :1,
        backgroundColor : 'rgb(239,239,239)'
    },
    user : {
        flex:0.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent : 'center',
        alignContent : 'center',
    // borderWidth : 0.5,
        borderColor : 'gray',
        backgroundColor : 'white'
    },
    userName : {
        flex : 0.7,
        flexDirection: 'row',
    //  justifyContent : 'center',
        alignContent : 'center',
        alignItems : 'center',
        borderRightWidth : 1,
        borderColor : 'gray',
        height : '80%',
    },
    userQR : {
        flex : 0.3,
        flexDirection: 'row',
        justifyContent : 'center',
        
    },
    content : {
        flex : 0.6,
        //borderWidth : 0.5,
        borderColor : 'gray'
        
    },
    bar_0 : {
        flex : 0.333,
    // borderWidth : 1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor : 'white',
    },
    bar1 : {
        flex :0.34,
    //  borderWidth : 0.5,
        borderColor : 'gray',
        alignContent : 'center',
    // alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : 'white'
    },
    bar2 : {
        flex :0.34,
    // borderWidth : 0.5,
        borderColor : 'gray',
        alignContent : 'center',
    // alignItems : 'center',
        justifyContent : 'center',
    },
    bar3 : {
        flex :0.2,
    //  borderWidth : 0.5,
        borderColor : 'gray',
        alignContent : 'center',
        alignItems : 'center',
        justifyContent : 'center',
        //backgroundColor : 'white',
        
    },
    logout : {
        flex : 0.15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor : 'white',
    },
    font : {
        fontWeight : "700",
        marginLeft : '2%',
    }

    
})

export default Setting;