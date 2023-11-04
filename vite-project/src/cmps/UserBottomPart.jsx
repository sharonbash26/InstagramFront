import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';



export function UserBottomPart() {
    function CustomNavLink({ to, children }) {
        let resolved = useResolvedPath(to);
        let match = useMatch({ path: resolved.pathname, end: true });
      
        return (
          <NavLink
            to={to}
            className={match ? 'active-link' : ''}
          >
            {children}
          </NavLink>
        );
      }
    return (
        <section className="user-bottom-part">
           <CustomNavLink to="/profile/psts"><img src="pstIcon.svg" alt="Posts" />POSTS</CustomNavLink>
           <CustomNavLink to="/profile/reels"><img src="reelsIcon.svg" alt="Reels" />REELS</CustomNavLink>
           <CustomNavLink to="/profile/saved"><img src="savedIcon.svg" alt="Saved" />SAVED</CustomNavLink>
           <CustomNavLink to="/profile/tagged"><img src="tagged.svg" alt="Tagged" />TAGGED</CustomNavLink>
        </section>
    )
}
