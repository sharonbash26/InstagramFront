import { pstService } from '../services/pst.service.local';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuComment } from './MenuComment';

export function CommentDetails({pst, comment }) {

    const [likeUrl, setLikeUrl] = useState("like.svg")
    const [isLiked, setIsLiked] = useState(false)
    const user = useSelector(storeState => storeState.userModule.user)
    const [isMenuComment, setMenuComment] = useState(false)
    const { txt, imgUrl, by, _id, comments, likedBy, uploadTime } = pst
    var [likesCount, setLikesCount] = useState(likedBy?.length || 0)
    const [isMenuVisible, setMenuVisible] = useState(false);
    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };
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
                <div className='profile-comment-img'>
                    <img src={user.imgUrl}></img>
                </div>
                <section className='textual'>
                    <div className='textual-1'>
                        <h4>{user.userName}</h4>
                        <h4>{comment.txt}</h4>
                    </div>

                    <div className='textual-2'>
                        <p className='date-time'>1d</p>
                        <p className='likes-on-comment'>3likes</p>
                        {/* <button className='reply'>Reply</button> */}
                        <p className='reply'>Reply</p>
                        <button className='three-dot' onClick={toggleMenu}><img src="3dot.svg"></img></button>
                        {isMenuVisible && <MenuComment comment={comment} onClose={toggleMenu} />}


                    </div>

                </section>




                {/* <button className='three-dot' onClick={openMenuComment}><img src="3dot.svg"></img></button> */}
                {isMenuComment && <MenuComment comment={comment} />}
                <div className="like-btn">
                    <button className="like" onClick={toggleLike}>
                        <img className='like-img-red' src={likeUrl}></img>
                    </button>
                </div>
            </div>
            {/* </div> */}
        </section>


    )
}
