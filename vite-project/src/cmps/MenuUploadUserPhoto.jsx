import { useState } from "react"
import { useSelector } from 'react-redux'
import { ImgUploader } from "./ImgUploader"
import { updateUser } from "../store/user.actions"


export function MenuUploadUserPhoto() {
    const [isUploadWindowOpen, setUploadWindow] = useState(false)
    const [isMenuOpen, setMenuOpen] = useState(true)
    const { user } = useSelector(storeState => storeState.userModule)

    function openUpload() {
        setUploadWindow(true)
    }

    function closeMenu() {
        setMenuOpen(false)
    }

    async function onUploaded(imgUrl) {
        const updatedUser = { ...user }
        updatedUser.imgUrl = imgUrl
        await updateUser(updatedUser)
        // navigate to profile
        closeMenu()
    }

    async function removeImg() {
        const updatedUser = { ...user }
        updatedUser.imgUrl = null
        await updateUser(updatedUser)
        // navigate to profile
        closeMenu()
    }

    if (!isMenuOpen) return null
    return (
        <section className="menu-upload-user-photo">
            <div className="menu">
                <h4>Change Profile Photo</h4>
                <button className="upload-photo" onClick={openUpload}>Upload Photo</button>
                {isUploadWindowOpen && <ImgUploader onUploaded={onUploaded} />}
                <button className="remove-photo" onClick={removeImg}>Remove Current Photo</button>
                <button className="remove-cancel" onClick={closeMenu}>Cancel</button>
            </div>
        </section>
    )
}