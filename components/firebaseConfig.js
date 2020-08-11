import firebase from "firebase";


const firebaseConfig = {
          apiKey: 'AIzaSyA9ZdPFwXCHXagCP1FXxEzpnHPozFewAAw',
          authDomain: 'hpl-chat-d2cb8.firebaseapp.com',
          databaseURL: 'https://hpl-chat-d2cb8.firebaseio.com',
          projectId: 'hpl-chat-d2cb8',
          storageBucket: 'hpl-chat-d2cb8.appspot.com',
          messagingSenderId: '835705626993',
          appID: "HPLCHAT",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;