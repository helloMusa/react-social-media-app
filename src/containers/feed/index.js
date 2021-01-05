import React, { useState, useEffect } from 'react';
import "./style.css";
import { Post } from '..';
import { db } from "../../firebase";


function Feed({username}) {

    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        if (username == "") {
            console.log("no username");
            db.collection("posts")
            .orderBy("timestamp", "desc").onSnapshot((snapshot) => {
                setPosts(snapshot.docs.map((doc) => (
                    { id: doc.id, post: doc.data() }
                )));
            });
        } else if (username != "") {
            console.log(username);
            db.collection("posts")
            .where("username", "==", username)
            .orderBy("timestamp", "desc").onSnapshot((snapshot) => {
                setPosts(snapshot.docs.map((doc) => (
                    { id: doc.id, post: doc.data() }
                )));
            });
        }
    }, [])

    return (
        <div className="feed">
            {posts.map(({id, post}) => {
                return (
                    <Post
                    key={id}
                    id={id}
                    profileUrl={post.profileUrl}
                    username={post.username}
                    photoUrl={post.photoUrl}
                    caption={post.caption}
                    comments={post.comments}
                    />
                );
            })}
        </div>
    )
};

export default Feed;
