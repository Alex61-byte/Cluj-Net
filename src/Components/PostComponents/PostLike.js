import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiTwotoneLike } from 'react-icons/ai'
import { FiUser } from 'react-icons/fi'

export default function PostLike({ like }) {
    const [showLike, setShowLike] = useState(false)
    if (like !== undefined) {
        return (
            <div className="post-like">
                {like.length === 1 ? <p onClick={(e) => setShowLike(!showLike)}>{like.length} like< AiTwotoneLike style={{ fontSize: "0.7em" }} /></p> : <p onClick={(e) => setShowLike(!showLike)}>{like.length} likes< AiTwotoneLike style={{ fontSize: "0.7em" }} /></p>}
                {showLike && <div className="post-like-list">
                    <div className="post-like-close" onClick={(e) => setShowLike(false)}>X</div>
                    {like.map((item) => {
                        return (
                            <Link to={`/UserProfile/${item.currentUserId}`} key={item.currentUserId}>
                                <div className="post-like-item" key={item.currentUserId} >
                                    <div className="post-like-image-container">
                                        {item.currentUserImg !== null ? <img src={item.currentUserImg} alt={item.currentUser} width="100%" /> : <FiUser style={{ fontSize: "2em", transform: 'translate(0,20%)' }} />}
                                    </div>
                                    <div className="post-like-user"><h6>{item.currentUser}</h6></div>

                                </div>
                            </Link>
                        )
                    })}
                </div>}
            </div>
        )
    } else {
        return <div className="post-like">
            <p>No like's yet</p>
        </div>
    }
}
