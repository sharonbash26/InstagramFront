import { pstService } from '../services/pst.service.local';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuComment } from './MenuComment';
import { useParams, useNavigate, Link } from 'react-router-dom'
import { closeModal, openModal, updatePst } from "../store/pst.actions";

export function CommentDetails({ pst, comment }) {
    const [likeUrl, setLikeUrl] = useState("like.svg")
    const [isLiked, setIsLiked] = useState(false)
    const user = useSelector(storeState => storeState.userModule.user)
    const [isMenuComment, setMenuComment] = useState(false)
    const { txt, imgUrl, by, _id, comments, likedBy, uploadTime } = pst
    const [likesCount, setLikesCount] = useState(likedBy?.length || 0)
    const [isMenuVisible, setMenuVisible] = useState(false)
    const userId = user._id
    let loggedUser = userService.getLoggedinUser()

    const navigate = useNavigate()

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    }


    
    useEffect(() => {
        const bIsLiked = pst.likedBy.find(user => userService.getLoggedinUser()._id === user._id) ? true : false

        setIsLiked(bIsLiked)
        bIsLiked ? setLikeUrl("red-likes.svg") : setLikeUrl("like.svg")
    }, [])


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

    function openMenuComment() {
        setMenuComment(!isMenuComment)
    }

    const navigateProfileUser = () => {
        navigate(`/profile/${comment.by._id}`)
    }
    function getRandomTimeStringV2() {
        // Decide randomly whether to return hours or minutes
        const isHour = Math.random() < 0.5; 
      
        if (isHour) {
          // Generate a random hour between 1 and 3
          const hour = Math.floor(Math.random() * 3) + 1;
          return `${hour}h`;
        } else {
          // Generate a random minute between 1 and 59
          const minute = Math.floor(Math.random() * 59) + 1;
          return `${minute}m`;
        }
      }
      
      // Example usage:
      
    return (
        <section className="comment-details">
            <div className="data-comment">
                <div className='profile-comment-img'>
                    <button onClick={navigateProfileUser}>
                        <img src={comment.by.imgUrl || "emptyUser.jpeg"}></img>
                    </button>
                </div>
                <section className='textual'>
                    <div className='textual-1'>
                        <h4>{comment.by.fullname}</h4>
                        <h4 className='comment-txt'>{comment.txt}</h4>
                    </div>

                    <div className='textual-2'>
                        <p className='date-time'>{getRandomTimeStringV2()}</p>
                        {/* <p className='likes-on-comment'>3likes</p> */}
                        {likesCount > 0 && <h4 className="count-likes">{likesCount} {likesCount === 1 ? 'like' : 'likes'}</h4>}

                        {/* <button className='reply'>Reply</button> */}
                        <p className='reply'>Reply</p>
                        <button className='three-dot' onClick={toggleMenu}><img src="3dot.svg"></img></button>
                        {isMenuVisible && <MenuComment comment={comment} onClose={toggleMenu} />}
                    </div>
                </section>
                {/* <button className='three-dot' onClick={openMenuComment}><img src="3dot.svg"></img></button> */}
                {isMenuComment && <MenuComment comment={comment} />}
                {/* <div className="like-btn">
                    <button className="like" onClick={toggleLike}>
                        <img className='like-img-red' src={likeUrl}></img>
                    </button>
                </div> */}
            </div>
            <div className="like-btn">
                <button className="like" onClick={toggleLike}>
                    <img className='like-img-red' src={likeUrl}></img>
                </button>
            </div>
            {/* </div> */}
        </section>


    )
}
