import React,{useState,useEffect} from 'react'
import Maps from './Maps'
import FbImageLibrary from 'react-fb-image-grid'
import { doc,updateDoc, getFirestore, arrayUnion,   } from 'firebase/firestore'
import { useAuth } from '../Contexts/AuthContext'


export default function UserPosts({userPost,loggedUser}) {
  const [posts,setPosts]=useState(userPost)
  const [docs,setDocs]=useState("")
  
  useEffect(()=>{
      setPosts(userPost)
  },[userPost])
  async function addLike(e){
    
    const db =getFirestore()
    const postRef= doc(db,"posts",docs)

    try{
        await updateDoc(postRef,{
            like:arrayUnion({loggedUser})
        })
    }catch{
        console.error("something went wrong!")
    }


    
}
    return (
        <div className="user-posts-container">
            {posts.map((item)=>{
                 if (item.src !== "" && item.location === ""&&item.like===undefined) {
                    return <div className="post" key={item.id} id={item.id}>
                        <h1>{item.text}</h1>
                        <FbImageLibrary images={[item.src]} countForm={1} hideOverlay={true}/>
                        <p>{item.person} <span>{item.date}</span></p>

                      
                           

                           
                        <div className="post-buttons">
                            <div className="like" id={item.id} onMouseEnter={(e)=> setDocs(e.target.id)} onClick={addLike}>Like</div>
                            <div className="comment" id={item.id}>Comment</div>
                        </div>
                    </div>
                } else if (item.src !== "" && item.location !== ""&&item.like!==undefined&&item.like.length>1) {
                    return <div className="post" key={item.id} id={item.id}>
                        <h1>{item.person} is at {item.location}</h1>

                        <FbImageLibrary images={[item.src]} hideOverlay={true}/>

                        <p>{item.person} <span>{item.date}</span></p>
                     
                       
                     <p>Liked by <span>{item.like[0].userName} and another{item.like.length-1} people</span> </p>        
                        
                    
                        <div className="post-buttons">
                            <div className="like" id={item.id} onMouseEnter={(e)=> setDocs(e.target.id)} onClick={addLike}>Like</div>
                            <div className="comment" id={item.id}>Comment</div>
                        </div>
                    </div>

                }else if(item.src !== "" && item.location !== ""&&item.like!==undefined&&item.like.length<=1){    

                    return <div className="post" key={item.id} id={item.id}>
                    <h1>{item.person} is at {item.location}</h1>

                    <FbImageLibrary images={[item.src]} hideOverlay={true}/>

                    <p>{item.person} <span>{item.date}</span></p>
                 
                   
                 <p>Liked by <span>{item.like[0].userName} </span> </p>        
                    
                
                    <div className="post-buttons">
                        <div className="like" id={item.id} onMouseEnter={(e)=> setDocs(e.target.id)} onClick={addLike}>Like</div>
                        <div className="comment" id={item.id}>Comment</div>
                    </div>
                </div>



                }else if(item.src!==""&&item.location!==""&&item.like===undefined){
                   return <div className="post" key={item.id} id={item.id}>
                    <h1>{item.person} is at {item.location}</h1>

                    <FbImageLibrary images={[item.src]} hideOverlay={true}/>

                    <p>{item.person} <span>{item.date}</span></p>
                    
                   
                    <div className="post-buttons">
                        <div className="like" id={item.id} onMouseEnter={(e)=> setDocs(e.target.id)} onClick={addLike}>Like</div>
                        <div className="comment" id={item.id}>Comment</div>
                    </div>
                </div>
                        
                   

                } else if (item.src === "" && item.location !== ""&&item.like===undefined) {
                    return <div className="post" key={item.id} id={item.id}>
                        <h1>{item.text}</h1>
                        <Maps usersPlace={item.location} />
                      
                        <div className="post-buttons">
                            <div className="like" id={item.id} onMouseEnter={(e)=> setDocs(e.target.id)} onMouseLeave={(e)=>setDocs(null)} onClick={addLike}>Like</div>
                            <div className="comment" id={item.id}>Comment</div>
                        </div>
                    </div>
                }else{
                    return null
                }
            })}
            
        </div>
    )
}
