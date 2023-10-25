import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBkaD0_CTDkPqa3pY4LIt3lyS9BLuzHcto",
  authDomain: "chat-app-react-c2612.firebaseapp.com",
  projectId: "chat-app-react-c2612",
  storageBucket: "chat-app-react-c2612.appspot.com",
  messagingSenderId: "916958534497",
  appId: "1:916958534497:web:8351fd861795cf86c6c320"
};


export const app = initializeApp(firebaseConfig);