import React, { useState, useEffect } from 'react'
import FbImageGrid from 'react-fb-image-grid';
import Maps from '../Components/Maps'
import Post from '../Components/PostComponents/Post'
import { doc, updateDoc, getFirestore, arrayUnion, } from 'firebase/firestore'

const PostList = ({ posts, user, userImg, userID }) => {
    const [list, setList] = useState(posts)
    const [userName, setUserName] = useState(user)
    const [docs, setDocs] = useState()

    console.log(user)
    const db = getFirestore()
    console.log(posts)
    let arr = []
    console.log(userImg)

    console.log(arr)

    useEffect(() => {
        setList(posts)
    }, [posts])

    useEffect(() => {
        setUserName(user)
    }, [user])


    async function addLike(e) {


        const postRef = doc(db, "posts", docs)

        try {
            await updateDoc(postRef, {
                like: arrayUnion({ userImg, userName })
            })
        } catch {
            console.error("something went wrong!")
        }



    }




    return (
        <div className="post-list">
            {list.map((item) => {
                return <Post key={item.id} like={item.like} title={item.text} id={item.id} src={item.src} location={item.location} author={item.person} authorImg={item.userImg} userId={item.userId} currentUserId={userID} currentUser={user} currentUserImg={userImg} comment={item.comments} />
            })}


        </div>
    )
}

export default PostList
