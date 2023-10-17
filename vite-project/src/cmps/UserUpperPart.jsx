import { useSelector } from 'react-redux'
import { NavHeader } from '../cmps/NavHeader'

export function UserUpperPart() {
    const user = useSelector(storeState => storeState.userModule.user)
    let countPost = 0
    let countFollowers = 0
    let countFollowing = 0
    return (
        <section className='user-upper-part'>
            <div>
                <NavHeader />
            </div>
            <section className='internal-user-upper-part'>

                <button className='user-button'>
                    <img className="empty-user" src="emptyUser.jpeg" alt="User Placeholder"/>
                </button>
                <div className='info'>
                    <h2>{user.fullname}</h2>
                    <button className='edit-profile'>Edit profile</button>
                    <button className='view-archive'>View Archive</button>
                    <button className='settings'><img src='setting.svg'></img></button>
                    {/* <h2>{user.imgUrl}</h2> */}
                </div>
                <section className='counts'>
                    <h4>{user.fullname}</h4>
                    <h4>{countPost} posts</h4>
                    <h4>{countFollowers} followers</h4>
                    <h4>{countFollowing} following</h4>

                </section>
            </section>
        </section>
    )
}