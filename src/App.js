
import { useEffect, useState } from 'react';
import './App.css';
import Login from './Components/Login';
import Home from './Pages/Home';
import firebaseApp from './firebase'

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const handleLogout= ()=>{
      firebaseApp.auth().signOut();
  }
  const clearInputs = ()=>{
    setEmail('');
    setPassword('');
  }
  
  const authListener = ()=>{
      firebaseApp.auth().onAuthStateChanged((user)=>{
          if(user){
              clearInputs();
              setUser(user);
          }
          else{
              setUser("");
          }
      })
  }
  useEffect(()=>{
      authListener();
      
  },[]);

  return (
    <div className="App">
     
     {user?<Home user={user}/>:<Login/>}
      
    </div>
  );
}

export default App;
