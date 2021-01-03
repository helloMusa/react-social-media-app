import React, { useContext, useState } from 'react';
import "./style.css";
import { SignInBtn } from '../../components';
import { UserContext } from "../../contexts/user";
import makeid from "../../helper/functions";
import { db, storage } from "../../firebase";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import firebase from "firebase";

function CreatePost() {
    const [user, setUser] = useContext(UserContext).user;
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    // Show uploaded image preview
    const handleChange = (e) => {
        let img = e.target.files[0];
        if (img) {
            setImage(img);
            let selectedImageSrc = URL.createObjectURL(img);
            let imagePreview = document.getElementById("image-preview");
            imagePreview.src = selectedImageSrc;
            imagePreview.style.display = "block";
        }
    };

    // Add image to database
    const handleUpload = () => {
        if (image) {
            let imageName = makeid(10);
            const uploadTask = storage.ref(`images/${imageName}.jpg`)
            .put(image);

            uploadTask.on("state_changed", (snapshot) => {
                // track progress (1%, 2%, ..., 100%)
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);

            }, (error) => {
                 console.log(error);
            }, () => {
                // get download URL and upload post
                storage
                .ref("images")
                .child(`${imageName}.jpg`)
                .getDownloadURL()
                .then((imageUrl) => {
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        photoUrl: imageUrl,
                        username: user.email.replace("@gmail.com", ""),
                        profileUrl: user.photoURL
                    });
                })
             });
        }
    }

    return (
        <div className="createPost">
            {user ? (
                <div className="createPost_loggedIn">
                    <p> Create Post </p>
                    <div className="CreatePost_loggedInCenter">
                        <textarea className="createPost_textarea"
                         rows="3"
                         placeholder="Enter caption here..."
                         value={caption}
                         onChange={(e) => setCaption(e.target.value)}>
                         </textarea>

                        <div className="createPost_imagePreview">
                            <img id="image-preview" alt="" />
                        </div>

                    </div>
                    <div className="createPost_loggedInBottom">
                        <div className="createPost_imageUpload">
                            <label htmlFor="fileInput">
                                <AddAPhotoIcon style={{ cursor:"pointer", fontSize:"20px" }}/>
                            </label>
                            <input
                            id="fileInput"
                            type="file" 
                            accept="image/*" 
                            onChange={handleChange} />
                        </div>
                        <button className="createPost_uploadBtn"
                        onClick={handleUpload}
                        style={{ color: caption ? "#000" : "lightgrey" }}>
                            {`Upload Post ${progress != 0 ? progress : ""}`}
                        </button>  
                    </div>
                </div>
            ) : (
                <div>
                    <SignInBtn />
                    <p style={{ marginLeft: "12px" }}>to Post & Comment</p>
                </div>
            )}
        </div>
    );
}

export default CreatePost;
