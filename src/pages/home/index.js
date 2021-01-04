import React from 'react';
import "./style.css";
import { SignInBtn } from '../../components';
import { CreatePost, Navbar } from '../../containers';
import Feed from '../../containers/feed';

function Home() {
    return (
        <div className="home">
            <Navbar />
            <CreatePost />
            <Feed />
        </div>
    );
}

export default Home;
