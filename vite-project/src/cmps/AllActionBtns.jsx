import React from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Emoji, EmojiStyle } from 'emoji-picker-react';
import { ThreeDotModal } from './ThreeDotModal';
import { pstService } from "../services/pst.service.local";
import { SET_SELECTED_POST } from '../store/pst.reducer';
import { useDispatch } from 'react-redux';

const { useState, useEffect, useRef } = React
export function AllActionBtns({ pst }) {
    const [likeUrl, setLikeUrl] = useState("like.svg")
    const [isLiked, setIsLiked] = useState(false)
    const { txt, imgUrl, by, _id, comments, likedBy, uploadTime } = pst
    const [countComment, setCountComment] = useState(pst.comments?.length || 0)
    const [likesCount, setLikesCount] = useState(likedBy?.length || 0)
    const emojiPickerRef = useRef(null);
    const [comment, setComment] = useState('')
    const [selectedEmoji, setSelectedEmoji] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const dispatch = useDispatch()



    const [inputValue, setInputValue] = useState("");
    const [newComment, setNewComment] = useState('');

    // const [isDotModalOpen, setIsDotModalOpen] = useState(false)
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

    function onClick(emojiData, event) {
        setComment(
            (inputValue) =>
                inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
        );
        // setSelectedEmoji(emojiData.unified);
    }

    async function onSendComment() {
        setCountComment(prevCount => prevCount + 1)
        setNewComment(comment)
        console.log('pstid', pst._id)
        console.log('comment', comment)
        const updatedPst =  await pstService.addComment(pst._id, comment);
        dispatch({type: 'SET_SELECTED_POST', post: updatedPst})
        setComment('');
        setInputValue('');
    }
    return (
        <section className='all-action-btns'>



            <div className="actions-btn">

                <div className="actions-btn-part1">
                    <button className="like" onClick={toggleLike}> <img src={likeUrl}></img>
                    </button>
                    <button className="comment" ><img src="comment.svg"></img></button>

                    <button className="share"><img src="share.svg"></img></button>
                </div>
                <div className="actions-btn-part2">
                    <button className="save"><img src="save.svg"></img></button>
                </div>


            </div>

            <div className="comment-text-area">
                <div className='time-upload'>
                    <h4 className='like-count-in-all-actions'>{likesCount} likes</h4>
                    <p>3 DAYS AGO</p>
                </div>

                <div className="comment-input-container" ref={emojiPickerRef}>
                    <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => { setComment(e.target.value); setInputValue(e.target.value) }} 
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {  // Check for Enter key press without Shift
                          e.preventDefault();  // Prevent default to avoid newline in input
                          onSendComment();     // Call the function to handle comment submission
                        }}}
                    
                    
                        
                    
                    />
                    <div className="empjiPostbtn">
                        {<Emoji unified={selectedEmoji} size={28} />}
                        {comment.length > 0 || selectedEmoji ? (
                            <button className="post-btn" onClick={onSendComment}>Post</button>
                        ) : null}

                        <button onClick={openMenuEmoji} className="emoji"><img className="emjoi-btn" src="emjoi-btn.svg"></img></button>

                        <div className="emoji-picker-container">
                            {showEmojiPicker && <EmojiPicker onEmojiClick={onClick} />}
                        </div>

                    </div>
                </div>
            </div>

        </section >
    )
}