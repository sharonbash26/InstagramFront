import { PostPreview } from "./PostPreview"
export function PstList({psts}){
    return(
        <ul className="pst-list">
        {psts.map(pst =>    
            <li className="pst-preview" key={pst._id}>
                <PostPreview pst={pst} />
             
            </li>
        )}
    </ul>
    )
}