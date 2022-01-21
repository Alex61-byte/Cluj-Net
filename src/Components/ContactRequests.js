import React from 'react'
import { useState,useEffect } from 'react'
import{Link}from 'react-router-dom'
import{AiOutlineCheck} from'react-icons/ai'
import{GiCrossMark}from 'react-icons/gi'
import { getFirestore, updateDoc, doc, arrayUnion,arrayRemove} from 'firebase/firestore'

const ContactRequests = ({currentUser,userEmail,userImg,userid,userName,setUpdated}) => {
    const[requester,setRequester]=useState(null)
    console.log(requester)
    const[myId,setMyId]=useState(currentUser.email)
    console.log(myId)

    useEffect(() => {
        setMyId(currentUser.email)
    },[currentUser])

    async  function addContact(){
        
        const db = getFirestore()
        const myRef=doc(db,"users",myId)
        const requesterRef=doc(db,"users",requester)
        await updateDoc(myRef,{
            contactRequest:arrayRemove({userEmail:userEmail,userImg:userImg,userid:userid,userName:userName}),
            contacts:arrayUnion({userEmail:userEmail,userImg:userImg,userid:userid,userName:userName})
        })

        await updateDoc(requesterRef,{
            contacts:arrayUnion({userEmail:currentUser.email,userImg:currentUser.photoURL,userid:currentUser.uid,userName:currentUser.displayName})
        })
        setUpdated(true)
        
    }

    async function declineContact(){
        
        const db= getFirestore()
        const myRef=doc(db,"users",myId)
        await updateDoc(myRef,{
            contactRequest:arrayRemove({userEmail:userEmail,userImg:userImg,userid:userid,userName:userName}),
            declinedContact:arrayUnion({userEmail:userEmail,userImg:userImg,userid:userid,userName:userName})
        })
        setUpdated(true)
    }


    return (
        <div className="request-item" key={userid}>
           <Link to={`/UserProfile/${userid}`} key={userid}>
           <div className="post-like-item"  >
                        <div className="post-like-image-container">
                            <img src={userImg} alt={userName} width="100%" />
                        </div>
                        <div className="post-like-user"><h6>{userName}</h6></div>

                    </div>
            </Link>
            <div className='request-item-controls'>    
           <button className='accept'id={userEmail} onMouseEnter={(e)=>setRequester(e.target.id)} onMouseLeave={(e)=>setRequester(null)} onClick={addContact} ><AiOutlineCheck/> Accept</button>
           <button className='decline' id={userEmail} onMouseEnter={(e)=>setRequester(e.target.id)} onMouseLeave={(e)=>setRequester(null)} onClick={declineContact} ><GiCrossMark/> Decline</button>
           </div> 
        </div>
    )
}

export default ContactRequests
