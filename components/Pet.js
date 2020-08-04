import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, ImageBackground, Alert} from 'react-native';
import CustomButton2 from './CustomButton2';
import ImageLoad from './ImageLoad';

 class Pet extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
         
          user_id : '',
          name : '',
          age : '',
          kind : '',
          add : ''         
          
        }
        
      }

      componentDidMount() {
        if(this.props.navigation.state.params){
            const user_id = this.props.navigation.state.params.user_id;
            this.setState({user_id: user_id});
            
      }
    }

    pet_info = () => {

        fetch('http://192.168.43.18/react/pet_information.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            pet_id : this.state.user_id,
    
            pet_name : this.state.name,
    
            pet_age : this.state.age,
    
            pet_kind: this.state.kind,
            
            pet_add: this.state.add 
    
          })
    
        }).then((response) => response.json())
          .then((responseJson) => {
            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
          }).catch((error) => {
            console.error(error);
          });
    
    
      }


  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
              style = {{ width: "100%", height: "100%" }}
              source = {require("./Photo/petback2.png")}>
        <View style={styles.header} />

        <View style={styles.title}>
          <Text style={{fontSize:35}}>Pet Impomation</Text>
          <View style={{width:"100%",borderBottomWidth:0.5,borderColor:'#444'}} />
        </View>

        <View style = {styles.petimage}>
            <ImageLoad></ImageLoad>
        </View>

        <View style={styles.content}>

          <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            paddingBottom:10}}>
            <Text style={{fontSize:19}}>이름</Text>
            <TextInput style={{
              borderColor: 'black',  
              width:'70%', 
              height:35, 
              borderWidth: 1, 
              borderRadius: 5, 
              padding:5}}
              onChangeText={data => this.setState({name : data})}
              />
          </View>

          <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            paddingBottom:10}}>
            <Text style={{fontSize:19}}>나이</Text>
            <TextInput 
              palceholder = "Passwored" 
              style={{
              borderColor: 'black', 
              width:'70%', 
              height:35, 
              borderWidth: 1,
              borderRadius: 5, 
              padding:5}}
              onChangeText={data => this.setState({age : data})}
              />
          </View>

          <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            paddingBottom:10}}>
            <Text style={{fontSize:19}}>견종</Text>
            <TextInput style={{
              borderColor: 'black', 
              width:'70%', 
              height:35, 
              borderWidth: 1, 
              borderRadius: 5, 
              padding:5}}
              onChangeText={data => this.setState({kind : data})}
              />
          </View>
          <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            paddingBottom:10}}>
            <Text style={{fontSize:19}}>특이사항</Text>
            <TextInput style={{
              borderColor: 'black', 
              width:'70%', 
              height:35, 
              borderWidth: 1, 
              borderRadius: 5, 
              padding:5}}
              onChangeText={data => this.setState({add : data})}
              />
          </View>

        </View>
        
        <View style={styles.footer}>
          <CustomButton2
            buttonColor={'null'}
            titleColor = {'black'}
            title={'등록'}
            onPress={this.pet_info}/>
        </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width:'100%',
    height:'-5%',
    //backgroundColor: '#ff9a9a',
  },
  title: {
    //paddingBottom:100,
    width:'100%',
    height:'18%',
    justifyContent: 'center',
    //backgroundColor: '#9aa9ff',
  },
  petimage : {
    flex : 1,

  },
  content: {
    //flex :1 ,
    paddingTop : 5,
    paddingLeft:10,
    paddingRight:10,
//    paddingBottom:20,
   // backgroundColor: '#d6ca1a',
  },
  footer: {
    marginTop : '10%',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    height:'15%',
    //backgroundColor: '#1ad657',
  },
});

export default Pet;