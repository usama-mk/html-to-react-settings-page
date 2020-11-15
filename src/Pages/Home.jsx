import React, { useEffect, useState } from 'react';
import './Home.css';
import $ from 'jquery';
import { db, firebaseApp, storage } from '../firebase';
import firebase from 'firebase'
import { Button, CircularProgress, LinearProgress } from '@material-ui/core';

export default function Home(props) {
    const [passwordTab, setPasswordTab] = useState(true)
    const [profileTab, setProfileTab] = useState("")
    const [contactTab, setContactTab] = useState("")
    const [settingsTab, setSettingsTab] = useState("")
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword]=useState("");
    const [file, setFile] = useState("");
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    
    
    useEffect(()=>{
        console.log(props.user.uid)
    },[])

    const handleName = (e)=>{
        setName(e.target.value); 
        console.log(name);
   }
   const handleCurrentPassword=(e)=>{
      setCurrentPassword(e.target.value)
   }
   const handleNewPassword=(e)=>{
       setNewPassword(e.target.value);
   }
   const handleConfirmNewPassword= (e)=>{
          setConfirmNewPassword(e.target.value);
   }
const clearPasswordFields = ()=>{
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
}
const handleBio=(e)=>{
    setBio(e.target.value)
}
const selectFileHandler = (event) => {
    if (event.target.files[0]) {
        setFile(event.target.files[0]);
    }

}
const uploadFileHandler = () => {
    if (file) {
        const uploadTask = storage.ref(`images/${file.name}`).put(file);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
                console.log(progress)
            },
            error => {
                console.log(error);
            },
           
        )
    }
}
   const clearEditProfile = ()=>{
    setName("");
    setFile("");
   setBio("");
   setProgress(0);
}
const handleSubmit=()=>{
    const ref = db.collection('users').doc(props.user.uid);  
    var URL;
    storage.ref("images").child(file.name).getDownloadURL().then(url => {
                   URL=url;      

                }).then(()=>{
                    ref.set({
                        name: name,
                        imageUrl: URL,
                        bio: bio
                    })
                }).then(()=>{
                    ref.update({
                        imageUrl: URL
                    })
                    clearEditProfile();
                })
                
            

}

const handleChangePassword=()=>{
    if(confirmNewPassword==newPassword){
        const emailCred  = firebase.auth.EmailAuthProvider.credential(
            firebase.auth().currentUser.email, currentPassword);
            firebase.auth().currentUser.reauthenticateWithCredential(emailCred)
            .then(() => {
              // User successfully reauthenticated.
              alert("Password successfully updated")
              return firebase.auth().currentUser.updatePassword(newPassword);
            }).then(()=>{
                clearPasswordFields();
            })
            .catch(error => {
             alert(`${error} OR you must have been logged in recently to change password`);
            });
    }
    else{
        alert("New Password doesn't match Confirm password")
    }
    
   
}
    const toggle=(tabName)=>{
        // var element = document.getElementById(tabName);
        // element.classList.add("active");
        console.log(tabName)
       if(tabName=="passwordTab"){
        setPasswordTab(true);
        setProfileTab(false);
        setContactTab(false);
        setSettingsTab(false);
       }
       else if(tabName=="profileTab"){
        setProfileTab(true);
        setPasswordTab(false);
        setContactTab(false);
        setSettingsTab(false);
       }
       else if(tabName=="contactTab"){
        setContactTab(true);
        setPasswordTab(false);
        setProfileTab(false);
        setSettingsTab(false);
    }
    else if(tabName=="settingsTab"){
      setSettingsTab(true);
      setPasswordTab(false);
      setProfileTab(false);
      setContactTab(false);
    }
        
    }
    return (
        <body>
             
<div>

{/* <!-- These are the navigation icons for the settings page--> */}
    <div className="container">
        <div className="leftbox">
            <nav>
                <a id="passwordTab" onClick={()=>{
                    toggle("passwordTab")
                }}
                className="tab active">
                    <i className="fa fa-key "></i>
                </a>
                <a id="profileTab" onClick={()=>{
                    toggle("profileTab")
                }}
                className="tab  ">
                    <i className="fa fa-user-circle "></i>
                </a>
                <a onClick={()=>{
                    toggle("contactTab")
                }}
                className="tab ">
                    <i className="fa fa-envelope "></i>
                </a>
                <a onClick={()=>{
                    toggle("settingsTab")
                }}
                className="tab ">
                    <i className="fa fa-cog"></i>
                </a>
                {/* <!--- **Implement Credit Card payment if time permits** */}
                {/* <a onClick={()=>{
                    toggle("profileTab")
                }}
                class="tab ">
                    <i class="fas fa-credit-card "></i>
                </a> */}
               
            </nav>
        </div>
        <div className="rightbox">
            {passwordTab && <div className="password tabShow">
                <h1>Change Password</h1>
                <h2>Current password</h2>
                <input type="password" className="input" onChange={handleCurrentPassword} value={currentPassword}/>
                <h2>New password</h2>
                <input type="password" className="input" onChange={handleNewPassword} value={newPassword}/>
                <h2>Confirm new password</h2>
                <input type="password" className="input" onChange={handleConfirmNewPassword} value={confirmNewPassword}/>
                <button className="btn" onClick={handleChangePassword}  >Change Password</button>
                <button className="btn" onClick={clearPasswordFields}>Cancel</button>
            </div>}
           {
               profileTab &&  <div className="profile tabShow">
               <h1>Edit Profile</h1>
             
             <h2>Name</h2>
               <input type="text" className="input"  value={name}
                        onChange={handleName}/>
                <h2>Upload Profile Picture</h2>
               <input type="file" className="input"  onChange={selectFileHandler}/> <br/>
               <LinearProgress variant="determinate" value={progress} />
               <button className="btn"  onClick={uploadFileHandler} >Upload</button>
                <h2>Bio</h2>
               <input type="text" className="input"onChange={handleBio} value={bio}/>
               <button className="btn" onClick={handleSubmit} >Submit</button>
              
             <button className="btn" onClick={clearEditProfile}>Cancel</button>
           </div>
           }
           {
               contactTab &&  <div className="tech support tabShow">
               <h1>Contact Tech Support</h1>
               <a href="https://outlook.office365.com/mail/inbox" target="_blank">ShawnTheHawkAerie@gmail.com</a>
               <p>Click the link to email our tech support and we will get back to you as 
                  soon as possible.</p>
           </div>
           }
            {
                settingsTab && <div className="settings tabShow">
                <h1>Settings</h1>
                <Button onClick={()=>{ firebaseApp.auth().signOut();}}>
                    Log Out
                </Button>
            </div>  
            }     
        </div>    
    </div>
 
    
{/* <!--Allows to cycle through icons and display information corresponding to clicked icons--> */}
    
    


</div>

<footer>
    <a href="">TOS</a>


</footer>




        </body>
    )
}
