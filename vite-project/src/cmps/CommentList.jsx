import { useDispatch, useSelector } from 'react-redux';
import { CommentDetails } from './CommentDetails';
import { ActionsBtns } from './ActionBtns';
export function CommentList({ pst}) {
    const psts = useSelector(storeState => storeState.pstModule.psts) || [];
    
    return (
        <section className='comment-list'>
        <div className="list">
            {pst.comments.map((comment) => (
                <CommentDetails key={comment.id} comment={comment} />
             
            ))}
        </div>
        <ActionsBtns pst={pst} />
        </section>
    )
}