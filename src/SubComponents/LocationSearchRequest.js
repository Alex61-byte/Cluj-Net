import React,{ useEffect, useState} from 'react'

export default function LocationSearchRequest({possition,setPlace,found}) {
            

            
    return (
        <div>
            <input type="text" placeholder="Search Places Nearby" className="location-input" onChange={(e)=>setPlace(e.target.value)}/>
            
        </div>
    )
}
