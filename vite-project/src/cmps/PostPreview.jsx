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
import { useNavigate } from 'react-router-dom';

import { closeModal, openModal, updatePst } from "../store/pst.actions";
export function PostPreview({ pst, onRemovePst }) {
    const { txt, imgUrl, by, _id, comments, likedBy, uploadTime } = pst
    const [isLiked, setIsLiked] = useState()
    const [comment, setComment] = useState('')
    const [likeUrl, setLikeUrl] = useState("like.svg")
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isDotModalOpen, setIsDotModalOpen] = useState(false)
    const [selectedEmoji, setSelectedEmoji] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();
    const user = useSelector(storeState => storeState.userModule.user)
    const userId = user._id
    const [countComment, setCountComment] = useState(pst.comments?.length || 0);
    const isModalOpen = useSelector(storeState => storeState.pstModule.isModalOpen);
    let loggedUser = userService.getLoggedinUser()

    var [likesCount, setLikesCount] = useState(likedBy?.length || 0)

    const emojiPickerRef = useRef(null);


    useEffect(() => {
        const bIsLiked = pst.likedBy.find(user => userService.getLoggedinUser()._id === user._id) ? true : false

        setIsLiked(bIsLiked)
        bIsLiked ? setLikeUrl("red-likes.svg") : setLikeUrl("like.svg")

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

    async function toggleLike() {
        if (isLiked) {
            setLikeUrl("like.svg")
            setIsLiked(false)
            setLikesCount(likesCount - 1)
            const pstCpy = { ...pst }
            const idx = pst.likedBy.findIndex(user => user._id === loggedUser._id)
            pstCpy.likedBy.splice(idx, 1)
            updatePst(pst)

        } else {
            setLikeUrl("red-likes.svg")
            setIsLiked(true)
            setLikesCount(likesCount + 1)
            const pstCpy = { ...pst }
            pstCpy.likedBy.push(loggedUser)
            updatePst(pst)
        }
    }

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
        pstService.addComment(pst._id, comment);
        setComment('');
        setInputValue('');
    }


    function onClick(emojiData, event) {
        setComment(
            (inputValue) =>
                inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
        );
    }

    const navigateProfileUser = () => {
        navigate(`/profile/${pst.by._id}`);
    }

    return (
        <section className="pst-Preview">
            <div className="info-start">
                <div className="info-start-content">
                    <button onClick={navigateProfileUser}><img className="profile-prev" src={by.imgUrl || "emptyUser.jpeg"}></img></button>
                    <h2>{by.fullname || loggedUser.username} <span className="dot-upper" style={{ color: 'gray' }}>•</span></h2>
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
                    {/* <div className="see-comments">
                        <Link to={`/pst/${pst._id}`}>
                            <button className="view-all-comments" onClick={openDetailsModal}>View all {countComment} comments</button>
                        </Link>
                    </div> */}
                    <div className="see-comments">
                        {countComment > 0 && (
                            <Link to={`/pst/${pst._id}`}>
                                <button className="view-all-comments" onClick={openDetailsModal}>
                                    View all {countComment} comments
                                </button>
                            </Link>
                        )}
                    </div>

                    {newComment &&
                        (<div className="newComment">
                            {/* <h4 style={padding:0,margin:0}>{loggedUser.userName}</h4> */}
                            <h4 style={{ padding: 0, margin: 0 }}>{loggedUser.username}</h4>

                            {newComment}
                            {/* <p className="userComment">{newComment}</p> */}

                        </div>)}
                    <div className="comment-input-container1" ref={emojiPickerRef}>
                        <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => { setComment(e.target.value); setInputValue(e.target.value) }}

                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {  // Check for Enter key press without Shift
                                    e.preventDefault();  // Prevent default to avoid newline in input
                                    onSendComment();     // Call the function to handle comment submission
                                }
                            }}



                        />
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