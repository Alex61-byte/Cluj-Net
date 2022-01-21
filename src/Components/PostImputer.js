import React,{useState, useRef} from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import LocationRequester from './LocationRequester'
import PostPreview from './PostPreview'
import { AuthProvider } from '../Contexts/AuthContext'
import {useSpring,animated} from 'react-spring'
import { addDoc, collection, getFirestore,   } from 'firebase/firestore'
import Resizer from "react-image-file-resizer";





const PostImputer = ({currentUser,close}) => {
    
    const [text,setText]=useState("")
    
    const [fileUrl,setFileUrl]=useState("")
    const [displayImg,setDisplayImg]=useState(null)
    const [postImg,setPostImg]=useState(null)
    console.log(displayImg)
    console.log(postImg)
    const fileInput = useRef(null)
    const [usersPlace,setUsersPlace]=useState("")
   
    const [showInput,setShowInput]=useState(false)
    



    
    const styles= useSpring({
        
        from:{opacity:0,marginTop:-500},
        to:{opacity:1,marginTop:0},
       
    })
    const handleClick = event => {
        fileInput.current.click(event);
    };

    const handleChange = async (event) => {
        if(event.target.files[0]){
        const uploadedFile = event.target.files[0];
       setDisplayImg(uploadedFile)
       setPostImg({image:URL.createObjectURL(event.target.files[0])})
        }
    };

    function addImage(e) {
        e.preventDefault()
        const storage = getStorage();
        const storageRef = ref(storage, displayImg.name);

        const uploadTask = uploadBytesResumable(storageRef, displayImg);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                console.error(error);
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setFileUrl(downloadURL)
                });

            }
        );
    }

    async function Post(e){
        e.preventDefault()
        const options={ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' ,timeZone: 'EET'};
        const date=new Date();
        
        const db= getFirestore()

        try{
            
        const docRef=await addDoc(collection(db,"posts"),{
            author:currentUser.email,
            person:currentUser.displayName,
            userId:currentUser.uid,
            userImg:currentUser.photoURL,
            
            postText:text,
            imgSrc:fileUrl,
            location:usersPlace,
            date:date.toLocaleDateString("en-US",options),

        })
    }catch(e){
        console.error()
    }
        setText("")
        setDisplayImg(null);
        setFileUrl("")
        setPostImg(null);
        setUsersPlace("");
       close()

    }

    


    return (
        
            <animated.div style={{...styles}} className="animated"> <div className="post-card">
            <div className="btn-container">
            
            <button className="close-btn" onClick={close}>X</button>
            </div>
            <AuthProvider><PostPreview  userName={currentUser.displayName} usersPlace={usersPlace}  postImg={postImg}/></AuthProvider> 
            <div className="form-container">
            <form className="post-form"> 
            <input type="text" placeholder="Post Text" className="description" onChange={(e)=>setText(e.target.value)}/>
            <div className="image-selector">
                <div ><label htmlFor="picture">Add a picture</label></div>
                <button type="button" className="image-select-btn" onClick={handleClick} >Select A picture</button>
                <div><input type="file" name="image" id="image" accept="image/*" ref={fileInput} onChange={handleChange}  style={{ display: "none" }} />
                
                </div>

            </div>
            <div className="seach-container">
            <div className="location-input" onClick={(e)=>setShowInput(true)}>Add a location</div>
               {showInput&&<div><LocationRequester setUsersPlace={setUsersPlace}   setShowInput={setShowInput}/>
               <button className="sign-up-btn" onClick={(e)=>setShowInput(false)}>Close</button></div>
               }
             </div>   
               <button className="image-select-btn" onClick={addImage}>Save Image</button>
               <button className="image-select-btn" onClick={Post}>Publish </button>
            </form>
            
            </div>
        </div>
        </animated.div>
    )  
        
}

export default PostImputer
