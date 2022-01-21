import React, { useState } from  'react'
import {useAuth} from '../Contexts/AuthContext'
import { useNavigate } from 'react-router-dom'


export default function SignIn() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const navigate=useNavigate()
    const {signIn} = useAuth()


    async function handelSubmit(e){
        e.preventDefault()
        try{
            await signIn(email,password)

        }catch(err){
           return setError("Failed to Sign-In")
        }
           
        e.target.reset()
        navigate("/")
    }


    return (
        <div className="card" style={{height:"auto"}}>
            {error&& <h3 className="error">{error}</h3> }
            <form onSubmit={handelSubmit} >
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="email">E-mail</label>
                    </div>
                    <div className="col-75">
                        <input type="text" placeholder="Email" required onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="Password">Password</label>

                    </div>
                    <div className="col-75">
                        <input type="password" name="password" id="pass" required onChange={(e)=>setPassword(e.target.value)}/> 
                    </div>

                </div>
               <button type="submit" className="sign-up-btn">Sign in</button>
            </form>
        </div>
    )
}
