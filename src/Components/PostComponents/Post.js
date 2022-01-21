import React, { useState } from 'react'
import PostLocation from './PostLocation'
import PostUser from './PostUser'
import Maps from '../Maps'
import FbImageGrid from 'react-fb-image-grid';
import PostTitle from './PostTitle'
import LikeButton from './LikeButton'
import CommentButton from './CommentButton'
import PostLike from './PostLike'
import { doc, updateDoc, getFirestore, arrayUnion, } from 'firebase/firestore'
import { CommentInput } from './CommentInput';
import PostComments from './PostComments'
import Image from './Image';




export default function Post({ like, title, id, src, location, author, authorImg, userId, currentUserId, currentUser, currentUserImg, comment }) {
    const [showLocation, setShowLocation] = useState(false)
    const [docs, setDocs] = useState(null)
    const [showCommentInput, setShowCommentInput] = useState(false)
    const [commentText, setCommentText] = useState("")
    console.log(docs)
    console.log(currentUserImg, currentUser, currentUserId)

    async function addLike(e) {

        const db = getFirestore()
        const postRef = doc(db, "posts", docs)

        try {
            await updateDoc(postRef, {
                like: arrayUnion({ currentUserImg, currentUser, currentUserId })
            })
        } catch {
            console.error("something went wrong!")
        }

        window.location.reload()

    }
    async function addComment(e) {
        e.preventDefault();
        const db = getFirestore()
        const postRef = doc(db, "posts", docs)
        try {
            await updateDoc(postRef, {
                comment: arrayUnion({ currentUserImg, currentUser, currentUserId, commentText })
            })
        } catch {
            console.log("something went wrong!")
        }
        setCommentText('')
        setShowCommentInput(false)
        setDocs(null)
        window.location.reload()
    }



    return (
        <div className="post" key={id} id={id} >

            <div className="post-header">
                <PostUser author={author} authorImg={authorImg} userId={userId} />
                <PostLocation location={location} setShowLocation={setShowLocation} src={src} showLocation={showLocation} />
            </div>
            <div className="post-content">
                <PostTitle title={title} />
                <Image src={src} />
                {showLocation && <Maps usersPlace={location} src={src} />}
                <PostLike like={like} />

            </div>
            <div className="post-footer">
                <LikeButton id={id} addLike={addLike} setDocs={setDocs} />
                <CommentButton id={id} setDocs={setDocs} setShowCommentInput={setShowCommentInput} />
            </div>
            {showCommentInput && <CommentInput setShowCommentInput={setShowCommentInput} setCommentText={setCommentText} addComment={addComment} />}
            <PostComments commentList={comment} />

        </div>
    )

}
