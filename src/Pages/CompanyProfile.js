 import React,{useEffect, useState} from 'react'
 import { useAuth } from '../Contexts/AuthContext'
 import { useParams } from 'react-router-dom'
 import { collection, getDocs, getFirestore,query,where} from 'firebase/firestore'
 import BackButton from '../Components/BackButton'
import CompanyCard from '../Components/CompanyCard'
import UsersCompanyCard from '../Components/UsersCompanyCard'

const CompanyProfile = () => {
        const{currentUser}=useAuth()
        const{id}=useParams()
        const[company,setCompany]=useState([])
        const[addJob,setAddJob]= useState(false)
        const[addProduct,setAddProduct]= useState(false)
        console.log(currentUser.uid)
        console.log(id)
       

        
        useEffect(() => {
            async function getCompany(){
                const db=getFirestore()
                let arr=[]
                const companyRef=collection(db,"company")
                const q= query(companyRef,where("name","==",id))
                const querySnapshotCompany=await getDocs(q)
                querySnapshotCompany.forEach((doc)=>{
                    console.log(doc.id,"=>",doc.data())
                    arr.push({id:doc.id,name:doc.data().name,city:doc.data().city,image:doc.data().image,adress:doc.data().street,owner:doc.data().owner})
                })
                
                setCompany(arr)
            }
            getCompany()
        },[id])



    return (
        <div className="company-profile">
            <BackButton/>
            {company.map((item)=>{
                if (currentUser.uid===item.owner){
                    
                    return (
                    <UsersCompanyCard  name={item.name} city={item.city} adress={item.adress} image={item.image} owner={item.owner} currentUser={currentUser}  key={item.name}/>
                    
                    )
                }else{
                    return<CompanyCard name={item.name} city={item.city} adress={item.adress} image={item.image} owner={item.owner} currentUser={currentUser}  key={item.name}/>
                }
            })}
            
        </div>
    )
}

export default CompanyProfile
