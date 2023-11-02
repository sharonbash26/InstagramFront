import { ImgUploader } from './ImgUploader';
// import React from 'react';
import React, { useState } from 'react';
import { AddTextToPost } from './AddTextToPost';


import { closeModal } from '../store/pst.actions';
import { SelectedImgForEditing } from './SelectedImgForEditing';

export function UploadModal({ onAddPst }) {
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null)
  const [showAddText, setShowAddText] = useState(false)
  const [currentStep, setCurrentStep] = useState('upload')

  const resetUpload = () => {
    setUploadedImageUrl(null);
    setCurrentStep('upload');
  };

  const handleImageUpload = (url) => {
    setUploadedImageUrl(url);
    // setShowAddText(true); // Move to next step to add text
    setCurrentStep('edit');
  }
  const handleNextToTextEditor = () => {
    setCurrentStep('text'); // Move to text editor after editing
  }

  const handleBackFromTextEditor = () => {
    setCurrentStep('edit'); // Go back to image editing step
};

const handleBackFromImageEditing = () => {
    setCurrentStep('upload'); // Go back to image upload step
};
  let content;
  switch (currentStep) {
    case 'upload':
      content = <ImgUploader onUploaded={handleImageUpload} />;
      break;
    case 'edit':
      content = <SelectedImgForEditing uploadedImageUrl={uploadedImageUrl} onNext={handleNextToTextEditor}  onBack={handleBackFromImageEditing}/>;
      console.log('content', content)
      console.log('upload', uploadedImageUrl)
      break;
    case 'text':
      content = <AddTextToPost uploadedImageUrl={uploadedImageUrl} onAddPst={onAddPst} closeModal={closeModal}  onBack={handleBackFromTextEditor} onReset={resetUpload} />;
      break;
    default:
      content = <p>Invalid step</p>;
      break;
  }

  return (
    <div className='modal'>

        <svg onClick={closeModal} aria-label="Close" className="cross-icon" color="rgb(255, 255, 255)" fill="rgb(255, 255, 255)" height="18" role="img" viewBox="0 0 24 24" width="18">
          <title>Close</title>
          <polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline>
          <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line>
        </svg>
        <div className={`modal-content ${currentStep === 'text' ? 'modal-large' : ''}`}>

          {currentStep === 'upload' && <h3>Create new post</h3>}
          {/* {!showAddText ? (
          <ImgUploader onUploaded={handleImageUpload} />
        ) : (
          // <AddTextToPost uploadedImageUrl={uploadedImageUrl} />
          <SelectedImgForEditing  uploadedImageUrl={uploadedImageUrl}/>
        )} */}
          <div className='inner-container'>
            {currentStep === 'upload' &&
              <img className='icon-upload-background' src="upload-window.svg" alt="Upload Window Background" />}
            {currentStep === 'upload' && <h3>Drag photos and videos here</h3>}
            {/* <ImgUploader onUploaded={(url) => {
            onAddPst(url)
            closeModal()
          }} */}
            {/* /> */}
            {content}
          </div>
        </div>
    
    </div>
  )
}
