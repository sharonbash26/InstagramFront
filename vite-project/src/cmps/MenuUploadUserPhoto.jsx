import { useState } from "react"
import { ImgUploader } from "./ImgUploader"

export function MenuUploadUserPhoto() {
    const [isUploadWindowOpen, setUploadWindow] = useState(false)
    const [isMenuOpen, setMenuOpen] = useState(true)

    function openUpload() {
        setUploadWindow(true)
    }
    function closeMenu(){
        setMenuOpen(false);
    }
    if (!isMenuOpen) return nullthe
    return (
        <section className="menu-upload-user-photo">
            <div className="menu">
                <h4>Change Profile Photo</h4>
                <button className="upload-photo" onClick={openUpload}>Upload Photo</button>
                {isUploadWindowOpen&&<ImgUploader />}
                <button className="remove-photo">Remove Current Photo</button>
                <button className="remove-cancel" onClick={closeMenu}>Cancel</button>
            </div>
        </section>
    )
}