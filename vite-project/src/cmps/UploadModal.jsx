import { ImgUploader } from './ImgUploader';
import React from 'react';

export function UploadModal({ closeModal, onAddPst }) {
    return (
        <div className="modal">
            <img className="cross-icon"src="cross.png" onClick={closeModal}></img>
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