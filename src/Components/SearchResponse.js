import axios from 'axios'
import React,{useEffect, useState} from 'react'


export default function SearchResponse({found,setUsersPlace,setSelectedPoi,setMapCenter,length,setShowInput}) {
        
        const [show,setShow]=useState(false)
        
        useEffect(()=>{
          if(found!==undefined){
            setShow(true)
          }
        },[found])

        
        function handleClick(e){
            setUsersPlace(e.target.id)
            let result=found.find(obj=>{
                return obj.name===e.target.id
            })
            console.log(result)
            setSelectedPoi([result])
            setShow(false)
            setShowInput(false)
            
            
        }

       
    return (
        <div className="search-results" >
          
            {show &&found&&found.map((item)=>{
                return <div key={item.adress} id={item.name} onClick={(e)=>handleClick(e)}  >{item.name}</div>
            })}
            
        </div>
    )
}
