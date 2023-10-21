import { pstService } from '../services/pst.service.local';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function CommentDetails({ comment }) {
    return (
        <section className="pst">
            <div className="comment">
                <h4>{comment.txt}</h4>
                <h4>{comment.by.fullname}</h4>
                <h4>{comment.by.imgUrl}</h4>
            </div>
        </section>
    );
}
