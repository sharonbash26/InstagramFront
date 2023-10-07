import React from 'react';
import { ImgUploader } from './ImgUploader';
const { useState, useEffect } = React
import { UploadModal } from './uploadModal';

export function NavHeader({ onAddPst }) {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
    function openModal() {
        setIsUploadModalOpen(true)
    }
    function closeModal() {
        setIsUploadModalOpen(false)
    }
    return (
        <section className="container-nav-side">
            <div className="logo">
                <img src="logo.svg"></img>
            </div>

            <section className="btn-container">
             
                    <div className='first'>
                        <button className='item item-first'><img src="svgs_collection/svg1.svg"></img><span className="home-span">Home</span></button>
                        <button className='item'><img src="search-icon-white.svg"></img><span>Search</span></button>
                        <button className='item'><img src="explore-white.svg"></img><span>Explore</span></button>
                        <button className='item'><img src="Reels.svg"></img><span>Reels</span></button>
                        <button className='item'><img src="mess.svg"></img><span>Messages</span></button>
                        <button className='item'><img src="svgs_collection/svg6.svg"></img><span>Notifications</span></button>
                        <button className='item' onClick={openModal}><img src="create.svg"></img><span>Create</span></button>
                        <button className='item'><img className="profile-icon-img" src="s3.jpg"></img><span>Profile</span> </button>
                    </div>

                    <div className='second'>
                        <button className='item item-down'><img src="svgs_collection/svg8.svg"></img><span>Threads</span></button>
                        <button className='item item-more'><img src="svgs_collection/svg10.svg"></img><span>More</span></button>
                        {isUploadModalOpen && (<UploadModal closeModal={closeModal} onAddPst={onAddPst} />
                        )}
            

                </div>
            </section>
        </section>
    )
}