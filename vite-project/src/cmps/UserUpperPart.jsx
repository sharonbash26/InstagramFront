// import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { NavHeader } from '../cmps/NavHeader'
// import { ImgUploader } from './ImgUploader'
// import { MenuUploadUserPhoto } from './MenuUploadUserPhoto'

// export function UserUpperPart() {
//     const user = useSelector(storeState => storeState.userModule.user)

//     // const [showImgUploader, setShowImgUploader] = useState(false)
//     const [showMenu, setShowMenu] = useState(false)
//     let countPost = 0
//     let countFollowers = 0
//     let countFollowing = 0
//     //  function onsetShowImgUploader(){
//     //     setShowImgUploader(true)
//     // }
//     function openMenu() {
//         setShowMenu(!showMenu)
//     }

//     return (
//         <>
//             <div>
//                 <NavHeader />
//             </div>
//             <section className='user-upper-part'>
//                 {/* <div>
//                 <NavHeader />
//             </div> */}
//                 <section className='internal-user-upper-part'>

//                     <button className='user-button' onClick={openMenu}>
//                         <img className="empty-user" src={user.imgUrl || "emptyUser.jpeg"} alt="User Placeholder" />
//                     </button>{showMenu && <MenuUploadUserPhoto />}

//                     {/* {showImgUploader && <ImgUploader design={'alternative'} />}  This will conditionally render the ImgUploader component based on the state */}

//                     <div className='info-container'>
//                         <div className='info'>
//                             <h2>{user.username}</h2>
//                             <button className='edit-profile'>Edit profile</button>
//                             <button className='view-archive'>View Archive</button>
//                             <button className='settings'><img src='setting.svg' alt='Settings Icon'></img></button>
//                         </div>
//                         <section className='counts'>
//                             <div className='details-about-user'>
//                                 {/* <h4>{user.username}</h4> */}

//                                 <h4> <span className='count-post'>{10}</span>posts</h4>
//                                 <h4> <span className='count-followers'>{10}</span>followers</h4>
//                                 <h4><span className='count-following'>{20}</span> following</h4>
//                             </div>
//                             <div className='fullname-of-user'>
//                                 <h4>{user.fullname}</h4>
//                             </div>

//                         </section>
//                     </div>
//                 </section>
//             </section>
//         </>
//     )
// }

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavHeader } from '../cmps/NavHeader'
import { ImgUploader } from './ImgUploader'
import { MenuUploadUserPhoto } from './MenuUploadUserPhoto'

export function UserUpperPart() {
    const { user, loggedInUser } = useSelector(storeState => ({
        user: storeState.userModule.user,
        loggedInUser: storeState.userModule.loggedInUser // Assuming you have something like this
    }));

    const [showMenu, setShowMenu] = useState(false)

    function openMenu() {
        setShowMenu(!showMenu)
    }

    const isOwnProfile = user._id === loggedInUser._id; // This assumes each user has a unique _id field

    return (
        <>
            <div>
                <NavHeader />
            </div>
            <section className='user-upper-part'>
                <section className='internal-user-upper-part'>
                    <button className='user-button' onClick={openMenu}>
                        <img className="empty-user" src={user.imgUrl || "emptyUser.jpeg"} alt="User Placeholder" />
                    </button>
                    {showMenu && <MenuUploadUserPhoto />}

                    <div className='info-container'>
                        <div className='info'>
                            <h2>{user.username}</h2>
                            {isOwnProfile ? (
                                <>
                                    <button className='edit-profile'>Edit profile</button>
                                    <button className='view-archive'>View Archive</button>
                                </>
                            ) : (
                                <button className='follow'>Following</button> // This button only appears if it's not the logged-in user's own profile
                            )}
                            <button className='settings'><img src='setting.svg' alt='Settings Icon'></img></button>
                        </div>
                        <section className='counts'>
                            <div className='details-about-user'>
                                <h4> <span className='count-post'>{user.postsCount}</span>posts</h4>
                                <h4> <span className='count-followers'>{user.followersCount}</span>followers</h4>
                                <h4><span className='count-following'>{user.followingCount}</span> following</h4>
                            </div>
                            <div className='fullname-of-user'>
                                <h4>{user.fullname}</h4>
                            </div>
                        </section>
                    </div>
                </section>
            </section>
        </>
    )
}
