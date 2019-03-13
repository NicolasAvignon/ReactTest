import * as firebase from 'firebase';

// Config to initialize Firebase
const config = {
  apiKey: 'AIzaSyDiJznhIU13bEQThVj1ahA4KXv9kuc6GK8',
  authDomain: 'beelditest.firebaseapp.com',
  databaseURL: 'https://beelditest.firebaseio.com',
  projectId: 'beelditest',
  storageBucket: 'beelditest.appspot.com',
};

export const firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export const database = firebase.database();
export const storage = firebase.storage();