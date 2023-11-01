import { useState } from "react";

import { ImgUploader } from "./ImgUploader";
import { EmojiContainer } from "./EmojiContainer";

export function AddTextToPost({ uploadedImageUrl, onAddPst, closeModal }) {
    const [isShare, setShare] = useState(false)
    const [text, setText] = useState("")
    const [locationText, setLocationText] = useState("")
    let loggedUser = userService.getLoggedinUser()

    const handleEmojiSelect = (emoji) => {
        setText(prevText => prevText + emoji);
    };
    const handleChange = (event) => {
        setText(event.target.value);
    }
    const handleChangeLocation = (event) => {
        setLocationText(event.target.value)
    }
    const handleShareClick = () => {
        setShare(true)
        onAddPst(uploadedImageUrl, text);
        closeModal();

    }


    return (
        <section className="add-text-to-post">
            <header>
                <button className="back"><img src="back.svg"></img></button>
                <h4>Create new post</h4>
                <button className="share" onClick={handleShareClick}>Share</button>
            </header>


            <section className='text-box'>
                <section className='user-display-data'>
                    <img
                        className="profile-prev-in modal"
                        src={loggedUser.imgUrl}
                        style={{ width: '30px', height: '30px' }}
                    />
                    <h4>{loggedUser.userName}</h4>
                </section>
                <div className="enter-text">
                    {/* <input
                    type="text"
                    value={text}
                    onChange={
                        
                        
                        handleChange}
                    placeholder="Write a caption"
                /> */}
                    <textarea
                        value={text}
                        onChange={handleChange}
                        placeholder="Write a caption"
                        rows={10}
                        maxLength={2200}// Number of rows (optional, adjusts the height)
                        style={{ width: '98%' }} // Optional, to adjust the width
                    />
                    <div style={{ textAlign: 'right' }}>
                        {text.length}/{2200}
                    </div>
                    <input className="loc-input"
                        type="text"
                        value={locationText}
                        onChange={handleChangeLocation}
                        placeholder='Add location'
                    />
                </div>
  
            </section>
         
            {uploadedImageUrl && <img className="prev-img-editor" src={uploadedImageUrl} alt="Uploaded" style={{ width: '420px', height: '503px' }} />}
            {/* {isShare && <ImgUploader onUploaded={(uploadedImageUrl) => {
                onAddPst(uploadedImageUrl,text);
                closeModal();
            }} />} */}
               <EmojiContainer onEmojiSelect={handleEmojiSelect} />

      
            

        </section>
    )
}