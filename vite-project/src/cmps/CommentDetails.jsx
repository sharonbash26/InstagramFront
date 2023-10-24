import { pstService } from '../services/pst.service.local';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuComment } from './MenuComment';

export function CommentDetails({ comment }) {
    
    const [likeUrl, setLikeUrl] = useState("like.svg")
    const [isLiked, setIsLiked] = useState(false)
    const user = useSelector(storeState => storeState.userModule.user)
    const [isMenuComment, setMenuComment] = useState(false)
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
    }
    function openMenuComment() {
        setMenuComment(!isMenuComment)
    }
    return (
        <section className="comment-details">
            {/* <div className="comment"> */}
            <div className="data-comment">
                <div>
                    <img src={user.imgUrl}></img>
                </div>
                <h4>{comment.by.fullname}</h4>
                <h4>{comment.txt}</h4>
                <h4>{`38w`}</h4>
                <h4>{`3 likes`}</h4>
                <button className='reply'>Reply</button>
                <button className='three-dot' onClick={openMenuComment}><img src="3dot.svg"></img></button>
                {isMenuComment&&<MenuComment  comment={comment} />}
                <div className="like-btn">
                    <button className="like" onClick={toggleLike}>
                        <img src={likeUrl}></img>
                    </button>
                </div>
            </div>
            {/* </div> */}
        </section>


    )
}
