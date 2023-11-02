import { useState } from "react";

import { ImgUploader } from "./ImgUploader";
import { EmojiContainer } from "./EmojiContainer";
import { useSelector } from "react-redux";

export function AddTextToPost({ uploadedImageUrl, onAddPst, closeModal ,onBack}) {
    const [isShare, setShare] = useState(false)
    const [text, setText] = useState("")
    const [locationText, setLocationText] = useState("")
    // let loggedUser = userService.getLoggedinUser()
    const loggedUser = useSelector(storeState => storeState.userModule.user)

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

    console.log(loggedUser)
    return (
        <section className="add-text-to-post">
            <header>
                <button className="back" onClick={onBack}><img src="back.svg"></img></button>
                <h4>Create new post</h4>
                <button className="share" onClick={handleShareClick}>Share</button>
            </header>


            <section className='text-box'>
                <section className='user-display-data'>
                    <img
                        className="profile-prev-in modal"
                        src={loggedUser.imgUrl || "emptyUser.jpeg"}
                        style={{ width: '30px', height: '30px' }}
                    />
                    <h4>{loggedUser.username}</h4>
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
                        className="textarea-placeholder"
                        value={text}
                        onChange={handleChange}
                        placeholder="Write a caption"
                        rows={10}
                        maxLength={2200}// Number of rows (optional, adjusts the height)
                        style={{ width: '98%' }} // Optional, to adjust the width
                    />
                    <div className="count-chars" style={{ textAlign: 'right' }}>
                        {text.length}/{2200}
                    </div>
                    {/* <input className="loc-input"
                        type="text"
                        value={locationText}
                        onChange={handleChangeLocation}
                        placeholder='Add location'
                    /> */}
                </div>

            </section>

            {uploadedImageUrl && <img className="prev-img-editor" src={uploadedImageUrl} alt="Uploaded" style={{ width: '744px', height: '721px' }} />}
            {/* {isShare && <ImgUploader onUploaded={(uploadedImageUrl) => {
                onAddPst(uploadedImageUrl,text);
                closeModal();
            }} />} */}
            <EmojiContainer onEmojiSelect={handleEmojiSelect} />




        </section>
    )
}