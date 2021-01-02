import React, { useContext } from 'react';
import {useState} from 'react';
import "./style.css";
import { signInWithGoogle } from "../../services/auth";
import { UserContext } from "../../contexts/user";

const SignInBtn = () => {
    const [user, setUser] = useContext(UserContext).user;

    const signInBtnClick = async () => {
        let tempUser = await signInWithGoogle();
        if (tempUser) setUser(tempUser);
        console.log(tempUser);
    };

    return (
    <div className="signInBtn" onClick={signInBtnClick}>
        <p>Sign In With Google</p>
    </div>
    );
}
 
export default SignInBtn;