import React, { useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import { useEffect } from 'react'

export default function BackButton() {
    
    const history = useNavigate()
    const location=useLocation()
    
    if(location.pathname ==='/'){
    return (
    <div className="back-button">
        <BiArrowBack onClick={()=>window.location.reload()}/>
    </div>
      
    )
    }else{
        return (
            <div className="back-button">
            <BiArrowBack onClick={()=>history(-1)} style={{marginBottom:"2px"}}/>
        </div>
        )
    }
}
