import React from 'react'
import {FaComment} from 'react-icons/fa'

export default function CommentButton({setShowCommentInput,setDocs,id}) {
      function handelClick(){
          setShowCommentInput(true)
          setDocs(id)
      }
    return (
        <div className="comment-button"   >
            <h6 id={id} onClick={ handelClick}><FaComment/> Comment</h6>
        </div>
    )
}
