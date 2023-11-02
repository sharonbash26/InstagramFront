import { NavLink } from 'react-router-dom';

export function UserBottomPart() {
    return (
        <section className="user-bottom-part">
           <NavLink to="/profile/psts"><img src="pstIcon.svg"></img>Posts</NavLink>
           <NavLink to="/profile/reels"><img src="reelsIcon.svg"></img>Reels</NavLink>
           <NavLink to="/profile/saved"><img src="savedIcon.svg"></img>Saved</NavLink>
           <NavLink to="/profile/tagged"><img src="tagged.svg"></img>Tagged</NavLink>
          
        
        </section>
    )
}