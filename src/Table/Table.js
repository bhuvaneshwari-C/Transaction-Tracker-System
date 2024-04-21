import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from './Popup';

function Table() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    transactionId: '',
    customerName: '',
    date: '',
    amount: '',
    status: '',
    url: ''
  });

  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8001/get');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching Table data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/delete?id=${id}`);
      setData(data.filter(item => item.transactionId !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleUpdateClick = (rowData) => {
    setUpdateData(rowData);
    setShowUpdatePopup(true);
  };

  const handleClosePopup = () => {
    setShowUpdatePopup(false);
    setUpdateData(null);
  };

  const handleUpdate = async (updatedData) => {
    try {
      await axios.put(`http://localhost:8001/update`, updatedData);
      const updatedList = data.map(item =>
        item.transactionId === updatedData.transactionId ? updatedData : item
      );
      setData(updatedList);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }

    handleClosePopup();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your submit logic here
  };

  return (
    
    <div>
 {showUpdatePopup && (
        <Popup onClose={handleClosePopup} onUpdate={handleUpdate} initialData={updateData} />
      )}

      <h2>Transaction Table</h2>
      <table border="1" class='table'>
        <thead>
          <tr class='headTable'>
            <th>Id</th>
            <th>TransactionID</th>
            <th>CustomerName</th>
            <th>TransactionDate</th>
            <th>Amount</th>
            <th>Status</th>
            <th>InvoiceUrl</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.transactionId}  className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{index + 1}</td>
              <td>{item.transactionId}</td>
              <td>{item.customerName}</td>
              <td>{item.date}</td>
              <td>{item.amount}</td>
              <td>{item.status}</td>
              <td><a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a></td>
              <td>
                <button onClick={() => handleDelete(item.transactionId)}>Delete</button>
                <button onClick={() => handleUpdateClick(item)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
}

export default Table;

