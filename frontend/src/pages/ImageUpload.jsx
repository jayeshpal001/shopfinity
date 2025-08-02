import React, { useState } from 'react';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

const ImageUpload = () => {
  const [image, setImage] = useState(null);             // 👈 For preview
  const [imageUrl, setImageUrl] = useState('');         // 👈 URL after upload
  const [loading, setLoading] = useState(false);        // 👈 Loading state

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file)); // 👈 Preview
    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      const res = await axiosInstance.post('/api/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      console.log(res.data); // Check image path
      setImageUrl(res.data.imageUrl); // 👈 Store final backend image path
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Upload Product Image</h2>

      {/* Input for Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-4"
      />

      {/* Loading */}
      {loading && <p className="text-blue-500">Uploading...</p>}

      {/* Local Preview */}
      {image && (
        <div className="mb-4">
          <p className="text-gray-600 text-sm">Preview:</p>
          <img src={image} alt="Preview" className="w-40 rounded-lg border" />
        </div>
      )}

      {/* Backend Final Path */}
      {imageUrl && (
        <div className="mt-4">
          <p className="text-green-600 text-sm">Uploaded Path:</p>
          <code className="text-sm text-gray-700">{imageUrl}</code>
          <div className='flex space-x-5'><h3>Uploaded Img: </h3>
          <img src={imageUrl} alt="Uploaded" className="w-10 mt-2 border rounded" /></div>
          
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
