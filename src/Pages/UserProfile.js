import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDocs, query, getFirestore, collection, where } from 'firebase/firestore'
import UserHeaderCard from '../Components/UserHeaderCard'
import PostLIst from '../Components/PostList'
import { useAuth } from '../Contexts/AuthContext'
import Nav from '../Components/Nav'
import { AuthProvider } from '../Contexts/AuthContext'
import PostList from '../Components/PostList'
import BackButton from '../Components/BackButton'




const UserProfile = () => {
    const { currentUser } = useAuth()
    const { id } = useParams()
    console.log(id)
    console.log(currentUser)
    const [userPost, setUserPost] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [pending,setPending] = useState(false)
    console.log(userInfo)
    console.log(userPost)
    const[updated,setUpdated] = useState(false)
    const[company,setCompany] =useState()
    const [owner,setOwner] = useState("")




    useEffect(() => {
        async function getUserProfile() {
            setPending(true)
            const db = getFirestore()
            const userRef = collection(db, "users")
            const q = query(userRef, where("userId", "==", id))
            const postsRef = collection(db, "posts")
            const q1 = query(postsRef, where("userId", "==", id))
            const companyRef=collection(db, "company")
            const q2=query(companyRef,where("owner","==", id))
            let postsArr = []
            let infoArr = []
            let companyArr=[]

            const querySnaphotUser = await getDocs(q)
            querySnaphotUser.forEach((doc) => {
                console.log(doc.id, "=>", doc.data())
                infoArr.push({ id: doc.id,userId:doc.data().userID, user: doc.data().userName, city: doc.data().location, birthday: doc.data().birthday, src: doc.data().profileImg, age: doc.data().age,contactRequest: doc.data().contactRequest,declinedContact:doc.data().declinedContact,contacts: doc.data().contacts})
                setUserInfo(infoArr)
                
            })
            const querySnapshotPosts = await getDocs(q1)
            querySnapshotPosts.forEach((doc) => {
                console.log(doc.id, "=>", doc.data())
                postsArr.push({ id: doc.id, author: doc.data().author, location: doc.data().location, text: doc.data().postText, date: doc.data().date, src: doc.data().imgSrc, person: doc.data().person, like: doc.data().like, userImg: doc.data().userImg, userId: doc.data().userId })
                setUserPost(postsArr)
                
                
                console.log(postsArr)
            })

            const querySnapshotCompany= await getDocs(q2)
            querySnapshotCompany.forEach((doc) => {
                console.log(doc.id,"=>",doc.data())
                companyArr.push({id:doc.id,name:doc.data().name,city:doc.data().city,adress:doc.data().street,image:doc.data().image})
                setCompany(companyArr)
                setOwner(doc.data().owner)
                
            })

            setPending(false)
           


        }
        getUserProfile()
        

    }, [id,updated])

    if(pending){
        return <div className="loading"></div>
    }


    return (
        <div>
            <AuthProvider>
                <BackButton/>

                <UserHeaderCard userInfo={userInfo} id={id} currentUser={currentUser} setUpdated={setUpdated} updated={updated} company={company} owner={owner}/>
                <PostLIst posts={userPost} user={currentUser.displayName} userImg={currentUser.photoURL} userID={currentUser.uid}/>
           
            </AuthProvider>
        </div>
    )
}

export default UserProfile
