import React, { useState,useEffect } from 'react'
import LocationSearchRequest from '../SubComponents/LocationSearchRequest';
import SearchResponse from './SearchResponse';
const axios = require('axios').default
export default function LocationRequester({setUsersPlace ,setMapLogitude,setMapLatitude,setMapCenter,setShowInput}) {
    const [position,setPosition]=useState({
        lat:null,
        lon:null,
    });
    const [place,setPlace]=useState(null)
    const [foundPlaces,setFoundPlaces]=useState([])
   const [selectedPoi,setSelectedPoi]=useState([])
   const [length,setLength]=useState()
   console.log(selectedPoi)
   const[show,setShow]=useState(false)
 
   
   
   
    
    
    let lat ;
    let lon;
    let searchUrl;
   useEffect(()=>{
   let location= navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        
        if(!place||place.length<5){
            return
        }else{
            let poi=`${place}.json?`
            let baseurl=`https://api.tomtom.com/search/2/poiSearch/${place}.json?`
            searchUrl=baseurl+`key=${process.env.REACT_APP_TOMTOM_API_KEY}`
            searchUrl = searchUrl + `&lon=${position.coords.longitude}`;
            
            searchUrl = searchUrl + `&lat=${position.coords.latitude}`;
        }
       
        
        setPosition({lat:Number(position.coords.latitude),lon:Number(position.coords.longitude)});
        axios.get(searchUrl).then(response => {
            
         response.data.results.map(v=>{
            let arr=[]
                let addresses = response.data.results.map(v => {     
                    let names = {name:v.poi.name ,adress: v.address.freeformAddress,lon:v.position.lon,lat:v.position.lat}  
                   
                   
                    return arr.push(names)
                  });  
                  setFoundPlaces(arr)
                  setPlace("")
                  setShow(true)
                 


                  
            })
        });
      });
   },[place])
    
 
  useEffect(()=>{
    setLength(foundPlaces.length)
  },[foundPlaces])
  


    return (
        <div>
            
            
            <LocationSearchRequest possition={position} setPlace={setPlace}  />
            <SearchResponse found={foundPlaces} length={length} setUsersPlace={setUsersPlace} setSelectedPoi={setSelectedPoi} show={show} setShow={setShow} setShowInput={setShowInput}/>
            
        </div>
    )
}
