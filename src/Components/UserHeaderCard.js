import React, { useState, useEffect } from 'react'
import { getFirestore, updateDoc, doc, arrayUnion } from 'firebase/firestore'
import ContactRequests from './ContactRequests'
import { AiOutlineUserSwitch } from 'react-icons/ai'
import ContactList from './ContactList'
import CompanyLIst from './CompanyLIst'
import { FiUser } from 'react-icons/fi'

export default function UserHeaderCard({ userInfo, currentUser, id, setUpdated, updated, company, owner }) {
    const [userDetails, setUserDetails] = useState(userInfo)
    console.log(userDetails)
    const [userId, setUserId] = useState(id)
    const [actualUser, setActualUser] = useState(currentUser)
    const [targetUser, setTargetUser] = useState(null)
    const [showRequests, setShowRequests] = useState(false)
    console.log(targetUser)
    const [contactRequests, setContactRequests] = useState()
    console.log(contactRequests)
    const [declinedContact, setDeclinedContact] = useState([])
    const [contactList, setContactList] = useState()
    const [companyList, setCompanyList] = useState(company)


    let requested;
    let declined;
    let connected;


    if (declinedContact !== undefined) {
        const foundDeclined = declinedContact.find(function (item, index) {
            if (item.userid === actualUser.uid) {
                return true
            }
        })
        declined = foundDeclined
    }

    if (contactList !== undefined) {
        const foundConnection = contactList.find(function (item, index) {
            if (item.userid === actualUser.uid) {
                return true
            }

        })
        connected = foundConnection
    }

    useEffect(() => {
        setCompanyList(company)
    }, [company, id])


    useEffect(() => {
        let arr = []
        userDetails.forEach((item) => {
            if (item.contactRequest !== undefined) {
                item.contactRequest.map((item) => {
                    return arr.push(item)
                })
            }

            setContactRequests(arr)
        })
        let declinedArr = []
        userDetails.forEach((item) => {
            if (item.declinedContac !== undefined) {
                item.declinedContac.map((item) => {
                    return declinedArr.push(item)
                })
            }
            setDeclinedContact(declinedArr)
        })

        let contactsArr = []
        userDetails.forEach((item) => {
            if (item.contacts !== undefined) {
                item.contacts.map((item) => {
                    return contactsArr.push(item)
                })
            }
            setContactList(contactsArr)
        })


    }, [userDetails, userInfo]);



    useEffect(() => {
        setActualUser(currentUser)
    }, [currentUser])
    useEffect(() => {
        setUserDetails(userInfo)
    }, [userInfo])

    async function addContact(e) {
        const db = getFirestore()
        const userRef = doc(db, "users", targetUser);

        await updateDoc(userRef, {
            contactRequest: arrayUnion({ userid: actualUser.uid, userImg: actualUser.photoURL, userName: actualUser.displayName, userEmail: actualUser.email })
        })
        setUpdated(!updated)
    }
    if (contactRequests !== undefined) {
        const found = contactRequests.find(function (item, index) {
            if (item.userid === actualUser.uid) {
                return true
            }
        })
        requested = found

    }





    if (actualUser.uid !== id) {
        return (
            <div className="user-top-card" >
                {userDetails.map((item) => {
                    if (requested || declined) {
                        return <div className="user-top-card-row" key={item.id} >
                            <div className="user-top-card-col-25">
                                <div className="user-top-card-img-container" >
                                    {item.src !== "" ? <img src={item.src} alt="user-pic" width="100%" /> : <FiUser style={{ fontSize: "7em", transform: 'translate(45%,50%)' }} />}
                                </div>
                            </div>
                            <div className="user-top-card-col-75">
                                <h3>{item.user}</h3>
                                <h4>{item.city}</h4>
                                <p>Birthday:{item.birthday.substring(5, 10)}</p>
                                <button className="add-contact" id={item.id} onMouseEnter={(e) => setTargetUser(e.target.id)} onMouseLeave={(e) => setTargetUser(null)} onClick={(e) => addContact(e)} disabled>Requested</button>
                                <ContactList contactList={contactList} />
                                {(companyList !== undefined && owner === id) ? <CompanyLIst companyList={companyList} /> : null}
                            </div>

                        </div>
                    } else if (connected) {
                        return <div className="user-top-card-row" key={item.id} >
                            <div className="user-top-card-col-25">
                                <div className="user-top-card-img-container">
                                    {item.src !== "" ? <img src={item.src} alt="user-pic" width="100%" /> : <FiUser style={{ fontSize: "7em", transform: 'translate(45%,50%)' }} />}
                                </div>
                            </div>
                            <div className="user-top-card-col-75">
                                <h3>{item.user}</h3>
                                <h4>{item.city}</h4>
                                <p>Birthday:{item.birthday.substring(5, 10)}</p>
                                <button className="add-contact" id={item.id} onMouseEnter={(e) => setTargetUser(e.target.id)} onMouseLeave={(e) => setTargetUser(null)} onClick={(e) => addContact(e)} disabled>Connected</button>
                                <ContactList contactList={contactList} />
                                {(companyList !== undefined && owner === id) ? <CompanyLIst companyList={companyList} /> : null}
                            </div>
                        </div>
                    } else {
                        return <div className="user-top-card-row" key={item.id} >
                            <div className="user-top-card-col-25">
                                <div className="user-top-card-img-container">
                                    {item.src !== "" ? <img src={item.src} alt="user-pic" width="100%" /> : <FiUser style={{ fontSize: "7em", transform: 'translate(45%,50%)' }} />}
                                </div>
                            </div>
                            <div className="user-top-card-col-75">
                                <h3>{item.user}</h3>
                                <h4>{item.city}</h4>
                                <p>Birthday:{item.birthday.substring(5, 10)}</p>
                                <button className="add-contact" id={item.id} onMouseEnter={(e) => setTargetUser(e.target.id)} onMouseLeave={(e) => setTargetUser(null)} onClick={(e) => addContact(e)}>Add to Contacts</button>
                                <ContactList contactList={contactList} />
                                {(companyList !== undefined && owner === id) ? <CompanyLIst companyList={companyList} /> : null}
                            </div>
                        </div>
                    }
                })}


            </div>
        )
    } else {
        return <div className="user-top-card" >
            {userDetails.map((item) => {
                if (item.contactRequest !== undefined) {
                    return <div className="user-top-card-row" key={item.id}>
                        <div className="user-top-card-col-25">
                            <div className="user-top-card-img-container">
                                {(item.src !== "") ? <img src={item.src} alt="user-pic" width="100%" /> : <FiUser style={{ fontSize: "7em", transform: 'translate(45%,50%)' }} />}
                            </div>
                        </div>
                        <div className="user-top-card-col-75">
                            <h3>{item.user}</h3>
                            <h4>{item.city}</h4>
                            <p>Birthday:{item.birthday.substring(5, 10)}</p>
                            <button className="show-requests" onClick={(e) => setShowRequests(!showRequests)}><AiOutlineUserSwitch style={{ marginTop: "0px", fontSize: "1.6em" }} /> <span style={{ color: "red" }}>{item.contactRequest.length}</span> </button>
                            {showRequests && <div className="request-container">
                                {item.contactRequest.map((item) => {
                                    return <ContactRequests userEmail={item.userEmail} userImg={item.userImg} userid={item.userid} userName={item.userName} currentUser={currentUser} key={item.userid} setUpdated={setUpdated} />
                                })}
                            </div>}
                            <ContactList contactList={contactList} />
                            {(companyList !== undefined) ? <CompanyLIst companyList={companyList} /> : null}

                        </div>
                    </div>
                } else {
                    return <div className="user-top-card-row" key={item.id}>
                        <div className="user-top-card-col-25">
                            <div className="user-top-card-img-container">
                                {(item.src !== "") ? <img src={item.src} alt="user-pic" width="100%" /> : <FiUser style={{ fontSize: "7em", transform: 'translate(45%,50%)' }} />}
                            </div>
                        </div>
                        <div className="user-top-card-col-75">
                            <h3>{item.user}</h3>
                            <h4>{item.city}</h4>
                            <p>Birthday:{item.birthday.substring(5, 10)}</p>
                            <ContactList contactList={contactList} />
                            {(companyList !== undefined) ? <CompanyLIst companyList={companyList} /> : null}
                        </div>
                    </div>
                }
            })}


        </div>

    }
}
