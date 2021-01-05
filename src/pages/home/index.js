import React from 'react';
import "./style.css";
import { CreatePost, Feed } from '../../containers';

function Home() {
    return (
        <div className="home">
            <CreatePost />
            <Feed username={""}/>
        </div>
    );
}

export default Home;
