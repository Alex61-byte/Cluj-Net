import React,{useState} from 'react'
import{BsBriefcaseFill} from'react-icons/bs'
import Maps from './Maps'

export default function UsersCompanyCard({city,name,adress,image,owner,currentUser}) {
    const [showMap,setShowMap]=useState(false)
    return (
        <div className="company-card-container">
            <div className="row row-company" >
                
                <div className="col-25">
                    <div className="logo-container">
                 {(image==="")?<BsBriefcaseFill style={{fontSize:"10em"}} className="briefcase"/>: <img src={image} alt={name} width="100%" height="100%"/>}
                 </div>
                </div>
                <div className="col-75">
                    <div className="company-info">
                        <h2>{name}</h2>
                        <h3 onMouseEnter={(e)=>setShowMap(true)} onMouseLeave={(e)=>setShowMap(false)} >{city},{adress}</h3>
                        {showMap&&<Maps usersPlace={adress+city}/>}
                    </div>
                    

                </div>
            </div>
            
        </div>
    )
}
