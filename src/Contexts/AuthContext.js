import React, { useContext, useEffect, useState } from 'react'

import { getAuth,createUserWithEmailAndPassword, onAuthStateChanged,signInWithEmailAndPassword,signOut,setPersistence,browserSessionPersistence } from '@firebase/auth'


const AuthContext=React.createContext()

export  function useAuth(){
    return useContext(AuthContext)
}

export  function AuthProvider({children}) {
    const [currentUser,setCurrentUser]=useState()
    const [pending,setPending]=useState(true)
    const auth=getAuth()
    
  
    
 function signUp(email,password){
    return createUserWithEmailAndPassword(auth,email,password)
 }

 function signIn(email,password){
    return signInWithEmailAndPassword(auth,email,password)
 }

 function logout(){
   return  signOut(auth)
 }

 useEffect(()=>{
    const unsubscribe= onAuthStateChanged(auth,user=>{
        setCurrentUser(user)
        setPending(false)
    })
    return unsubscribe
 },[auth])


 const value={
     currentUser,
     signUp,
     signIn,
     logout,
 }

if(pending){
    return <div className="loading">

    </div>
}

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
