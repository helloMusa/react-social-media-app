import React from 'react';
import "./style.css";
import { SignInBtn } from '../../components';

function CreatePost() {
    return (
        <div className="createPost">
            <SignInBtn />
            <p style={{ marginLeft: "12px" }}>to Post & Comment</p>
        </div>
    );
}

export default CreatePost;
