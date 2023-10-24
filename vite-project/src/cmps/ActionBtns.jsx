import React from 'react';
const { useState, useEffect, useRef } = React
export function ActionsBtns({ pst}){
    const [likeUrl, setLikeUrl] = useState("like.svg")
    const [isLiked, setIsLiked] = useState(false)
    const { txt, imgUrl, by, _id, comments, likedBy, uploadTime } = pst
    const [countComment, setCountComment] = useState(pst.comments?.length || 0)
    var [likesCount, setLikesCount] = useState(likedBy?.length || 0)

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
    function onSendComment() {
        setCountComment(prevCount => prevCount + 1)
        setNewComment(comment)
        console.log('pstid', pst._id)
        console.log('comment', comment)
        pstService.addComment(pst._id, comment);




        setComment('');
        setInputValue('');
    }
    return(
        <div className="actions-btn">
        <div className="actions-btn-part1">
            <button className="like" onClick={toggleLike}> { }<img src={likeUrl}></img>
            </button>
                <button className="comment"><img src="comment.svg"></img></button>
          
            <button className="share"><img src="share.svg"></img></button>
        </div>
        <div className="actions-btn-part2">
            <button className="save"><img src="save.svg"></img></button>
        </div>
    </div>
    )
}