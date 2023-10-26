import { useDispatch, useSelector } from 'react-redux';
import { CommentDetails } from './CommentDetails';
import { AllActionBtns } from './AllActionBtns';

export function CommentList({ pst}) {
    const psts = useSelector(storeState => storeState.pstModule.psts) || [];
    
    return (
        <section className='comment-list'>
        <div className="list">
            {pst.comments.map((comment, index) => (
                <CommentDetails key={index} pst={pst} comment={comment} />
             
            ))}
        </div>
        <div className="2">
        <AllActionBtns pst={pst} />
        </div>
        </section>
    )
}