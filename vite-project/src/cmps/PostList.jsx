import { PostPreview } from "./PostPreview"
export function PstList({psts, onRemovePst}){
    return(
        <ul className="pst-list">
        {psts.map(pst =>    
            <li className="pst-preview" key={pst._id}>
                <PostPreview pst={pst}  onRemovePst={ onRemovePst} />
             
            </li>
        )}
    </ul>
    )
}