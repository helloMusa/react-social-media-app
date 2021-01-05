import React, { useState, useContext } from 'react';
import "./style.css";
import { Feed } from '../../containers';
import { SignOutBtn } from '../../components';
import { UserContext } from '../../contexts/user';
import { useParams } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

function Profile() {
    const [user, setUser] = useContext(UserContext).user;
    // const [username, setUsername] = useState("");
    // const [bio, setBio] = useState("");
    const [image, setImage] = useState(null);

    let { username } = useParams();

    // const handleImageChange = (e) => {
    //     let img = e.target.files[0];
    //     if (img) {
    //         setImage(img);
    //         let selectedImageSrc = URL.createObjectURL(img);
    //         let profileImg = document.getElementById("profile_img");
    //         profileImg.src = selectedImageSrc;
    //     }
    // };

    // Update profile picture in database
    const handleUpload = () => {

    }

    const handleTextChange = (({name, value}) => {
        console.log(`${name} is now ${value}`);
    });

    return (
        <div className="profile">
            <div className="profile_main">
                <div className="profile_imageUpload">
                    <label htmlFor="fileInput">
                        <Avatar id="profile_img" className="profile_img" style={{ height: '100px', width: '100px' }} src="https://lh3.googleusercontent.com/-5Kl7_-y-_5U/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnfGHL8pithfUiFg-oI_C1xBi8PAg/s96-c/photo.jpg"/>
                    </label>
                    <input
                    id="fileInput"
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} />
                </div>
                <div className="profile_info">
                    <EditText
                    name="username"
                    value={username}
                    onSave={handleTextChange}
                    />
                    <div className="profile_counts">
                        <p><strong>1</strong> posts <strong>5</strong> followers <strong>2</strong> following</p>
                    </div>
                    <div className="profile_bio">
                        <EditText
                        name="bio"
                        value="This is my bio!"
                        onSave={handleTextChange}
                        />
                    </div>
                </div>
            </div>
            {/* <SignOutBtn /> */}
            <Feed username={"esquitoban"}/>
        </div>
    );
}

export default Profile;
