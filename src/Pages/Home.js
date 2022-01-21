import React, { useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import PostImputer from '../Components/PostImputer'
import { AuthProvider } from '../Contexts/AuthContext'
import { useAuth } from '../Contexts/AuthContext'
import { query, collection, getDocs, getFirestore, onSnapshot } from "firebase/firestore";
import PostList from '../Components/PostList'
import SearchResults from '../Components/SearchResults'

import { Link } from 'react-router-dom'





const Home = () => {
    const { currentUser } = useAuth()
    const [post, setPost] = useState(false)
    const [posts, setPosts] = useState([])
    const [showPosts, setShowPosts] = useState(true)
    const [showSearchResults, setShowSearchResults] = useState(false)
    const [results, setResults] = useState([])
    const [showMenu, setShowMenu] = useState(false)
    const [pending, setPending] = useState(false)




    console.log(posts)

    useEffect(() => {
        if (showSearchResults === true) {
            setShowPosts(false)
        } else {
            setShowPosts(true)
        }
    }, [showSearchResults])


    useEffect(() => {
        async function getPosts() {
            setPending(true)
            const db = getFirestore()
            let arr = []
            const querySnapshot = await getDocs(collection(db, "posts"));

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                arr.push({ id: doc.id, author: doc.data().author, location: doc.data().location, text: doc.data().postText, date: doc.data().date, src: doc.data().imgSrc, person: doc.data().person, like: doc.data().like, userImg: doc.data().userImg, userId: doc.data().userId, comments: doc.data().comment });

            });
            console.log(arr)
            setPosts(arr)
            setPending(false)
        }

        getPosts()


    }, [post])









    function close() {
        setPost(false)
    }

    if (pending) {
        return <div className="loading"></div>
    }
    /*if(windowSize<1000){
        return <div className="home"><h1>Please Use A Pc or Notebook</h1></div>
    }*/
    if (currentUser) {
        return <div className="home">

            <Nav currentUser={currentUser} setShowSearchResults={setShowSearchResults} setResults={setResults} setShowMenu={setShowMenu} showMenu={showMenu} />



            <div className="post-btn-container">
                <button className="sign-up-btn" onClick={(e) => setPost(true)}>Create a post</button>
                <Link to="/CompanyRegistration"><button className="sign-up-btn">Create a Company Page</button></Link>
            </div>


            <div className="home-right-user">

                {post && <PostImputer currentUser={currentUser} close={close} />}
                {showPosts && <PostList posts={posts} user={currentUser.displayName} userImg={currentUser.photoURL} userID={currentUser.uid} />}
                {showSearchResults && <SearchResults results={results} setShowPosts={setShowPosts} setShowSearchResults={setShowSearchResults} />}

            </div>
        </div>



    } else {
        return <div className="home">
            <AuthProvider><Nav currentUser={currentUser} /></AuthProvider>
            <div className="container-home">
                <div className="home-left">
                    <div className="social-container">
                        <h1>Social Network </h1>
                        <div className="social-img-container">
                            <img src="https://cdn.pixabay.com/photo/2020/08/22/11/21/network-5508173_960_720.png" alt="Social network" width="100%" />
                        </div>
                    </div>
                </div>
                <div className="home-right">

                    <div className="local-container">
                        <h1 className="first">Local Businesses</h1>
                        <div className="local-1">

                            <img src="https://cdn.pixabay.com/photo/2012/04/03/22/49/fruits-25266__340.jpg" alt="Local" width="100%" />
                        </div>
                    </div>

                    <div className="job-container">
                        <h1 className="second">Local Work Offers</h1>
                        <div className="job-img-container">
                            <img src="https://cdn.pixabay.com/photo/2020/02/10/02/36/interview-4835116__340.jpg" alt="job" width="100%" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    }
}

export default Home;
