import React, { useContext, useState } from 'react';
import "./style.css";
import { Comment } from '../../components';
import { db, storage } from "../../firebase";
import CommentInput from '../../components/comment-input';
import { UserContext } from '../../contexts/user';

function Post({
    profileUrl, 
    username, 
    id, 
    photoUrl, 
    caption, 
    comments,
    }) {

    const [user, setUser] = useContext(UserContext).user;

    // Delete image from Firebase storage
    const deletePost = () => {
        // get reference to the image file and delete the file
        let imageRef = storage.refFromURL(photoUrl);
        imageRef
            .delete()
            .then(() => {
                console.log("Deleted image succesfully")
            }).catch((error) => {
                console.log(`Error deleting image: ${error}`);
            });

        // delete post info from Firebase firestore
        db.collection("posts")
            .doc(id)
            .delete()
            .then(() => {
                console.log("Deleted post info succesfully")
            }).catch((error) => {
                console.log(`Error deleting post info: ${error}`);
            });
    };

    return (
        <div className="post">
            <div className="post_header">
                <div className="post_headerLeft">
                    <img className="post_profilePic" src={profileUrl} ></img>
                    <p style={{ marginLeft: "8px" }}>{username}</p>
                </div>
                {(() => {
                    if (user) {
                        let currUsername = user.email.replace("@gmail.com", "");
                        if (currUsername == username) {
                            return <button className="post_delete" onClick={deletePost}>Delete</button>
                        } else {
                            return <></>
                        }
                    } else {
                        return <></>
                    }
                })()}
            </div>

            <div className="post_center">
                <img className="post_photo" src={photoUrl} />
            </div>

            <div>
                <p>
                    <span style={{ fontWeight: "500", marginRight: "4px" }}>{username}</span>
                    {caption}
                </p>
            </div>

            {comments ? (
                comments.map((comment) => (
                    <Comment username={comment.username}
                    caption={comment.comment} />
                ))
            ) : (
                <></>
            )}

            {user ? <CommentInput comments={comments} id={id}/> : <></>}
        </div>
    )
};

export default Post;
