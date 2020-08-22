import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, ImageBackground, Alert, TouchableOpacity} from 'react-native';
import PetButton from './PetButton';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import firebaseApp from './firebaseConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


 class Pet extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
         
          user_id : '',
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
            
      }
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
          aspect: [4, 3],
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
          .ref()
          .child(`userImages/${userUID}`);
  
      let snapshot = await ref.put(blob);
  
      return await snapshot.ref.getDownloadURL();
  };

    pet_info = () => {

      this.uploadImage(this.state.image, this.state.user_id);

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
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground
              style = {{ width: "100%", height: "100%" }}
              source = {require("./Photo/PBGradetion.png")}>
        <View style={styles.header} />
        <View style={styles.title}>
          <Text style={{fontSize:35}}>Pet Impomation</Text>
          <View style={{width:"100%",borderBottomWidth:0.5,borderColor:'#444'}} />
        </View>
        <KeyboardAwareScrollView>
        

        <View style = {styles.petimage}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {image && <Image source={{ uri: image }} style={{ width: 300, height: 200 }} />}
          <TouchableOpacity 
            style={styles.button} 
            onPress = {this._pickImage}>
            <Text style = {styles.text}>사진 불러오기</Text>
        </TouchableOpacity >
        
          </View>
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
          <PetButton
            buttonColor={'null'}
            titleColor = {'black'}
            title={'등록'}
            onPress={this.pet_info}/>
        </View>
        </KeyboardAwareScrollView>
        </ImageBackground>
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
  },
  button : {
    marginTop : 10,
    marginBottom : 5,
    borderColor: '#aaa', 
    height:35, 
    borderWidth: 1, 
    borderRadius: 5, 
    padding:5
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