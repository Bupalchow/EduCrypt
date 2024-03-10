import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDOMY7jPJVKMLZqHMn1V7beH5OgQz0nAMI",
  authDomain: "playground-db20b.firebaseapp.com",
  databaseURL: "https://playground-db20b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "playground-db20b",
  storageBucket: "playground-db20b.appspot.com",
  messagingSenderId: "15769246362",
  appId: "1:15769246362:web:b98df416f2841e4b2f1d23"
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);