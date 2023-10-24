import { pstService } from '../services/pst.service.local';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function CommentDetails({ comment }) {
    const [likeUrl, setLikeUrl] = useState("like.svg")
    const [isLiked, setIsLiked] = useState(false)
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
    return (
        <section className="comment-details">
            <div className="comment">
                <div className='data-comment'>
                    <h4>{comment.by.imgUrl}</h4>
                    <h4>{comment.txt}</h4>
                    <h4>{comment.by.fullname}</h4>
                    <div className='like-btn'>
                        <button className="like" onClick={toggleLike}> { }<img src={likeUrl}></img>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
