import React, { useEffect, useRef } from 'react';

export function ThreeDotModal({ closeDotModal, onRemovePst}) {

    const modalRef = useRef(null);

    useEffect(() => {
      function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          closeDotModal();
        }
      }
  
      // Add event listener when the component mounts
      document.addEventListener('mousedown', handleClickOutside);
  
      // Remove event listener when the component unmounts
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [closeDotModal]);

    return (
        <div className="modal-overlay">
        <section className="three-dot-modal" ref={modalRef}>
            <button className="3btn" style={{ color: 'red',fontWeight: 'bold'  }} onClick={ onRemovePst}>Delete</button>
            <button className="3btn" style={{ color: 'red',fontWeight: 'bold'  }}>Report</button>
            <button className="3btn">Unfollow</button>
            <button className="3btn">Add to favorites</button>
            <button className="3btn">Not Interested</button>
            <button className="3btn">Go to post</button>
            <button className="3btn">Share to...</button>
            <button className="3btn">Copy link</button>
            <button className="3btn">About this account</button>
            <button className="3btn">Embed</button>
            <button className="3btn" onClick={closeDotModal}>Cancel</button>
        </section>
        </div>
    )
}