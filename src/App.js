import axios from 'axios';
import './App.css';
import React, { useState, useEffect } from 'react';
import Graph from './Graph/Graph';
import FileUpload from './CsvFile';
import Table from './Table/Table';

function App() {
  const [formData, setFormData] = useState({
    transactionId: '',
    customerName: '',
    date: '',
    amount: '',
    status: '',
    url: ''
  });

  // Declare state variables
  const [isEditing, setIsEditing] = useState(false);
  const [submittedDataList, setSubmittedDataList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { ...formData };

    try {
      if (isEditing) {
        // Code for editing
      } else {
        // Code for submitting new data
        await axios.post('http://localhost:8001/save', postData);
        const response = await fetch('http://localhost:8001/get');
        const newData = await response.json();
        setSubmittedDataList(newData);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Reset form data after submission
    setFormData({
      transactionId: '',
      customerName: '',
      date: '',
      amount: '',
      status: '',
      url: ''
    });
  };

  return (
    <div>
      <center>
        <h1>Transaction Tracker</h1>
        <form onSubmit={handleSubmit} class='formContainer'>
          <input type="text" name="transactionId" value={formData.transactionId} onChange={handleChange} placeholder='Transaction Id' />
          <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} placeholder='Customer Name' /><br/>
          <input type="date" name="date" value={formData.date} onChange={handleChange} /><br/>
          <input type="text" name="amount" value={formData.amount} onChange={handleChange} placeholder='Amount'/>
          <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder='Status'/>
          <input type="url" name="url" value={formData.url} onChange={handleChange} placeholder='Invoice Url' /><br/>
          <button type="submit">Submit</button>
        </form>
        <FileUpload/>
      </center>
      <Graph/>
      <Table/>
      
    </div>
  );
}

export default App;
