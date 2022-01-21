import React from 'react'
import { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import {FiUser} from 'react-icons/fi'
import BackButton from '../Components/BackButton'

const SearchResults = ({results,setShowPosts,setShowSearchResults}) => {
    const[displayResults,setDisplayResults]=useState([]) 

    useEffect(() => {
        setDisplayResults(results)
    },[results])

       return (
        <div className="results-container">
            <BackButton setShowPosts={setShowPosts} setShowItems={setShowSearchResults}/>
            {displayResults.map((item)=>{
                if(item.src!==''){
                return <Link to={`/UserProfile/${item.userId}`} key={item.id}>
                <div className="row-user" key={item.id}>
                    <div className="col-25-user">
                        <div className="img-retainer"><img src={item.src} alt="user-pic" width="100%"/></div>
                        
                    </div>
                    <div className="col-75-user">
                        <h3>{item.userName}</h3>
                        <p>{item.city}</p>
                        <p>{item.birthday.substring(5,10)}</p>
                    </div>
                </div>
                </Link>
                }else{
                    return  <Link to={`/UserProfile/${item.userId}`} key={item.id}>
                    <div className="row-user" key={item.id}>
                        <div className="col-25-user">
                            <div className="img-retainer"><FiUser style={{fontSize:"50px",marginTop:"10px"}}/></div>
                            
                        </div>
                        <div className="col-75-user">
                            <h3>{item.userName}</h3>
                            <p>{item.city}</p>
                            <p>{item.birthday.substring(5,10)}</p>
                        </div>
                    </div>
                    </Link>
                }
            })}
            
        </div>
    )
}

export default SearchResults
