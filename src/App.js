import React, { useState , useEffect } from 'react';
import './App.css';
import { FormControl, Input } from '@material-ui/core';
import Message from './Message';
import { db , storage} from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

import { useAuthState } from 'react-firebase-hooks/auth';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';




const auth = firebase.auth();
var username = 'a';
var uid = 'b';
var picc ='c';
var user = firebase.auth().currentUser;
console.log(user);
const firestore = firebase.firestore();
auth.onAuthStateChanged(user =>{
  console.log(user)
  if(user){
     username = user.email;
     uid = user.displayName;
     picc = user.photoURL;
    }
   else {
     username = "a"
     picc = 'b'
     uid ='c'
  }
});
console.log(picc)
function Start() {
  
  const [user] = useAuthState(auth);
  

  return (
    <div className="App">
      <header>
        
        <SignOut />
      </header>

      <section>
        {user ? <App /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <div className="open">
      <h1>Welcome to TALK app. This is a public chat app. You can join with us.</h1>
      <Button variant="outlined" color="secondary" className="sign-in" onClick={signInWithGoogle} className="sn">Sign in with Google</Button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </div>
  )

}

function SignOut() {
  return auth.currentUser && (
    <Button variant="outlined" color="secondary" className="sign-out so" onClick={() => auth.signOut()}>Sign Out</Button>
  )
}



function App() {
  const [input , setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [progress, setProgress] = useState(0);
  const messagesRef = firestore.collection('messages');
  const [image, setImage] = useState(null);
  const [posts, setPost] = useState([]);

  const handleChange = (e) => {
    if(e.target.files[0]){
        setImage(e.target.files[0]);
    }
  }
  
  
  
  useEffect(() => {
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
      setMessages(snapshot.docs.map(doc =>({ id: doc.id, message: doc.data()})))

    });
    
  }, [])

  const handleUpload = (event)=>{
    event.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    
    uploadTask.on(
      
        "state_changed",
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) *100
            )
            setProgress(progress)
        },
        (error) =>{
            console.log(error);
            alert(error.message)
        },
        ()=>{
            storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url =>{
                    db.collection("messages").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        message: input,
                        imageUrl: url,
                        username: username,
                        uid:uid,
                        picc:picc,
                        
                        
                        
                    })
                    setProgress(0);
                    setInput("");
                    setImage(null);
                })
        }
    )
}


  const sendMessage = (event) =>{
    //all the logic
    event.preventDefault();
    
    messagesRef.add({
      message: input,
      
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: username,
      picc: picc,
      uid: uid
      
    })
    
    setInput('');
    
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display:"none"
    },
  }));
const classes = useStyles();
  return (
    <div className="App ">

      
      
      <h1 className="lg">TALK</h1><h1 className="lg2"> Welcome {uid}</h1><img src={picc} className="imgg"></img>
      
      

            <form className="app__form ">
            <FormControl className="app__formControl app__form  " >
            <CircularProgress variant="determinate" value={progress}  />
            
        <Input className="app__input" placeholder='Enter a message...' value={input} onChange={event => setInput(event.target.value)} />

        <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="contained-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span" disabled={image}>
        <PhotoCamera />
        </IconButton>
      </label>
      <button className="app__iconButton" type="submit" onClick ={(!image?sendMessage:handleUpload)} disabled={!image && !input} >
          <SendIcon/>
        </button>
       
        
      
     



      </FormControl>
            </form>
      
      
      
    <FlipMove className="sp">
    {
      messages.map(({uid, id, message,image,posts}) => (
        <Message key={id} username={username} picc = {picc} uid = {uid} message={message} imageurl={message.imageUrl}  />
       
        
      ))

    }
    </FlipMove>
    

    </div>
  );
}

export default Start;
