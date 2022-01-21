import React,{useState,useEffect} from 'react'
import Contact from './Contact'

const ContactList = ({contactList}) => {
    const [contacts,setContacts]=useState(contactList)
    useEffect(()=>{
        setContacts(contactList)
    },[contactList])
    console.log(contacts)
    
if(contacts!==undefined){
    return (
        
        <div className="contact-list">
            {contacts.map((item)=>{
                console.log(contacts.indexOf(item))
                if (contacts.indexOf(item)<=5) {
                    
                    return <Contact name={item.userName} image={item.userImg} id={item.userid} email={item.userEmail} key={item.userid}/>
                }else{
                    return null
                }
            })}
        </div>
    )
}else{
    return null
}

}

export default ContactList
