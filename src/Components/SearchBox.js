import React,{useState} from 'react'
import { getDocs, query, where, getFirestore, collection } from "firebase/firestore";  
import {BsSearch} from 'react-icons/bs'

const SearchBox = ({setResults, setShowSearchResults}) => {
     
    const [searchElement,setSearchElement]=useState("")
    
    async  function getSearchInfo(e){
        e.preventDefault()
        const db=getFirestore()
        const q= query(collection(db,"users"),where("firstName",'==',searchElement))
        const q1=query(collection(db,"users"),where("lastName",'==',searchElement))
        
        if(searchElement){
            let arr=[]
            const querySnapshot =await getDocs(q)
            const querySnaphot1=await getDocs(q1)
            querySnapshot.forEach((doc)=>{
                console.log(doc.id,"=>",doc.data().userName)
                arr.push({id:doc.id,userName:doc.data().userName,src:doc.data().profileImg,birthday:doc.data().birthday,city:doc.data().location,userId:doc.data().userId})
            })
            querySnaphot1.forEach((doc)=>{
                console.log(doc.id,"=>",doc.data().userName)
                arr.push({id:doc.id,userName:doc.data().userName,src:doc.data().profileImg,birthday:doc.data().birthday,city:doc.data().location,userId:doc.data().userId})
            })
            setResults(arr)
            setShowSearchResults(true)
            console.log(arr)
        }else{
            return 
        }
       
    }



     
    return (
        <div className="search-box">
            <form  onSubmit={getSearchInfo}>
            <input type="search" placeholder='Search...' name="q" onChange={(e)=>setSearchElement(e.target.value)}/>
           <BsSearch type="submit" className="search-icon" onClick={getSearchInfo}/> 
            </form>
        </div>
    )
}

export default SearchBox
