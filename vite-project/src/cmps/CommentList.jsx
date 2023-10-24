import { useDispatch, useSelector } from 'react-redux';
import { CommentDetails } from './CommentDetails';
export function CommentList({ pst}) {
    const psts = useSelector(storeState => storeState.pstModule.psts) || [];
    console.log('psts from Redux:', psts);
    
    return (
        <div className="comment-list">
            {pst.comments.map((comment) => (
                <CommentDetails key={comment._id} comment={comment} />
             
            ))}
        </div>
    );
}