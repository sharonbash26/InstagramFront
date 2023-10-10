import { Link } from "react-router-dom";
import { utilService } from "../services/util.service";
import { pstService } from "../services/pst.service.local";
import React from 'react';
import { DetailsModal } from "./DetailsModal";
const { useState, useEffect } = React
import EmojiPicker from 'emoji-picker-react';
import { Emoji, EmojiStyle } from 'emoji-picker-react';
import { ThreeDotModal } from "./ThreeDotModal";


// import img from '../assets/img/1.jpg'


export function PostPreview({ pst }) {
    const { txt, imgUrl, by, _id, comments, likedBy, uploadTime } = pst
    const [isLiked, setIsLiked] = useState(false)
    const [comment, setComment] = useState('')
    const [likeUrl, setLikeUrl] = useState("like.svg")
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isDotModalOpen,setIsDotModalOpen]=useState(false)

    var [likesCount, setLikesCount] = useState(likedBy?.length || 0)

    function openMenuEmoji() {
        setShowEmojiPicker(!showEmojiPicker);
    }
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
    console.log('time', pstService.psts[0].uploadTime)
    function openDetailsModal() {
        <DetailsModal />
    }
    function openDotModal(){
     setIsDotModalOpen(true)
    }
    function closeDotModal(){
        setIsDotModalOpen(false)
    }
    return (
        <section className="pst-Preview">
            <div className="info-start">
                <div className="info-start-content">
                    <img className="profile-prev" src="s3.jpg"></img>
                    <h2>{by.fullname} <span className="dot-upper" style={{ color: 'gray' }}>•</span></h2>
                    {/* <h4 className="timeWhenUpload">{pstService.psts[0].uploadTime}</h4> */}
                    <h4 className="timeWhenUpload">{pst.uploadTime === 'now' ? 'now' : pstService.psts[0].uploadTime}</h4>

                </div>
                 <button onClick={openDotModal}><img className="three-dot-icon" src="3dot.svg"></img></button>
                 {isDotModalOpen&& <ThreeDotModal closeDotModal={closeDotModal} />}
              
            </div>

            {/* <img src={utilService.getAssetSrc('react.svg')} alt="pst preview"></img> */}
            <img src={imgUrl || "s3.jpg"} alt="pst preview"></img>
            <section>
                <div className="actions-btn">
                    <div className="actions-btn-part1">
                        <button className="like" onClick={toggleLike}> { }<img src={likeUrl}></img>
                        </button>
                        <Link to={`/pst/${pst._id}`}>
                            <button className="comment" onClick={openDetailsModal}><img src="comment.svg"></img></button>
                        </Link>
                        <button className="share"><img src="share.svg"></img></button>
                    </div>
                    <div className="actions-btn-part2">
                        <button className="save"><img src="save.svg"></img></button>
                    </div>
                </div>
                {likesCount > 0 && <h4 className="count-likes">{likesCount} {likesCount === 1 ? 'like' : 'likes'}</h4>}
            

            <h4 className="description"><span>{by.fullname }</span>  {txt}</h4>
            <div className="comment-text-area">
                <div className="see-comments">
                    <button className="view-all-comments">View all 5 comments</button>
                </div>
                <div className="comment-input-container">
                    <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
                    <div className="empjiPostbtn">
                        {comment.length > 0 && (<button>Post</button>)}
                        <button onClick={openMenuEmoji} className="emoji"><img className="emjoi-btn" src="emjoi-btn.svg"></img></button>
                        {showEmojiPicker && <EmojiPicker />}
                    </div>
                </div>
            </div>
      
            </section>

            <hr />

        </section>
    )

}