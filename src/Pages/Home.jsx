import React, { useEffect, useState } from 'react';
import './Home.css';
import $ from 'jquery';
import { db, firebaseApp, storage } from '../firebase';
import { Button } from '@material-ui/core';

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
                // const progress = Math.round(
                //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                // );
                // setProgress(progress);
            },
            error => {
                console.log(error);
            },
           
        )
    }
}
   const clearEditProfile = ()=>{
    setName("");
    setFile("")
   setBio("");
}
const handleSubmit=()=>{
    const ref = db.collection('users').doc(props.user.uid);  
    
    storage.ref("images").child(file.name).getDownloadURL().then(url => {
                    setUrl(url);      

                }).then(()=>{
                    ref.set({
                        name: name,
                        imageUrl: url,
                        bio: bio
                    })
                })
            

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
        <div>
             
<body>

{/* <!-- These are the navigation icons for the settings page--> */}
    <div class="container">
        <div class="leftbox">
            <nav>
                <a id="passwordTab" onClick={()=>{
                    toggle("passwordTab")
                }}
                class="tab active">
                    <i class="fa fa-key "></i>
                </a>
                <a id="profileTab" onClick={()=>{
                    toggle("profileTab")
                }}
                class="tab  ">
                    <i class="fa fa-user-circle "></i>
                </a>
                <a onClick={()=>{
                    toggle("contactTab")
                }}
                class="tab ">
                    <i class="fa fa-envelope "></i>
                </a>
                <a onClick={()=>{
                    toggle("settingsTab")
                }}
                class="tab ">
                    <i class="fa fa-cog"></i>
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
        <div class="rightbox">
            {passwordTab && <div class="password tabShow">
                <h1>Change Password</h1>
                <h2>Current password</h2>
                <input type="password" class="input" onChange={handleCurrentPassword} value={currentPassword}/>
                <h2>New password</h2>
                <input type="password" class="input" onChange={handleNewPassword} value={newPassword}/>
                <h2>Confirm new password</h2>
                <input type="password" class="input" onChange={handleConfirmNewPassword} value={confirmNewPassword}/>
                <button class="btn"  >Change Password</button>
                <button class="btn" onClick={clearPasswordFields}>Cancel</button>
            </div>}
           {
               profileTab &&  <div class="profile tabShow">
               <h1>Edit Profile</h1>
             
             <h2>Name</h2>
               <input type="text" class="input"  value={name}
                        onChange={handleName}/>
                <h2>Upload Profile Picture</h2>
               <input type="file" class="input"  onChange={selectFileHandler}/> 
               <button class="btn"  onClick={uploadFileHandler} >Upload</button>
                <h2>Bio</h2>
               <input type="text" class="input"onChange={handleBio} value={bio}/>
               <button class="btn" onClick={handleSubmit} >Submit</button>
              
             <button class="btn" onClick={clearEditProfile}>Cancel</button>
           </div>
           }
           {
               contactTab &&  <div class="tech support tabShow">
               <h1>Contact Tech Support</h1>
               <a href="https://outlook.office365.com/mail/inbox" target="_blank">ShawnTheHawkAerie@gmail.com</a>
               <p>Click the link to email our tech support and we will get back to you as 
                  soon as possible.</p>
           </div>
           }
            {
                settingsTab && <div class="settings tabShow">
                <h1>Settings</h1>
                <Button onClick={()=>{ firebaseApp.auth().signOut();}}>
                    Log Out
                </Button>
            </div>  
            }     
        </div>    
    </div>
 
    
{/* <!--Allows to cycle through icons and display information corresponding to clicked icons--> */}
    
    


</body>

<footer>
    <a href="">TOS</a>


</footer>




        </div>
    )
}
