import React, { useState } from 'react'
import {getAuth}from'@firebase/auth'
import firebase from 'firebase/compat'
import firebaseConfig from '../firebase'
import {initializeApp} from '@firebase/app'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc, getFirestore,  getDoc } from 'firebase/firestore'
import {useAuth} from '../Contexts/AuthContext'




if(!firebase.apps.lenght){
   firebase.initializeApp(firebaseConfig)
}

export default function SignUp() {
    const [text,setText]=useState("")
   // const [email]=useDebounce(text,3000)
     const[password,setPassword]=useState("")
    const[confirmPassword,setConfirmPassword]=useState("")
    const[error,setError]=useState("")
    const[loading,setLoading]=useState(false)
    const{signUp}=useAuth()
    let user;
    let navigate=useNavigate();
    const auth=getAuth();
    const db=getFirestore()

    

    async function SignUpUser(e){
        e.preventDefault();
        const docRef=doc(db,"users",text)
        const docSnap=await getDoc(docRef)
        if (docSnap.exists()){
            return setError("Email Already Registered!")
        }
        
        if(password!==confirmPassword){
           return setError("Passwords do not match!")
        }

        try{
            setLoading(true);
            setError("")
           await signUp(text,password)
            .then((cred) => { return  user = cred.user.email })
            await setDoc(doc(db, "users",user), {
                
                email: text,
            });

        }catch(error){
           return setError(error.message)
        }
        e.target.reset()
        navigate("/Account")
    }

    return (
        <div className="card">
            {error&& <h3 className="error">{error}</h3>}
            <h1>Welcome!</h1>
            <h3 className="account-signup">Let's Set Your Account</h3>
            <form action="submit" onSubmit={SignUpUser}>
                <div className="email">
                
                <input type="email" name="email" id="email" required onChange={(e)=>setText(e.target.value)} placeholder="Email"/>
                </div>
                <div className="password">
               

                <input type="password" name="password" id="pass" onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                </div>
                <div className="confirm-pass">
               
                <input type="password" name="confirm-password" id="pass-confirm" onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm Password"/>
                </div>
                <button type="submit" className="sign-up-btn">Sign-Up</button>
            </form>
           
            
        </div>
    )
}
