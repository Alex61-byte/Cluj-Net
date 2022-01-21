import React, { useEffect, useState } from 'react'
import { useAuth } from '../Contexts/AuthContext'
import Maps from './Maps';

export default function PostPreview({ userName, usersPlace, postImg, }) {
    console.log(postImg)
    const { currentUser } = useAuth();

    if (usersPlace && (postImg === "" || postImg == null)) {
        return <div className="post-preview" >
            <p><span>{userName}</span> is at <span>{usersPlace}</span></p>
            <Maps usersPlace={usersPlace} src={postImg} />
        </div>
    } else if (postImg !== null && usersPlace !== undefined) {
        return <div className="post-preview">
            <p>{userName} is at {usersPlace}</p>
            <div className="post-image-container">
                <img src={postImg.image} alt="post" width="50%" />
            </div>
        </div>
    } else if (postImg !== null) {
        return <div className="post-preview">
            <div className="post-image-container">
                <img src={postImg.image} alt="post" width="50%" />
            </div>
        </div>
    } else {
        return <div></div>
    }







}   
