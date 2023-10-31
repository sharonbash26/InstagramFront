import { useEffect, useState } from 'react'

export function TextBox({ uploadedImageUrl , onAddPst ,closeModal}) {
    const [text, setText] = useState("")
    const [locationText,setLocationText]=useState("")
    const handleChange = (event) => {
        setText(event.target.value);
    }
    const handleChangeLocation=(event) =>{
        setLocationText(event.target.value)
    }
    const handleShareClick = () => {
            onAddPst(); 
            closeModal();
        
    }
    return (
        <div>
            {uploadedImageUrl && <img src={uploadedImageUrl} alt="Uploaded" style={{ width: '100%' }} />}

            <input
                type="text"
                value={text}
                onChange={handleChange}
                placeholder="Enter some text"
            />
            <button className='share' onClick={handleShareClick}>Share</button>
            <input
                type="text"
                value={locationText}
                onChange={handleChangeLocation}
                placeholder='Add location'
            />
        </div>

    )
}