import { useDispatch, useSelector } from 'react-redux';
import { CommentDetails } from './CommentDetails';
export function CommentList() {
    const psts = useSelector(storeState => storeState.pstModule.psts) || [];
    console.log('psts from Redux:', psts);

    return (
        <div className="comment-list">
            {psts.map((pst, pstIndex) => (
                <CommentDetails key={pstIndex} pst={pst} />
            ))}
        </div>
    );
}