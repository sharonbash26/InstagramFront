import { useEffect, useState } from 'react';
import { uploadService } from '../services/upload.service';

export function JustUpload({ imgUrl }) {
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    async function uploadImage() {
      if (!imgUrl) return; // Don't proceed if no image URL is provided

      setIsUploading(true);
      try {
        const { secure_url } = await uploadService.uploadImg({ url: imgUrl });
        console.log('Image uploaded:', secure_url);
        // You might want to do something with the secure_url here
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setIsUploading(false);
      }
    }

    uploadImage();
  }, [imgUrl]); // This useEffect runs whenever imgUrl changes

  if (isUploading) {
    return <div>Uploading...</div>;
  }

  return null; // Or any other JSX you want to show when not uploading
}


