import React from 'react'
import {AiTwotoneLike} from 'react-icons/ai'

export default function LikeButton({id,addLike,setDocs}) {
    return (
        <div className="like-button" id={id} onMouseEnter={(e)=>setDocs(e.target.id)} onMouseLeave={(e)=>setDocs(null)} >
              <h6 onClick={(e)=>addLike(e)}><AiTwotoneLike/> Like</h6>
        </div>
    )
}
