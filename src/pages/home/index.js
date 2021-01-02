import React from 'react';
import "./style.css";
import { SignInBtn } from '../../components';
import { CreatePost, Navbar } from '../../containers';

function Home() {
    return (
        <div className="home">
            <Navbar />

            <CreatePost />
        </div>
    );
}

export default Home;
