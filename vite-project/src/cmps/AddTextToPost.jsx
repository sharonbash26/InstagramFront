import { useState } from "react";

import { ImgUploader } from "./ImgUploader";

export function AddTextToPost({ uploadedImageUrl, onAddPst, closeModal }) {
    const [isShare, setShare] = useState(false)
    const [text, setText] = useState("")
    const [locationText, setLocationText] = useState("")
    let loggedUser = userService.getLoggedinUser()

    const handleChange = (event) => {
        setText(event.target.value);
        console.log('descrpiton txt value',event.target.value)
    }
    const handleChangeLocation = (event) => {
        setLocationText(event.target.value)
    }
    const handleShareClick = () => {
        setShare(true)
        onAddPst(uploadedImageUrl,text);
        closeModal();

    }

 
    return (
        <section className="add-text-to-post">
            <header>
                <button className="back"><img src="back.svg"></img></button>
                <h4>Create new post</h4>
                <button className="share" onClick={handleShareClick}>Share</button>
            </header>

        
            {/* {uploadedImageUrl && <img src={uploadedImageUrl} alt="Uploaded" />} */}
            <section className='text-box'>
            <section className='user-display-data'>
                {/* <img className="profile-prev-in modal"  {style:width:'10px' height:'10px'}src={loggedUser.imgUrl}></img> */}
                <img
                    className="profile-prev-in modal"
                    src={loggedUser.imgUrl}
                    style={{ width: '30px', height: '30px' }}
                />
                <h4>{loggedUser.userName}</h4>
            </section>
            <div>
                <input
                    type="text"
                    value={text}
                    onChange={handleChange}
                    placeholder="Write a caption"
                />
                <input
                    type="text"
                    value={locationText}
                    onChange={handleChangeLocation}
                    placeholder='Add location'
                />
            </div>
        </section>
            {uploadedImageUrl && <img src={uploadedImageUrl} alt="Uploaded" style={{ width: '400px', height: '400px' }} />}
            {isShare && <ImgUploader onUploaded={(uploadedImageUrl) => {
                onAddPst(uploadedImageUrl,text);
                closeModal();
            }} />}
            

        </section>
    )
}