import { Link } from "react-router-dom";
import { utilService } from "../services/util.service";
import { pstService } from "../services/pst.service.local";
import React from 'react';
const { useState, useEffect, useRef } = React
import EmojiPicker from 'emoji-picker-react';
import { Emoji, EmojiStyle } from 'emoji-picker-react';
import { ThreeDotModal } from "./ThreeDotModal";
import { PostDetails } from "../pages/PostDetails";

import { userService } from "../services/user.service";
import { useDispatch, useSelector } from 'react-redux'

import { closeModal, openModal } from "../store/pst.actions";
export function PostPreview({ pst, onRemovePst }) {
    const { txt, imgUrl, by, _id, comments, likedBy, uploadTime } = pst
    const [isLiked, setIsLiked] = useState(false)
    const [comment, setComment] = useState('')
    const [likeUrl, setLikeUrl] = useState("like.svg")
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isDotModalOpen, setIsDotModalOpen] = useState(false)
    const [selectedEmoji, setSelectedEmoji] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [newComment, setNewComment] = useState('');
    const [countComment, setCountComment] = useState(pst.comments?.length || 0);
    const isModalOpen = useSelector(storeState => storeState.pstModule.isModalOpen);
    let loggedUser = userService.getLoggedinUser()
    console.log('userrrr', loggedUser)

    var [likesCount, setLikesCount] = useState(likedBy?.length || 0)

    const emojiPickerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function openMenuEmoji() {
        setShowEmojiPicker(!showEmojiPicker);
    }
    function toggleLike() {
        if (isLiked) {
            setLikeUrl("like.svg")
            setIsLiked(false)
            setLikesCount(likesCount - 1)

        } else {
            setLikeUrl("red-likes.svg")
            setIsLiked(true)
            setLikesCount(likesCount + 1)
        }
        console.log('press like')
    }
    console.log('time', pstService.psts[0].uploadTime)
    function openDetailsModal() {

    }
    function openDotModal() {
        setIsDotModalOpen(true)
    }
    function closeDotModal() {
        setIsDotModalOpen(false)
    }

    function onSendComment() {
        setCountComment(prevCount => prevCount + 1)
        setNewComment(comment)
        console.log('pstid', pst._id)
        console.log('comment', comment)
        pstService.addComment(pst._id, comment);
        setComment('');
        setInputValue('');
    }


    function onClick(emojiData, event) {
        setComment(
            (inputValue) =>
                inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
        );
    } console.log('hhh', by.fullname)
    return (
        <section className="pst-Preview">
            <div className="info-start">
                <div className="info-start-content">
                    <img className="profile-prev" src={by.imgUrl }></img>
                    <h2>{by.fullname||loggedUser.userName} <span className="dot-upper" style={{ color: 'gray' }}>•</span></h2>
                    {/* <h4 className="timeWhenUpload">{pstService.psts[0].uploadTime}</h4> */}
                    <h4 className="timeWhenUpload">{pst.uploadTime === 'now' ? 'now' : pstService.psts[0].uploadTime}</h4>
                </div>
                <button onClick={openDotModal}><img className="three-dot-icon" src="3dot.svg"></img></button>
                {isDotModalOpen && <ThreeDotModal closeDotModal={closeDotModal} pst={pst}></ThreeDotModal>}


            </div>

            {/* <img src={utilService.getAssetSrc('react.svg')} alt="pst preview"></img> */}
            <img className="pst-img" src={imgUrl || "s3.jpg"} alt="pst preview"></img>
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


                <h4 className="description"><span>{by.fullname}</span>  {txt}</h4>
                <div className="comment-text-area">
                    <div className="see-comments">
                        <Link to={`/pst/${pst._id}`}>
                            <button className="view-all-comments" onClick={openDetailsModal}>View all {countComment} comments</button>
                        </Link>
                    </div>
                    {newComment && 
                    (<div className="newComment">
                        {/* <h4 style={padding:0,margin:0}>{loggedUser.userName}</h4> */}
                        <h4 style={{ padding: 0, margin: 0 }}>{loggedUser.userName}</h4>

                        {newComment}
                        {/* <p className="userComment">{newComment}</p> */}

                    </div>)}
                    <div className="comment-input-container1" ref={emojiPickerRef}>
                        <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => { setComment(e.target.value); setInputValue(e.target.value) }} />
                        <div className="empjiPostbtn">
                            {<Emoji unified={selectedEmoji} size={28} />}
                            {comment.length > 0 || selectedEmoji ? (
                                <button className="post-btn" onClick={onSendComment}>Post</button>
                            ) : null}

                            <button onClick={openMenuEmoji} className="emoji1"><img className="emjoi-btn1" src="emjoi-btn.svg"></img></button>

                            <div className="emoji-picker-container">
                                {showEmojiPicker && <EmojiPicker onEmojiClick={onClick} />}
                            </div>

                        </div>
                    </div>
                </div>

            </section>

            <hr />

        </section>
    )

}