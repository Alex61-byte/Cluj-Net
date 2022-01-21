import React from 'react'
import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import{BsBriefcaseFill} from'react-icons/bs'

export default function CompanyLIst({companyList}) {
    const[companyData,setCompanyData]=useState(companyList)


    useEffect(()=>{
        setCompanyData(companyList)
    },[companyList])

    return (
        <div className="company-list">
            {companyData.map((item)=>{
        return <Link to={`/CompanyProfile/${item.name}`} key={item.id}>
            <div className="company-container">
                <div className="company-image-container">
                    {(item.image!=="") ? <img src={item.image} alt={item.name}/>:<BsBriefcaseFill style={{marginTop:"0px"}}/>}
                </div>
                <h5 style={{marginTop:"0px"}}>{item.name}</h5>
            </div>
        </Link>
    })}
        </div>
    )
}
