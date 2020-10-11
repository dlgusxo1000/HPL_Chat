import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, ImageBackground, Alert, TouchableOpacity} from 'react-native';
import PetCButton from './PetCButton';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import firebaseApp from './firebaseConfig';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


 class PetChange extends Component {

    constructor(props) {
        super(props);
        
        var firebaseDB = firebaseApp.database();
        this.roomsRef = firebaseDB.ref('rooms');

        this.state = {
         
          user_id : this.props.navigation.state.params.user_id,
          pet_id : this.props.navigation.state.params.pet_id,
          name : '',
          age : '',
          kind : '',
          add : '',
          image: null,
          data : null,       
          
            
          
        }
        
      }
      
      componentDidMount() {

        this.getPermissionAsync();
        if(this.props.navigation.state.params){
            const user_id = this.props.navigation.state.params.user_id;
            this.setState({user_id: user_id});
            
            this.getImage(user_id);
      }
    }

    getImage = (user_id) => {

        
      let imgRef = firebaseApp.storage().ref(`images/${user_id}/${this.state.pet_id}.png`);;
      imgRef.getDownloadURL().then((url) => {
        this.setState({image : url});
      })
    }

    getPermissionAsync = async () => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('이 작업을 수행하려면 카메라 롤 권한이 필요합니다!');
        }
      }
    };
  
    _pickImage = async () => {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [3, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          this.setState({ image: result.uri,});
        }
  
        console.log(result);
      } catch (E) {
        console.log(E);
      }
    };

    uploadImage = async (uri, userUID) => {

      const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
              resolve(xhr.response);
          };
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
      });
  
      const ref = firebaseApp
          .storage()
          .ref(`images/${userUID}/${this.state.pet_id}.png`);
  
      let snapshot = await ref.put(blob);

      Alert.alert('수정 완료');
  
      return await snapshot.ref.getDownloadURL();
  };

    pet_info = () => {

      

      this.uploadImage(this.state.image, this.state.user_id);

        fetch('http://192.168.43.18/react/pet_modify.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            user_id : this.state.user_id,

            pet_id : this.state.pet_id,
    
            pet_name : this.state.name,
    
            pet_age : this.state.age,
    
            pet_kind: this.state.kind,
            
            pet_add: this.state.add 
    
          })
    
        }).then((response) => response.json())
          .then((responseJson) => {
           
            console.log(responseJson);
          }).catch((error) => {
            console.error(error);
          });
    
          
      }

     


  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>

        <View style={styles.header} >
          
          <TouchableOpacity 
                    style={styles.avatar} 
                    onPress = {this._pickImage}>         

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Image source={{ uri: this.state.image }} style={{ width: 180, height: 180, borderRadius : 63, }} />
                </View>

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
              onChangeText={data => this.setState({name : data})}
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
              onChangeText={data => this.setState({age : data})}
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
              onChangeText={data => this.setState({kind : data})}
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
              onChangeText={data => this.setState({add : data})}
              maxLength = {100}
              />
          </View>

        </View>
        
        <View style={styles.footer}>
            <View style = {styles.fbutton}>
                <PetCButton
                    buttonColor={'null'}
                    titleColor = {'black'}
                    title={'수정하기'}
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

    marginTop : '7%',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    height:'15%',
    //backgroundColor: '#1ad657',
  },
  fbutton : {
      alignItems: 'center',
      justifyContent: 'center',
      alignContent : 'center',
  },
});
export default PetChange;