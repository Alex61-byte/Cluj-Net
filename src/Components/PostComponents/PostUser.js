import React from 'react'
import { Link } from 'react-router-dom'
import { FiUser } from 'react-icons/fi'
export default function PostUser({ author, authorImg, userId }) {
    if (authorImg !== null) {
        return (
            <Link to={`/UserProfile/${userId}`}> <div className="post-user">
                <div className="post-user-img-container" >
                    <img src={authorImg} alt={author} width="100%" />
                </div>
                <div className="post-user-name"><p>{author}</p></div>
            </div>
            </Link>
        )
    } else {
        return (
            <Link to={`/UserProfile/${userId}`}> <div className="post-user">
                <div className="post-user-img-container" >
                    <FiUser style={{ fontSize: "2em", transform: 'translate(0,30%)' }} />
                </div>
                <div className="post-user-name"><p>{author}</p></div>
            </div>
            </Link>
        )
    }
}
