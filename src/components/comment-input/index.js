import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/user';
import { db } from '../../firebase';
import "./style.css";

function CommentInput({ comments, id }) {

    const [user, setUser] = useContext(UserContext).user;
    const [comment, setComment] = useState("");
    const [commentArr, setCommentArr] = useState(comments ? comments : []);

    // Add comment to post info
    const addComment = () => {
        if (comment != "") {
            commentArr.push({
                comment: comment,
                username: user.email.replace("@gmail.com", "")
            });

            db.collection("posts").doc(id).update({
                comments: commentArr,
            }).then(() => {
                setComment("");
                console.log("Comment succesfully added");
            }).catch((error) => {
                console.log(`Error adding comment: ${error}`);
            })
        }
    };

    return (
        <div className="commentInput">
            <textarea
            className="commentInput_textarea"
            placeholder="Write a comment..."
            rows="1"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button className="commentInput_btn" onClick={addComment}>Post</button>
        </div>
    )
};

export default CommentInput;
