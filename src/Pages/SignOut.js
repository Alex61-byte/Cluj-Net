import React from 'react'

import { useNavigate } from 'react-router-dom';
import {useAuth} from '../Contexts/AuthContext'

export default function SignOut() {
    const navigate=useNavigate()
    const{logout}= useAuth()
   async function userSignOut(e){
        e.preventDefault();
        try{
            logout()

        }catch(err){

        }
        
        
        navigate("/")

        
    }

    return (
        <div>
            <button onClick={userSignOut}>Sign Out</button>
        </div>
    )
}
