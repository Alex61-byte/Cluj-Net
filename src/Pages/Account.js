import React, { useState, useRef, useEffect } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile } from '@firebase/auth';
import { doc, updateDoc, getFirestore } from "firebase/firestore"
import { useNavigate } from 'react-router-dom'

export default function Account() {
    const [userName, setUserName] = useState("")
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
        const [age, setAge] = useState()
    const [location, setLocation] = useState("")
    const [birthday, setBirthday] = useState()
    const [profileImg, setProfileImg] = useState(null)
    const [imgUrl, setImgUrl] = useState("")
    const [displayImg, setDisplayImg] = useState(null)
    const fileInput = useRef(null)
    const navigate=useNavigate()

    const handleClick = event => {
       fileInput.current.click();
    };

    const handleChange = event => {
        const uploadedFile = event.target.files[0];
        setDisplayImg(uploadedFile)
        setProfileImg(URL.createObjectURL(event.target.files[0]))
    };
    

    useEffect(()=>{
        setUserName(firstName+" "+lastName)
    },[firstName,lastName])


    function addImage() {
        const storage = getStorage();
        const storageRef = ref(storage, displayImg.name);

        const uploadTask = uploadBytesResumable(storageRef, displayImg);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                console.error(error);
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setImgUrl(downloadURL)
                });

            }
        );
    }

    async function saveChanges(e) {
        e.preventDefault();
        const auth = getAuth();
        const db = getFirestore()
        const user = auth.currentUser
        let email;
        let img;
        let uid;
        if (user !== null) {
            email = user.email
            img = user.photoURL
            uid=user.uid
            console.log(img)
        }
        const docRef = doc(db, "users", email)
        await updateProfile(auth.currentUser, {
            photoURL: imgUrl,
            displayName:userName
        }).then(() => {
            // Profile updated!
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });
        await updateDoc(docRef, {
            userName: firstName+" "+lastName,
            age: Number(age),
            birthday: birthday,
            location: location,
            profileImg: imgUrl,
            firstName:firstName,
            lastName:lastName,
            userId:uid,



        })
        e.target.reset()
        navigate("/")
    }



    return (
        <div className="card-account">
            <h1>Let's add your data</h1>
            <div className="row">
                <div className="col-25"><label htmlFor="picture">Add a Profile Picture</label></div>
                <button type="button" className="choose-file" onClick={handleClick} >Select A picture</button>
                <div className="col-75"><input type="file" name="image" id="image" accept="image/*" ref={fileInput} onChange={handleChange} capture="camera" style={{ display: "none" }} />

                </div>

            </div>
            <div className="card-body">
                {profileImg && <div className="img-btn-container">
                    <div className="img-container">
                        <img src={profileImg} alt="Your Upload File" width="100%" />
                    </div>
                    <div className="btn-container">
                        <button type="confirm" onClick={addImage}>Upload Image</button>
                    </div>
                </div>
                }
                <form  className="form-account" onSubmit={(e)=>saveChanges(e)}>
                    <div className="row">
                        <div className="col-25">
                            <label>First Name</label>
                        </div>
                        <div className="col-75">
                            <input type="text" required placeholder="Your First Name" onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="Last-Name">Last Name</label>
                        </div>
                        <div className="col-75">
                            <input type="text" required placeholder="Your Last Name" onChange={(e)=>setLastName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Age</label>
                        </div>
                        <div className="col-75">
                            <input type="number" step="1" placeholder="Your age" onChange={(e) => setAge(e.target.value)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25"><label htmlFor="location">Insert the place you live</label></div>
                        <div className="col-75"><input type="text" placeholder="City or Town" required onChange={(e) => setLocation(e.target.value)} /></div>
                    </div>
                    <div className="row">
                        <div className="col-25"><label htmlFor="birth-date">Your Birth Date</label></div>
                        <div className="col-75"><input type="date" placeholder="Your Birth day" required onChange={(e) => setBirthday(e.target.value)} /></div>
                    </div>


                    <button type="submit">Submit</button>
                </form>
            </div>


        </div>
    )
}
