  import React, {Component} from 'react';
  import {StyleSheet, Text, View, Image, TextInput, ImageBackground, Alert, TouchableOpacity} from 'react-native';
  import PetMOButton from './PetMOButton';
  import * as ImagePicker from 'expo-image-picker';
  import Constants from 'expo-constants';
  import * as Permissions from 'expo-permissions';
  import firebaseApp from './firebaseConfig';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

  class Pet_mo_de extends Component {

      constructor(props) {
          super(props);

          
          
          this.state = {
          
            user_id : this.props.navigation.state.params.user_id,
            name : '',
            age : '',
            kind : '',
            add : '',
            image: null,
            data : null,   
            pet_id : 1,    
            max : '',
            min : 1,
            
          }
          
        }
        left = () => {

          if(this.state.pet_id == 1) {

           
            this.setState({pet_id : this.state.max});

            this.getImage(this.state.user_id);

            this.pet_info(this.state.user_id, this.state.pet_id);

          }

          else {

            
            this.setState({pet_id : --this.state.pet_id});

            this.getImage(this.state.user_id);
  
            this.pet_info(this.state.user_id, this.state.pet_id);

          }
          
        }

        right = () => {

          if(this.state.pet_id == this.state.max) {

            this.setState({pet_id : this.state.min});

            console.log('지금 pet_id : ' + this.state.pet_id);

            this.getImage(this.state.user_id);

            this.pet_info(this.state.user_id, this.state.pet_id);

          }
 
          else {


            this.setState({pet_id : ++this.state.pet_id});

            this.getImage(this.state.user_id);
  
            this.pet_info(this.state.user_id, this.state.pet_id);
          }
          

        }

        componentDidMount() {

        this.getImage(this.state.user_id);

        this.pet_info(this.state.user_id, this.state.pet_id);

        this.pet_info_Test(this.state.user_id);
      }

      pet_info_Test = (user_id) => {

        fetch('http://192.168.43.18/react/Pet_id.php', {

          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
  
            user_id : user_id,
    
          })
    
        }).then((response) => response.json())
          .then((responseJson) => {
            
            this.setState({max : parseInt(responseJson[0], 10)});

          }).catch((error) => {
            console.error(error);
          });
      }

      pet_info = (user_id, pet_id) => {


        fetch('http://192.168.43.18/react/search_pet.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
  
            pet_id : pet_id,
            user_id : user_id,
    
          })
    
        }).then((response) => response.json())
          .then((responseJson) => {
            
            this.setState({ data: responseJson });
            this.getData(this.state.data);
          }).catch((error) => {
            console.error(error);
          });
      }

      getImage = (user_id) => {

        
        let imgRef = firebaseApp.storage().ref(`images/${user_id}/${this.state.pet_id}.png`);;
        imgRef.getDownloadURL().then((url) => {
          this.setState({image : url});
        })
      }

      getData = (data) => {
        this.setState({
          pet_name : data[3],
          pet_age : data[4],
          pet_kind : data[5],
          pet_add : data[6]
  
        })
      }

      goChange = () => {
        this.props.navigation.navigate('PetChange', {user_id : this.state.user_id, pet_id : this.state.pet_id});
      }
    

    render() {
      let { image } = this.state;

      return (
        <View style={styles.container}>

          <View style={styles.header} >
            <TouchableOpacity onPress = {this.left} style = {styles.allow_l} >
              <View>
              <Icon name='chevron-left' color = 'white' size = {35}  onPress = {this.test}/>
              </View>
            </TouchableOpacity>
            <View 
                      style={styles.avatar} 
                      onPress = {this._pickImage}>         

              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                    >
                <Image source={{ uri: image }} style={{ width: 180, height: 180, borderRadius : 63, }} />
              </View>

            </View>

            <TouchableOpacity onPress = {this.right} style = {styles.allow_r}>
                <Icon name='chevron-right' color = 'white' size = {35}  />
            </TouchableOpacity >

          </View>

          <KeyboardAwareScrollView>

          <View style={styles.content}>

            <View style={{
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'center',
              paddingBottom:10}}>
              <Text style={{fontSize:19, color : 'black'}}>이름</Text>
              <TextInput style={{
                borderColor: 'black',  
                width:'70%', 
                height:35, 
                borderWidth: 1, 
                borderRadius: 5, 
                padding:5}}
                editable ={false}
                value = {this.state.pet_name}
                />
            </View>

            <View style={{
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'center',
              paddingBottom:10}}>
              <Text style={{fontSize:19, color : 'black'}}>나이</Text>
              <TextInput 
                palceholder = "Passwored" 
                style={{
                borderColor: 'black', 
                width:'70%', 
                height:35, 
                borderWidth: 1,
                borderRadius: 5, 
                padding:5}}
                editable ={false}
                value = {this.state.pet_age}
                />
            </View>

            <View style={{
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'center',
              paddingBottom:10}}>
              <Text style={{fontSize:19, color : 'black'}}>견종</Text>
              <TextInput style={{
                borderColor: 'black', 
                width:'70%', 
                height:35, 
                borderWidth: 1, 
                borderRadius: 5, 
                padding:5}}
                editable ={false}
                value = {this.state.pet_kind}
                />
            </View>
            <View style={{
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'center',
              paddingBottom:10}}>
              <Text style={{fontSize:19, color : 'black'}}>특이사항</Text>
              <TextInput style={{
                borderColor: 'black', 
                width:'70%', 
                height:120, 
                borderWidth: 1, 
                borderRadius: 5, 
                fontSize : 12,
                padding:5}}
                editable ={false}
                value = {this.state.pet_add}
                maxLength = {100}
                />
            </View>

          </View>
          
          <View style={styles.footer}>
              <View style= {styles.fl}>
            <PetMOButton
              buttonColor={'null'}
              titleColor = {'black'}
              title={'수정하기'}
              onPress={this.goChange}/>
              </View>
              <View style= {styles.fr}>
              <PetMOButton
              buttonColor={'null'}
              titleColor = {'black'}
              title={'삭제하기'}
              onPress={this.pet_info}/>
              </View>
          </View>
          </KeyboardAwareScrollView>

        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    text : {
      fontSize: 15,
      fontWeight : "300",
      color : 'black',
    },
    button : {
      marginTop : '7%',
      marginBottom : 5,
      borderColor: 'black', 
      height:35, 
      borderWidth: 1, 
      borderRadius: 5, 
      padding:5
    },
    allow_l : {

      position: 'absolute',
      marginTop : '22%',
      marginLeft : '10%',
      //alignContent : 'center',
      //alignSelf : 'center',
      //justifyContent : 'center',
    },
    allow_r : {
      position: 'absolute',
      marginTop : '22%',
      marginLeft : '83%',
      //alignContent : 'center',
      //alignSelf : 'center',
      //justifyContent : 'center',
    },
    avatar: {
      width: 180,
      height: 180,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:10
    },

    header: {
      backgroundColor: "rgb(161,175,210)",
      height:200,
    },
    title: {
      //paddingBottom:100,
      width:'100%',
      height:'18%',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent : 'center',
      //backgroundColor: '#9aa9ff',
    },
    petimage : {
      flex : 1,

    },
    content: {
      //flex :1 ,
      paddingTop : 50,
      paddingLeft:10,
      paddingRight:10,
  //    paddingBottom:20,
    // backgroundColor: '#d6ca1a',
    },
    footer: {
      flexDirection: 'row',
      marginTop : '10%',
      justifyContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      width:'100%',
      height:'10%',
      //backgroundColor: '#1ad657',
    },
    fl : {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent : 'center',
      marginLeft : '19%',
    },
    fr : {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent : 'center',
      marginRight : '19%'
    }
  });

  export default Pet_mo_de;