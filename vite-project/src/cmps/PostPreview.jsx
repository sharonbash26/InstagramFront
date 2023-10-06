import { Link } from "react-router-dom";
import { utilService } from "../services/util.service";
import { pstService } from "../services/pst.service.local";
import React from 'react';
const { useState, useEffect } = React
// import img from '../assets/img/1.jpg'


export function PostPreview({ pst }) {
    const { txt, imgUrl, by, _id, comments, likedBy } = pst
    const [isLiked, setIsLiked] = useState(false)
    const [comment, setComment] = useState('')
    const [likeUrl, setLikeUrl] = useState("like.svg")
    var [likesCount, setLikesCount] = useState(likedBy?.length || 0)

 
    function toggleLike() {
        if (isLiked) {
            setLikeUrl("like.svg")
            setIsLiked(false)
            setLikesCount(likesCount - 1)
            console.log('likescount', likesCount)

        } else {
            setLikeUrl("red-likes.svg")
            setIsLiked(true)
            setLikesCount(likesCount + 1)
            console.log('likescount', likesCount)
        }
        console.log('press like')
    }
    console.log('imgUrl previev', imgUrl)

    return (
        <section className="pst-Preview">
            <div className="info-start">
                <h2>{by.fullname}</h2>
                <h4>{utilService.randomTimeString()}</h4>
                <img className="three-dot-icon" src="3dot.svg"></img>
            </div>

            {/* <img src={utilService.getAssetSrc('react.svg')} alt="pst preview"></img> */}
            <img src={imgUrl || "s3.jpg"} alt="pst preview"></img>
            <div className="actions-btn">
                <button className="like" onClick={toggleLike}> { }<img src={likeUrl}></img>
                </button>
                <Link to={`/pst/${pst._id}`}>
                    <button className="comment"><img src="comment.svg"></img></button>
                </Link>
                <button className="share"><img src="share.svg"></img></button>
                <button className="save"><img src="save.svg"></img></button>
            </div>
            {likesCount > 0 && <h4>{likesCount} {likesCount === 1 ? 'like' : 'likes'}</h4>}

            <h4>{txt}</h4>
            <div className="comment-text-area">
                <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value) }  />
                <button className="emoji"><img className="emjoi-btn" src="emjoi-btn.svg"></img></button>
                {comment.length > 0 && (<button>Post</button>)}
            </div>


            <hr />

        </section>
    )

}