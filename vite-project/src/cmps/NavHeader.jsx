import React from 'react';
import { ImgUploader } from './ImgUploader';
const { useState, useEffect } = React

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
                <button className='item-first'><img src="svgs_collection/svg1.svg"></img><span className="home-span">Home</span></button>
                <button className='item'><img src="search-icon-white.svg"></img><span>Search</span></button>
                <button className='item'><img src="explore-white.svg"></img><span>Explore</span></button>
                <button className='item'><img src="Reels.svg"></img><span>Reels</span></button>
                <button className='item'><img src="mess.svg"></img><span>Messages</span></button>
                <button className='item'><img src="svgs_collection/svg6.svg"></img><span>Notifications</span></button>
                <button className='item' onClick={openModal}><img src="create.svg"></img>Create</button>
                <button className='item'><img className="profile-icon-img" src="s3.jpg"></img>Profile </button>
                <button className='item-down'><img src="svgs_collection/svg8.svg"></img>Threads</button>
                <button className='item-more'><img src="svgs_collection/svg10.svg"></img>More</button>
                {isUploadModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Create new post</h3>
                            <div className='inner-container'>
                                <img className='icon-upload-background' src="upload-window.svg"></img>
                                <h3>Drag photos and videos here</h3>
                                <span className="close-button" onClick={closeModal}>&times;</span>
                                <ImgUploader onUploaded={(url) => {
                                    console.log('urlFromNav', url)
                                    console.log('navvvvvvvvvvvv')
                                    onAddPst(url)
                                    closeModal();
                                }} />
                            </div>

                        </div>
                    </div>
                )}

            </section>


        </section>
    )
}