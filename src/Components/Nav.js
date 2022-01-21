import React, { useEffect, useState } from 'react'
import logo from '../Resources/logo.png'
import { Link, useLocation } from 'react-router-dom'
import { FiUser } from 'react-icons/fi'
import SignOut from '../Pages/SignOut'
import SearchBox from './SearchBox'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'



function Nav({ currentUser, setResults, setShowSearchResults, }) {
    const [windowSize, setWindowSize] = useState(window.screen.width)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.screen.width)
        }

        window.addEventListener('resize', handleResize)


    }, [windowSize])

    console.log(currentUser)

    if (windowSize >= 768) {
        if (currentUser && currentUser.photoURL != null) {

            return <div className="nav-container">

                <div className="logo-center">
                    <img src={logo} alt="logo" width="100%" />
                </div>
                <div className="nav-right">
                    <SearchBox setResults={setResults} setShowSearchResults={setShowSearchResults} />
                    <Link to={`/UserProfile/${currentUser.uid}`}><div className="nav-right-inner">
                        <div className="nav-img-container">
                            <img className="nav-img img-fluid" src={currentUser.photoURL} alt="Img" width="100%" />
                        </div>
                        <p>{currentUser.displayName}</p>
                    </div>
                    </Link>
                    <SignOut />
                </div>


            </div>
        } else if (currentUser && (currentUser.photoURL === null || currentUser.photoURL === undefined)) {
            return <div className="nav-container">

                <div className="logo-center">
                    <img src={logo} alt="logo" width="100%" />
                </div>
                <div className="nav-right">
                    <SearchBox setResults={setResults} setShowSearchResults={setShowSearchResults} />
                    <Link to={`/UserProfile/${currentUser.uid}`}><div className="nav-right-inner">
                        <div className="nav-img-container" style={{ textAlign: 'center' }}>
                            <FiUser style={{ fontSize: "2em", transform: 'translate(0,50%)' }} />
                        </div>
                        <p>{currentUser.displayName}</p>
                    </div>
                    </Link>
                    <SignOut />
                </div>


            </div>
        } else {
            return <div className="nav-container">
                <div className="nav-left">
                    <h1>From People to People</h1>
                </div>
                <div className="logo-center">
                    <img src={logo} alt="logo" width="100%" />
                </div>
                <div className="nav-right">
                    <button><Link to="/SignUp">Sign Up</Link></button>
                    <button><Link to="/SignIn">Sign In</Link></button>
                </div>


            </div>
        }
    } else {
        if (currentUser && currentUser.photoURL != null) {
            return <div className="nav-container">
                <div className="nav-right">
                    <div className="nav-control">
                        <Link to={`/UserProfile/${currentUser.uid}`}><div className="nav-right-inner">
                            <div className="nav-img-container">
                                <img className="nav-img img-fluid" src={currentUser.photoURL} alt="Img" width="100%" />
                            </div>
                            <p>{currentUser.displayName}</p>
                        </div>
                        </Link>
                        {open ? <div className="open-close-btn"><AiOutlineClose onClick={e => setOpen(false)} /></div> : <div className="open-close-btn"><AiOutlineMenu onClick={e => setOpen(true)} /></div>}
                    </div>
                    {open && <SearchBox setResults={setResults} setShowSearchResults={setShowSearchResults} />}
                    {open && <SignOut />}
                </div>



            </div>
        } else if (currentUser && (currentUser.photoURL === null || currentUser.photoURL === undefined)) {
            return <div className="nav-container">
                <div className="nav-right">
                    <div className="nav-control">
                        <Link to={`/UserProfile/${currentUser.uid}`}><div className="nav-right-inner">
                            <div className="nav-img-container">
                                <FiUser style={{ fontSize: "2em", transform: 'translate(0,30%)' }} />
                            </div>
                            <p>{currentUser.displayName}</p>
                        </div>
                        </Link>
                        {open ? <div className="open-close-btn"><AiOutlineClose onClick={e => setOpen(false)} /></div> : <div className="open-close-btn"><AiOutlineMenu onClick={e => setOpen(true)} /></div>}
                    </div>
                    {open && <SearchBox setResults={setResults} setShowSearchResults={setShowSearchResults} />}
                    {open && <SignOut />}
                </div>



            </div>
        } else {
            return <div className="nav-container">
                <div className="nav-left">
                    <h1>From People to People</h1>
                </div>
                <div className="logo-center">
                    <img src={logo} alt="logo" width="100%" />
                </div>
                <div className="nav-right">
                    <button><Link to="/SignUp">Sign Up</Link></button>
                    <button><Link to="/SignIn">Sign In</Link></button>
                </div>


            </div>
        }
    }
}

export default Nav

