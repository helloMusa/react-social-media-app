import React, { useState, useContext } from 'react';
import "./style.css";
import { SignInBtn } from '../../components';
import { UserContext } from '../../contexts/user';
import { 
    BrowserRouter as Router,
    Link 
} from "react-router-dom";

function Navbar() {

    const [user, setUser] = useContext(UserContext).user;

    return (
        <Router>
            <div className="navbar">
                <p>NotInstagram</p>
                {user ? <Link to="/profile"><img className="navbar_img" src={user.photoURL}></img></Link> : <SignInBtn />}
            </div>
        </Router>

    );
}

export default Navbar;
