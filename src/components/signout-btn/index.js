import React, { useContext } from 'react';
import "./style.css";
import { logout } from "../../services/auth";
import { UserContext } from "../../contexts/user";

function SignOutBtn() {
    const [user, setUser] = useContext(UserContext).user;
    
    const signOutBtnClick = async () => {
        let logout_success = await logout();
        if (logout_success) setUser(null);
        console.log(user);
    };

    return (
        <div className="signOutBtn" onClick={signOutBtnClick}>
            <p>Sign Out</p>
        </div>
    )
};

export default SignOutBtn;
