import React, { useState } from 'react';
import './Csv.css';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file input change
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch('http://localhost:8001/upload', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          console.log('File uploaded successfully');
          // Reset the file input
          setSelectedFile(null);
        } else {
          console.error('Failed to upload file');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Please select a file.');
    }
  };
  return (
    <div class='container'>
      <h2>Upload CSV File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".csv"/>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUpload;
