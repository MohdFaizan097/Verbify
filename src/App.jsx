import './App.css'
import Message from './Components/Message'
import {getAuth,onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import { app } from "./firebase"
import { useEffect, useRef, useState } from 'react';
import {getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy} from 'firebase/firestore';

const db = getFirestore(app);

const auth = getAuth(app);

export const loginHandler = () => {
  const provider = new GoogleAuthProvider()

  signInWithPopup(auth, provider)
}




function App() {
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const divForScroll = useRef(null)



  const logoutHandler = () => {
    signOut(auth)
  }

  const inputRef = useRef();
  
  const submitHandler = async(e) => {
    e.preventDefault()

    if(message === '') {
      return;
    }
  
    try{
      setMessage('');
      
      await addDoc(collection(db, "Messages"), {
        text : message,
        uid  : user.uid,
        uri : user.photoURL,
        createdAt : serverTimestamp()
      });
      inputRef.current.focus();
    }
    catch(error){
      alert(error)
    }
  }

  

 
  useEffect(() => {

    
    const q = query(collection(db, 'Messages'), orderBy("createdAt", "asc"))
    
    
    
    
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });
    
    const unsubscribeForMsg = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };
        })
        )
      })
      
      return () => {
        unsubscribe();
        unsubscribeForMsg();
      }
    }, [])
  

    useEffect(()=> {
      divForScroll.current?.scrollIntoView({ behavior : 'smooth' })
    }, [messages])
  
   

  return (
    <>
     
     {
      user ? (
        <div className="box">
        <div className="box-1">
        <h1 className='orange-text main-heading'>Verbify.</h1>
        <p className='desc'>Real-time.ChatApp</p>
      </div>
      <div className="box-2">

        <div className="navbar">
          <h2>verbify.</h2>
         <button onClick={logoutHandler} className='logout-button'>Logout</button>
        </div>

        <div className="chat-box">
          {
            messages.map(item => (
              <Message key={user.id} user ={item.uid === user.uid?'me':"other"} text={item.text} uri={item.uri}/>
            ))
          }
        <div ref={divForScroll}></div>
        </div>

       
          
        <form className='form-box' onSubmit={submitHandler}> 
        <div className="input-box">
          <input 
          type="text" 
          placeholder='Type a message' 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          ref={inputRef} />
          <button type='submit'className='submit-btn'>Send</button>
        </div>
        </form>




      </div>
      </div>
      ) : (
        <div className="sign-in-page">
        <div className="flex">
        <h3>Verbify.</h3>
        <p>Real time. ChatApp</p>
        <button onClick={loginHandler}>Sign in with google</button>
        </div>
       
    </div>
      )
     }
     
       
    </>
  )
}

export default App
