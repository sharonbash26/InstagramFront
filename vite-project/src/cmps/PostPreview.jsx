    import { Link } from "react-router-dom";
    import { utilService } from "../services/util.service";
    import React from 'react';
    const { useState, useEffect } = React
    // import img from '../assets/img/1.jpg'


    export function PostPreview({ pst }) {
        console.log('pst', pst);
        const { txt, imgUrl, by, _id, comments,likedBy } = pst
        console.log('txtinP', txt)
        console.log('comments',comments)
        console.log('likeee',likedBy && likedBy.length)
        const [comment,setComment]=useState('')


        return (
            <section className="pst-Preview">
                <div className="info-start">
                    <h2>{by.fullname}</h2>
                    <h4>{utilService.randomTimeString()}</h4>
                    <img className="three-dot-icon" src="3dot.svg"></img>
                </div>

                {/* <img src={utilService.getAssetSrc('react.svg')} alt="pst preview"></img> */}
                <img src="s2.jpg" alt="pst preview"></img>
                <div className="actions-btn">
                    <button className="like"><img src="like.svg"></img></button>
                    <button className="comment"><img src="comment.svg"></img></button>
                    <button className="share"><img src="share.svg"></img></button>
                    <button className="save"><img src="save.svg"></img></button>
                </div>
                {likedBy&&<h4>{likedBy.length} likes</h4>}
                <h4>{txt}</h4>
                <div className="comment-text-area">
                <input type="text" placeholder="Add a comment..." value={comment} onChange={(e)=>setComment(e.target.value)}/>
                 {comment.length>0 && (<button>Post</button>)}
                </div>


                <hr />

            </section>
        )

    }