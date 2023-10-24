import React from 'react';
import { removeComment } from '../store/pst.actions';
import { useSelector } from 'react-redux';
export function MenuComment({comment}) {
    
    function deleteComment(){

    }
    function cancelComment(){
        
    }
    return (
    <section className="menu-comment">
        <button className="delete" onClick={()=>{removeComment(comment.id)}}>Delete</button>
       <button className="cancel" onClick={cancelComment}>Cancel</button>
    </section>
)
}