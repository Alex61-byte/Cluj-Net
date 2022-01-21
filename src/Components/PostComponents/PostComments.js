import React, { useState } from 'react'
import { FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const PostComments = ({ commentList }) => {
    const [show, setShow] = useState(false)
    if (commentList !== undefined) {
        return (
            <div className="post-comments">
                {commentList.length === 1 ? <p onClick={(e) => setShow(!show)}>{commentList.length} comment </p> : <p onClick={(e) => setShow(!show)}>{commentList.length} comments </p>}
                {show && <div className="post-comment-list">
                    <button onClick={(e) => setShow(false)} style={{ width: "20px", height: '20px', borderRadius: '50%', backgroundColor: '#334756', color: '#fff', position: 'absolute', top: '1%', right: '1%' }}> <p style={{ transform: 'translate(-50%,-10%)', textDecoration: 'none', }} >X</p> </button>
                    {commentList.map((com) => {
                        return <div className="comment-container" key={com.index}>
                            <Link to={`/UserProfile/${com.currentUserId}`}>
                                <div className="post-comment-img-container">
                                    {com.currentUserImg !== null ? <img src={com.currentUserImg} alt={com.currentUser} width="100%" /> : <FiUser style={{ transform: 'translate(0,30%)' }} />}
                                </div>
                                <p>{com.currentUser}</p>
                            </Link>
                            <div className="post-comment-text">{com.commentText}</div>
                        </div>
                    })}
                </div>}
            </div >
        )
    } else {
        return <div className="post-comments">
            <p>No comments yet</p>
        </div>
    }
}

export default PostComments
