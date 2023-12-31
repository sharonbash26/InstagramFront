import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavHeader } from '../cmps/NavHeader';
import { ImgUploader } from './ImgUploader';
import { MenuUploadUserPhoto } from './MenuUploadUserPhoto';
import { useParams } from 'react-router-dom';
import { userService } from '../services/user.service';
import { pstService } from '../services/pst.service.local';

export function UserUpperPart() {
    const user = useSelector(storeState => storeState.userModule.user)
    const { userId } = useParams()
    const [currentUser, setCurrentUser] = useState(null)
    const [showMenu, setShowMenu] = useState(false)
    const [pstCount, setPstCount] = useState(0)

    let isCurrentUser = user._id === userId

    useEffect(() => {
        const loadUser = async () => {
            try {
                const currUser = await userService.getById(userId)
                const pstNum = await pstService.getUserPostCount(userId)
                setPstCount(pstNum)
                setCurrentUser(currUser)
            } catch (err) {
                console.log('Error loading user', err)
            }
        }

        loadUser()


        return () => {
            // Component unmount
        }
    }, [userId]);

    function openMenu() {
        setShowMenu(!showMenu);
    }

    return (
        <>
            <div>
                <NavHeader />
            </div>
            <section className='user-upper-part'>
                <section className='internal-user-upper-part'>
                    <button className='user-button' onClick={openMenu}>
                        <img className="empty-user" src={currentUser?.imgUrl || "emptyUser.jpeg"} alt="User Placeholder" />
                    </button>
                    {showMenu && <MenuUploadUserPhoto />}

                    <div className='info-container'>
                        <div className='info'>
                            <div>
                                {/* <h2>{currentUser?.username}</h2> */}
                                <h2 className={isCurrentUser ? 'current-user' : 'other-user'}>{currentUser?.username}</h2>

                            </div>
                            {isCurrentUser ? (
                                <>
                                    <button className='edit-profile'>Edit profile</button>
                                    <button className='view-archive'>View Archive</button>
                                    <button className='settings'><img src='setting.svg' alt='Settings Icon' /></button>
                                </>
                            ) : (
                                <div className='other-user'>
                                    <button className='follow-button'>Follow</button>
                                    <button className='message'>Message</button>
                                    <button className='add-btn'><img src="addUser.svg"></img></button>
                                    <button className='three-dot'><img src="3dot.svg"></img></button>
                                </div>
                            )}
                        </div>
                        <section className='counts'>
                            <div className='details-about-user'>
                                <h4> <span className='count-post'>{pstCount}</span>posts</h4>
                                <h4> <span className='count-followers'>{10}</span>followers</h4>
                                <h4><span className='count-following'>{20}</span> following</h4>
                            </div>
                            <div className='fullname-of-user'>
                                <h4>{currentUser?.fullname}</h4>
                            </div>
                        </section>
                    </div>
                </section>
            </section>
        </>
    )
}
