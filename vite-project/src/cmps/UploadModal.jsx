// import { ImgUploader } from './ImgUploader'
// import React, { useState } from 'react'
// import { AddTextToPost } from './AddTextToPost'
// import { closeModal } from '../store/pst.actions'
// import { SelectedImgForEditing } from './SelectedImgForEditing'

// export function UploadModal({ onAddPst }) {
//   const [uploadedImageUrl, setUploadedImageUrl] = useState(null)
//   const [currentStep, setCurrentStep] = useState('upload')
//   let content

//   const resetUpload = () => {
//     setUploadedImageUrl(null)
//     setCurrentStep('upload')
//   }

//   const handleImageUpload = (url) => {
//     setUploadedImageUrl(url)
//     setCurrentStep('edit')
//   }
//   const handleNextToTextEditor = () => {
//     setCurrentStep('text')
//   }

//   const handleBackFromTextEditor = () => {
//     setCurrentStep('edit')
//   }

//   const handleBackFromImageEditing = () => {
//     setCurrentStep('upload')
//   }

//   switch (currentStep) {
//     case 'upload':
//       content = <ImgUploader onUploaded={handleImageUpload} />
//       break
//     case 'edit':
//       content = <SelectedImgForEditing uploadedImageUrl={uploadedImageUrl} onNext={handleNextToTextEditor} onBack={handleBackFromImageEditing} />
//       break
//     case 'text':
//       content = <AddTextToPost uploadedImageUrl={uploadedImageUrl} onAddPst={onAddPst} closeModal={closeModal} onBack={handleBackFromTextEditor} onReset={resetUpload} />
//       break
//     default:
//       content = <p>Invalid step</p>
//       break
//   }

//   return (
//     <div className='modal'>

//       <svg onClick={closeModal} aria-label="Close" className="cross-icon" color="rgb(255, 255, 255)" fill="rgb(255, 255, 255)" height="18" role="img" viewBox="0 0 24 24" width="18">
//         <title>Close</title>
//         <polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline>
//         <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line>
//       </svg>

//       <div className={`modal-content ${currentStep === 'text' ? 'modal-large' : ''}`}>
//         {currentStep === 'upload' && <h3>Create new post</h3>}
//         <div className='inner-container'>
//           {currentStep === 'upload' &&
//             <img className='icon-upload-background' src="upload-window.svg" alt="Upload Window Background" />}
//           {currentStep === 'upload' && <h3>Drag photos and videos here</h3>}
//           {content}
//         </div>
//       </div>

//     </div>
//   )

// }



import React, { useState } from 'react'
import { ImgUploader } from './ImgUploader'
import { AddTextToPost } from './AddTextToPost'
import { closeModal } from '../store/pst.actions'
import { SelectedImgForEditing } from './SelectedImgForEditing'

export function UploadModal({ onAddPst }) {
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null)
  const [currentStep, setCurrentStep] = useState('upload')

  const resetUpload = () => {
    setUploadedImageUrl(null)
    setCurrentStep('upload')
  }

  const handleImageUpload = (url) => {
    setUploadedImageUrl(url)
    setCurrentStep('edit')
  }

  const handleNextToTextEditor = () => {
    setCurrentStep('text')
  }

  const handleBackFromTextEditor = () => {
    setCurrentStep('edit')
  }

  const handleBackFromImageEditing = () => {
    setCurrentStep('upload')
  }


  const renderContent = () => {
    switch (currentStep) {
      case 'upload':
        return <ImgUploader onUploaded={handleImageUpload} />;
      case 'edit':
        return (
          <SelectedImgForEditing
            uploadedImageUrl={uploadedImageUrl}
            onNext={handleNextToTextEditor}
            onBack={handleBackFromImageEditing}
          />
        )
      case 'text':
        return (
          <AddTextToPost
            uploadedImageUrl={uploadedImageUrl}
            onAddPst={onAddPst}
            closeModal={closeModal}
            onBack={handleBackFromTextEditor}
            onReset={resetUpload}
          />
        )
      default:
        return <p>Invalid step</p>
    }
  }

  return (
    <div className='modal'>
      <svg onClick={closeModal} aria-label="Close" className="cross-icon" color="#ffffff" fill="#ffffff" height="18" role="img" viewBox="0 0 24 24" width="18">
        <title>Close</title>
        <polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline>
        <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line>
      </svg>

      <div className={`modal-content ${currentStep === 'text' ? 'modal-large' : ''}`}>
        {currentStep === 'upload' && <h3>Create new post</h3>}
        <div className='inner-container'>
          {currentStep === 'upload' &&
            <img className='icon-upload-background' src="upload-window.svg" alt="Upload Window Background" />}
          {currentStep === 'upload' && <h3>Drag photos and videos here</h3>}
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

