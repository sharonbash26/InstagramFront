import { NavLink } from 'react-router-dom';

export function UserBottomPart() {
    return (
        <section className="user-bottom-part">
           <NavLink to="/profile/psts">Posts</NavLink>
           <NavLink to="/profile/reels">Reels</NavLink>
           <NavLink to="/profile/saved">Saved</NavLink>
           <NavLink to="/profile/tagged" >Tagged</NavLink>
          
        
        </section>
    )
}