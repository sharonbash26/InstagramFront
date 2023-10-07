import { ImgUploader } from './ImgUploader';
import React from 'react';

export function UploadModal({ closeModal, onAddPst }) {
    return (
        <div className="modal">
            {/* <img className="cross-icon" src="cross.png" onClick={closeModal}></img> */}
            <svg onClick={closeModal} aria-label="Close" class="cross-icon" color="rgb(255, 255, 255)" fill="rgb(255, 255, 255)" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Close</title><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></polyline><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
            {/* <span className="close-button" onClick={closeModal}>&times;</span> */}
            <div className="modal-content">
                <h3>Create new post</h3>
                <div className='inner-container'>
                    <img className='icon-upload-background' src="upload-window.svg"></img>
                    <h3>Drag photos and videos here</h3>
                    <ImgUploader onUploaded={(url) => {
                        onAddPst(url)
                        closeModal();
                    }} />
                </div>

            </div>
        </div>
    )
}