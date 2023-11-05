import React, { useState } from 'react';
import { ImgUploader } from './ImgUploader';

import { UploadModal } from './UploadModal';
import { useNavigate } from 'react-router-dom';

import { closeModal } from '../store/pst.actions';
import { openModal } from '../store/pst.actions';
import { useDispatch, useSelector } from 'react-redux'
import { MoreModal } from './MoreModal';
import { userService } from '../services/user.service';

export function NavHeader({ onAddPst }) {
    const isModalOpen = useSelector(storeState => storeState.pstModule.isModalOpen);
    const [isMoreModalOpen, setIsMoreModalOpen] = useState(false)
    let userImgPorfile = userService.getLoggedinUser().imgUrl
    // let userImgPorfile =useSelector(storeState=>storeState.userModule.user)
    const navigate = useNavigate();
    function onOpenMoreModal() {
        setIsMoreModalOpen(true)

    }
 
    return (
        <section className="container-nav-side">
            <div className="logo">
                <img src="logo.svg"></img>
            </div>

            <section className="btn-container">

                <div className='first'>
                    <button className='item item-first' onClick={() => navigate('/pst')}><img src="svgs_collection/svg1.svg"></img><span className="home-span">Home</span></button>
                    <button className='item'><img src="search-icon-white.svg"></img><span>Search</span></button>
                    <button className='item'onClick={() => navigate('/explore')}><img src="explore-white.svg"></img><span>Explore</span></button>
                    <button className='item'><img src="Reels.svg"></img><span>Reels</span></button>
                    <button className='item'><img src="mess.svg"></img><span>Messages</span></button>
                    <button className='item'><img src="svgs_collection/svg6.svg"></img><span>Notifications</span></button>
                    <button className='item' onClick={openModal}><img src="create.svg"></img><span>Create</span></button>
                    <button className='item' onClick={() => navigate('/profile/psts')}><img className="profile-icon-img" src={userImgPorfile || "emptyUser.jpeg"}></img><span>Profile</span> </button>

                </div>

                <div className='second'>
                    <button className='item item-down'><img src="svgs_collection/svg8.svg"></img><span>Threads</span></button>
                    <button className='item item-more'><img src="svgs_collection/svg10.svg" onClick={onOpenMoreModal}></img><span>More</span></button>
                    {isMoreModalOpen && <MoreModal />}
                    {isModalOpen && (<UploadModal closeModal={closeModal} onAddPst={onAddPst} />
                    )}


                </div>
            </section>
        </section>
    )
}