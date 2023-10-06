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
                <button><img src="svgs_collection/svg1.svg"></img><span className="home-span">Home</span></button>
                <button><img src="search-icon-white.svg"></img><span>Search</span></button>
                <button><img src="explore-white.svg"></img><span>Explore</span></button>
                <button><img src="Reels.svg"></img><span>Reels</span></button>
                <button><img src="mess.svg"></img><span>Messages</span></button>
                <button><img src="svgs_collection/svg6.svg"></img><span>Notifications</span></button>
                <button onClick={openModal}><i className="fa-regular fa-square-plus"></i>Create</button>
                <button><img className="profile-icon-img" src="s3.jpg"></img>Profile </button>
                <button><img src="svgs_collection/svg8.svg"></img>Threads</button>
                <button><img src="svgs_collection/svg10.svg"></img>More</button>
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