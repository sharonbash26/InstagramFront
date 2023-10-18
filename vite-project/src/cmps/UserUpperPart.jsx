import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavHeader } from '../cmps/NavHeader';
import { ImgUploader } from './ImgUploader';

export function UserUpperPart() {
    const user = useSelector(storeState => storeState.userModule.user);
    const [showImgUploader, setShowImgUploader] = useState(false);

    let countPost = 0;
    let countFollowers = 0;
    let countFollowing = 0;

    const handleUploadClick = () => {
        setShowImgUploader(true); // Show the ImgUploader when button is clicked
    };

    return (
        <section className='user-upper-part'>
            <div>
                <NavHeader />
            </div>
            <section className='internal-user-upper-part'>

                <button className='user-button' onClick={handleUploadClick}>
                    <img className="empty-user" src="emptyUser.jpeg" alt="User Placeholder"/>
                </button>

                {showImgUploader && <ImgUploader />}  {/* This will conditionally render the ImgUploader component based on the state */}

                <div className='info-container'>
                    <div className='info'>
                        <h2>{user.fullname}</h2>
                        <button className='edit-profile'>Edit profile</button>
                        <button className='view-archive'>View Archive</button>
                        <button className='settings'><img src='setting.svg' alt='Settings Icon'></img></button>
                    </div>
                    <section className='counts'>
                        <h4>{user.fullname}</h4>
                        <h4>{countPost} posts</h4>
                        <h4>{countFollowers} followers</h4>
                        <h4>{countFollowing} following</h4>
                    </section>
                </div>
            </section>
        </section>
    )
}
