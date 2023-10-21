import { useRef, useState } from 'react'
import { uploadService } from '../services/upload.service'

export function ImgUploader({ onUploaded = null ,design = 'default'}) {
  const [imgData, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
  })

  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null);


  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    setImgData({ imgUrl: secure_url, width, height })
    console.log('secure', secure_url)

    setIsUploading(false)
    onUploaded && onUploaded(secure_url)
  }

  function getUploadLabel() {
    if (imgData.imgUrl) return 'Upload Another?'
    return isUploading ? 'Uploading....' : 'Upload Image'
  }


  const handleButtonClick = () => {
    fileInputRef.current.click()
  }


  return (
    <div className={`upload-preview ${design}`}>
      {imgData.imgUrl && <img src={imgData.imgUrl} style={{ maxWidth: '200px', float: 'right' }} />}
     {(design!=='alternative')&&<button  onClick={handleButtonClick}>Select from  computer</button>}
      {/* <label htmlFor="imgUpload">{getUploadLabel()}</label> */}
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={uploadImg} accept="img/*" id="imgUpload" />
    </div>

    
  )
}