import firebase from "firebase";

// Initialize Firebase
const firebaseConfig = {
          apiKey: 'AIzaSyA9ZdPFwXCHXagCP1FXxEzpnHPozFewAAw',
          authDomain: 'hpl-chat-d2cb8.firebaseapp.com',
          databaseURL: 'https://hpl-chat-d2cb8.firebaseio.com',
          projectId: 'hpl-chat-d2cb8',
          storageBucket: '',
          messagingSenderId: '835705626993',
          appID: "HPLCHAT",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;