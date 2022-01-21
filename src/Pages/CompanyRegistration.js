import React, { useEffect, useState } from 'react'
import {useAuth} from '../Contexts/AuthContext'
import {Panel,Form,Alert,Label,FormControl,FormGroup} from 'react-bootstrap'
import { doc, setDoc, getFirestore,  getDoc } from 'firebase/firestore'

function CompanyRegistration() {
    const {currentUser} =useAuth()
    const [loading,setLoading] = useState(false)
    const[company,setCompany]=useState("")
    const[city,setCity]=useState("")
    const[street,setStreet]=useState("")
    const [alert,setAlert]=useState("") 
    const[user,setUser]=useState(currentUser)
    const db = getFirestore()
    

    useEffect(()=>{
        setUser(currentUser)
    },[currentUser])

    async function addCompany(e){
        e.preventDefault()
        setLoading(true)
        const docRef=doc(db,'company',company)
        const docSnap=await getDoc(docRef)

        if(docSnap.exists()){
            setAlert("Company already registered")
            setLoading(false)
            return
        }
        if(company===""||city===""||street===""){
                return setAlert("Please check the details")
        }
        try{
         setAlert("")
         await setDoc(doc(db,"company",company),{
             owner:user.uid,
             name:company,
             city:city,
             street:street,
             image:""
         })
        }catch(error){
            setAlert(error)
        }
        
        setLoading(false)

    }

    return (
            
               <Form style={{margin:"0 auto",marginTop:"80px",width:"500px"}} onSubmit={addCompany} >
                   {alert&&<Alert variant="warning">{alert}</Alert>}
                   <FormGroup>
                    <Label>Company Name</Label>
                    <FormControl placeholder="Company Name" onChange={(e)=>setCompany(e.target.value)} required></FormControl>
                    </FormGroup>
                    <FormGroup>
                        <Label> City or Town</Label>
                        <FormControl placeholder="City orTown" onChange={(e)=>setCity(e.target.value)} required></FormControl>
                    </FormGroup>
                    <FormGroup>
                        <Label> Street and Number</Label>
                        <FormControl placeholder="Street and Street Number"  onChange={(e)=>setStreet(e.target.value)} required></FormControl>
                        
                    </FormGroup>
                   
                    {(loading===false)?<button className="sign-up-btn" type="submit" >Submit</button>:<button className="sign-up-btn" disabled>Saving Information</button>}
               </Form>
            
    )
}

export default CompanyRegistration;
